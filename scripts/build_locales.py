"""Synchronise SEO metadata across reviewed EN/FR/AR static pages.

Run: python3 scripts/build_locales.py
The English index supplies shared site identity. Reviewed French and Arabic bodies
are preserved, because index-based text-node substitution previously overwrote
localized content after structural changes. Edit locale body copy in fr/ar/index.html;
edit translations below only after a native speaker has reviewed new text.
"""
from pathlib import Path
import base64
import hashlib
import json
import re
from lxml import html, etree

ROOT = Path(__file__).resolve().parents[1]
HOST = 'https://www.hrgeantemballage.com/'
COPY = {
    'en': ('Corrugated Box Manufacturer in Algeria | HR Géant Emballage',
           'Corrugated box manufacturer in Béni Tamou, Blida, Algeria. Explore custom, printed and industrial packaging, then contact HR Géant Emballage for a quote.', 'en_US'),
    # NEEDS NATIVE REVIEW before publishing this new French copy.
    'fr': ('Fabricant de carton ondulé en Algérie | HR Géant Emballage',
           'Fabricant de caisses en carton ondulé à Béni Tamou, Blida. Découvrez nos emballages sur mesure et imprimés pour vos projets professionnels en Algérie.', 'fr_DZ'),
    # NEEDS NATIVE REVIEW before publishing this new Arabic copy.
    'ar': ('مصنع علب الكرتون المموج في الجزائر | HR Géant Emballage',
           'تصنيع علب الكرتون المموج وعبوات التغليف حسب الطلب في بني تامو، البليدة، الجزائر. تواصل مع HR Géant Emballage لمناقشة احتياجات التعبئة وطلب عرض سعر.', 'ar_DZ'),
}
OG_ALT = {
    'en': 'HR Géant Emballage — corrugated packaging manufactured in Algeria',
    'fr': 'HR Géant Emballage — emballages en carton ondulé fabriqués en Algérie',  # NEEDS NATIVE REVIEW
    'ar': 'HR Géant Emballage — تصنيع عبوات الكرتون المموج في الجزائر',  # NEEDS NATIVE REVIEW
}
ALTERNATES = {lang: HOST + (lang + '/' if lang != 'en' else '') for lang in COPY}


def set_meta(head, selector, attr, value):
    elements = head.xpath(selector)
    if len(elements) != 1:
        raise ValueError(f'Expected exactly one {selector}, found {len(elements)}')
    elements[0].set(attr, value)


def main():
    master = html.fromstring((ROOT / 'index.html').read_text(encoding='utf-8'))
    if master.get('lang') != 'en':
        raise ValueError('English master must have lang=en')
    # Use the English master as the source for factual company identity.
    source_business = json.loads(master.xpath('//script[@type="application/ld+json"]')[0].text)
    for required in ('name', 'email', 'telephone', 'address'):
        if required not in source_business: raise ValueError(f'Missing {required} from English master schema')
    logo = HOST + 'assets/logo.png'
    business = {
        '@context': 'https://schema.org', '@type': ['Organization', 'LocalBusiness'],
        '@id': HOST + '#organization', 'name': source_business['name'],
        'url': HOST, 'logo': logo, 'email': source_business['email'],
        'telephone': source_business['telephone'], 'address': source_business['address']
        # Add geo and areaServed only after the exact factory pin and delivery area are confirmed.
        # Add sameAs only after actual company social profiles are verified.
    }
    for lang, (title, description, og_locale) in COPY.items():
        path = ROOT / (lang + '/' if lang != 'en' else '') / 'index.html'
        if not path.exists():
            raise ValueError(f'Missing native-reviewed locale file: {path}')
        doc = html.fromstring(path.read_text(encoding='utf-8'))
        head = doc.xpath('//head')[0]
        expected = 'rtl' if lang == 'ar' else 'ltr'
        if doc.get('lang') != lang or doc.get('dir', 'ltr') != expected:
            raise ValueError(f'Wrong lang/dir in {path}')
        doc.xpath('//title')[0].text = title
        set_meta(head, './/meta[@name="description"]', 'content', description)
        for prop, value in [('og:title', title), ('og:description', description),
                            ('og:url', ALTERNATES[lang]), ('og:image', HOST + 'assets/images/hr-geant-emballage-social.jpg'),
                            ('og:locale', og_locale), ('og:image:width', '1200'),
                            ('og:image:height', '630'), ('og:image:alt', OG_ALT[lang])]:
            nodes = head.xpath('.//meta[@property=$p]', p=prop)
            if nodes: nodes[0].set('content', value)
            else: head.append(etree.Element('meta', property=prop, content=value))
        for name, value in [('twitter:title', title), ('twitter:description', description),
                            ('twitter:image', HOST + 'assets/images/hr-geant-emballage-social.jpg')]:
            set_meta(head, f'.//meta[@name="{name}"]', 'content', value)
        set_meta(head, './/link[@rel="canonical"]', 'href', ALTERNATES[lang])
        for node in head.xpath('.//link[@rel="alternate"][@hreflang]'):
            head.remove(node)
        for code, url in [*ALTERNATES.items(), ('x-default', HOST)]:
            head.append(etree.Element('link', rel='alternate', hreflang=code, href=url))
        schema_nodes = head.xpath('.//script[@type="application/ld+json"]')
        if len(schema_nodes) != 1: raise ValueError(f'Expected one JSON-LD script in {path}')
        schema_nodes[0].text = json.dumps(business, ensure_ascii=False, separators=(',', ':'))
        csp = head.xpath('.//meta[@http-equiv="Content-Security-Policy"]')
        if len(csp) != 1: raise ValueError(f'Expected one CSP meta tag in {path}')
        policy = csp[0].get('content')
        digest = base64.b64encode(hashlib.sha256(schema_nodes[0].text.encode()).digest()).decode()
        policy, count = re.subn(r"'sha256-[^']+'", "'sha256-" + digest + "'", policy, count=1)
        if count != 1: raise ValueError(f'Missing JSON-LD CSP hash in {path}')
        csp[0].set('content', policy)
        if len(doc.xpath('//h1')) != 1: raise ValueError(f'Expected one H1 in {path}')
        path.write_bytes(b'<!doctype html>\n' + html.tostring(doc, encoding='utf-8', method='html', pretty_print=False))
        print('Updated', path.relative_to(ROOT))


if __name__ == '__main__': main()
