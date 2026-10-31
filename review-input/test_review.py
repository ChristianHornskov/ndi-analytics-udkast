import json
import unittest
from pathlib import Path
from lxml import html
from build import SOURCE, DEST

class ReviewTests(unittest.TestCase):
    def test_chip_chain_delivery(self):
        tree=html.parse(str(DEST/'temaer/chips.html'))
        self.assertEqual(len(tree.xpath('//*[@id="ck-kaede"]')),1)
        self.assertFalse(tree.xpath('//*[@id="cq-kaede"]'))
        data=json.loads(tree.xpath('//*[@id="ck-data"]')[0].text)
        self.assertEqual(len(data),8)
        self.assertEqual(len(tree.xpath('//*[contains(concat(" ",@class," ")," ck-punkt-knap ")]')),8)
        links=tree.xpath('//head/link/@href')
        self.assertGreater(next(i for i,s in enumerate(links) if 'chipkaede.css' in s),next(i for i,s in enumerate(links) if 'review.css' in s))
        self.assertTrue(tree.xpath('//script[contains(@src,"chipkaede.js") and @defer]'))
    def test_two_distinct_destinations(self):
        code=(DEST/'widget/preview-adapter.js').read_text(encoding='utf-8')
        self.assertIn('href="../portfolio/index.html"',code)
        self.assertIn('href="../tech.html"',code)
    def test_original_design_is_preserved(self):
        original=Path(__file__).with_name('homepage-source')
        for name in ['style.css','wix-embed.css','simple-view.css','app.js','homepage-patch.js','data.json']:
            self.assertEqual((original/name).read_bytes(),(DEST/'widget'/name).read_bytes(),name)
        source=html.parse(str(SOURCE/'index.html'))
        built=html.parse(str(DEST/'tech.html'))
        query='//div[@class="photo-theme-grid"]//a/@href'
        self.assertEqual(source.xpath(query),built.xpath(query))
        self.assertGreater(len(built.xpath(query)),0)
        self.assertNotIn("setInterval(async()=>{",(DEST/'widget/production-embed.js').read_text(encoding='utf-8'))
    def test_tech_connections_follow_themes(self):
        tree=html.parse(str(DEST/'tech.html'))
        self.assertEqual(tree.xpath('//*[@id="temaer"]')[0].getnext().get('id'),'forbindelser')

    def test_tech_navigation_and_examples(self):
        tree=html.parse(str(DEST/'tech.html'))
        self.assertEqual(tree.xpath('//*[@id="sm-h-fond"]/following-sibling::ul[1]//a/@data-spy'),['temaer','forbindelser','ai-rejsen','virksomhedsfaser','vigtig-information'])
        examples=tree.xpath('//*[@class="phase-company"]/@href')
        self.assertEqual(len(examples),5)
        for href in examples:
            self.assertTrue((DEST/href).exists())
        self.assertEqual(len(tree.xpath('//*[@class="phase-source"]')),5)

    def test_animation_integration(self):
        reference=html.fromstring((DEST/'animationer/spacex.svg').read_bytes())
        inline=html.parse(str(DEST/'selskaber/spacex.html')).xpath('//*[@id="ta-spacex"]')[0]
        self.assertEqual(html.tostring(reference,with_tail=False).replace(b"\r\n",b"\n"),html.tostring(inline,with_tail=False).replace(b"\r\n",b"\n"))
        animated=0
        for path in (DEST/'selskaber').glob('*.html'):
            tree=html.parse(str(path))
            scripts=tree.xpath('//script[contains(@src,"topanimation.js")]/@src')
            if scripts:
                animated+=1
                self.assertEqual(len(scripts),1)
                self.assertIn('?v=20261031-animation1',scripts[0])
                for href in tree.xpath('//link[contains(@href,"topanimation.css")]/@href'):
                    self.assertIn('?v=20261031-animation1',href)
        self.assertEqual(animated,21)

    def test_only_widget_loads_fund_selection(self):
        for name in ['index.html','tech.html','selskaber/spacex.html']:
            tree=html.parse(str(DEST/name))
            self.assertFalse(tree.xpath('//script[contains(@src,"review-funds")]'))
        self.assertEqual((DEST/'data/dagens-tal.json').read_bytes(),(SOURCE/'data/dagens-tal.json').read_bytes())
    def test_accumulating_class_history(self):
        data=json.loads((DEST/'data/review-funds.js').read_text(encoding='utf-8').removeprefix('window.REVIEW_FUNDS=').removesuffix(';'))
        akk=next(f for f in data if f['id']=='PMINDIAKK')
        self.assertIsNone(akk['u']['aarligtSidenStart'])
        period=next(p for p in akk['u']['perioder'] if p['id']=='all')
        self.assertEqual(period['fra'],'2025-12-05')
        self.assertAlmostEqual(period['afkast'],-3.76)
        self.assertEqual(period['vaerdi100000'],96240)
        for p in akk['u']['perioder']:
            self.assertAlmostEqual(p['punkter'][0][1],0)
            self.assertAlmostEqual(p['punkter'][-1][1],p['afkast'])
            if p['sammenligningPunkter']:
                self.assertEqual(p['punkter'][0][0],p['sammenligningPunkter'][0][0])
                self.assertEqual(p['punkter'][-1][0],p['sammenligningPunkter'][-1][0])
    def test_media_integration(self):
        blocked={'vmbwJTUptKw','zGNAgVoCLao','CAkUyUTsVG0'}
        checked=0
        for path in list((DEST/'temaer').glob('*.html'))+list((DEST/'selskaber').glob('*.html')):
            tree=html.parse(str(path))
            sections=tree.xpath('//*[@id="mere-fra-ndi"]')
            if not sections:continue
            checked+=1
            self.assertEqual(len(sections),1)
            videos=sections[0].xpath('.//*[@data-youtube]/@data-youtube')
            self.assertFalse(blocked.intersection(videos))
            self.assertEqual(len(videos),len(set(videos)))
            for start in sections[0].xpath('.//*[@data-start]/@data-start'):
                self.assertGreaterEqual(int(start),0)
            self.assertEqual(len(tree.xpath('//script[contains(@src,"review-media.js")]')),1)
        self.assertGreater(checked,40)

    def test_compact_chips(self):
        tree=html.parse(str(DEST/'temaer/chips.html'))
        self.assertEqual(len(tree.xpath('//*[@id="tpl-vk"]')),1)
        self.assertEqual(len(tree.xpath('//details[@class="cc-step"]')),8)
        self.assertFalse(tree.xpath('//details[@class="cc-step"][@open]'))
        self.assertEqual(len(tree.xpath('(//*[@id="kaeden-i-nyhederne"]//ul[@class="xs-liste"])[1]/li')),2)
        self.assertEqual(len(tree.xpath('//*[@id="mere-fra-ndi"]/div[contains(@class,"rm-grid-youtube")]/article')),2)
        self.assertFalse(tree.xpath('//details//img[@data-deferred-src][@src]'))
    def test_unique_ids_and_local_assets(self):
        for name in ['index.html','tech.html','widget/index.html','portfolio/index.html','selskaber/spacex.html']:
            path=DEST/name;tree=html.parse(str(path))
            ids=tree.xpath('//*[@id]/@id')
            self.assertEqual(len(ids),len(set(ids)),name)
            for src in tree.xpath('//script/@src|//link[@rel="stylesheet"]/@href'):
                if not src.startswith(('https:','http:','data:')):
                    self.assertTrue((path.parent/src.split('?')[0]).resolve().exists(),src)

if __name__=='__main__':unittest.main()



