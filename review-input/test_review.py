import json
import unittest
from pathlib import Path
from lxml import html
from build import SOURCE, DEST

class ReviewTests(unittest.TestCase):
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
    def test_unique_ids_and_local_assets(self):
        for name in ['index.html','tech.html','widget/index.html','portfolio/index.html','selskaber/spacex.html']:
            path=DEST/name;tree=html.parse(str(path))
            ids=tree.xpath('//*[@id]/@id')
            self.assertEqual(len(ids),len(set(ids)),name)
            for src in tree.xpath('//script/@src|//link[@rel="stylesheet"]/@href'):
                if not src.startswith(('https:','http:','data:')):
                    self.assertTrue((path.parent/src.split('?')[0]).resolve().exists(),src)

if __name__=='__main__':unittest.main()

