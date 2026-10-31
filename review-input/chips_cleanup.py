from lxml import html
from pathlib import Path
import shutil

def clean_chips(dest):
 p=dest/'temaer/chips.html';page=html.parse(str(p)).getroot()
 # Two editorial stories up front; keep the remaining original sources accessible.
 news=page.xpath('//*[@id="kaeden-i-nyhederne"]')[0]
 ul=news.xpath('.//ul[@class="xs-liste"]')[0]
 extra=list(ul)[2:]
 fold=html.fragment_fromstring('<details class="rm-more"><summary>Flere nyheder fra chipindustrien</summary><ul class="xs-liste"></ul></details>')
 for node in extra:fold.find('ul').append(node)
 ul.addnext(fold)
 for card in news.xpath('.//li[contains(@class,"chip-news-card")]'):
  card.set('class',card.get('class')+' cc-story')
  for node in card.xpath('.//p[@class="xp-ord"]'):node.getparent().remove(node)
 # A compact, explorable directory instead of a second long illustrated chain.
 chain=page.xpath('//*[@id="kaeden"]')[0]
 chain.set('class','sektion cc-directory')
 title=chain.xpath('.//*[@id="h-kaeden"]')[0];title.clear();title.set('id','h-kaeden');title.text='Find selskaberne i chipkæden'
 intro=chain.xpath('.//p[@class="sektion-intro"]')[0];intro.text='75 selskaber fordelt på otte led. Vælg et led for at se selskaberne og deres andel af fonden.'
 grid=html.fragment_fromstring('<div class="cc-grid"></div>')
 steps=chain.xpath('.//li[@class="vk-trin"]')
 for step in steps:
  link=step.xpath('./a')[0]
  d=html.Element('details',{'class':'cc-step'})
  summary=html.Element('summary')
  for child in list(link):summary.append(child)
  d.append(summary)
  for n in step.xpath('./p|./ul'):d.append(n)
  full=html.Element('a',{'href':link.get('href'),'class':'cc-explain'});full.text='Læs om dette led →';d.append(full)
  grid.append(d)
 old=chain.xpath('.//div[contains(@class,"vk-kort")]')[0];
 for template in old.xpath('.//template'):grid.append(template)
 old.getparent().replace(old,grid)
 deep=chain.xpath('.//details[contains(@class,"fold-sektion")]')[0]
 for key in ['data-aaben-bred','open']:deep.attrib.pop(key,None)
 deep.set('class','cc-deep');deep.find('summary').text='Se forklaringer og alle selskaber'
 # Do not start six extra Twitter embeds while browsing the directory.
 oldx=page.xpath('//*[@id="x-opslag"]')[0]
 fold=html.fragment_fromstring('<details class="rm-more cc-source-posts"><summary>Flere X-opslag fra selskaberne</summary></details>')
 oldx.addprevious(fold);fold.append(oldx)
 for d in oldx.xpath('.//details'):
  d.attrib.pop('data-aaben-bred',None);d.attrib.pop('open',None)
 # Shorts are available but do not add another media wall to the first view.
 for grid in page.xpath('//*[contains(concat(" ",@class," ")," rm-grid-instagram ")]'):
  f=html.fragment_fromstring('<details class="rm-more"><summary>Se vores korte videoer fra Instagram</summary></details>');grid.addprevious(f);f.append(grid)
 page.find('head').append(html.fragment_fromstring('<link rel="stylesheet" href="../assets/css/chips-cleanup.css?v=1">'))
 page.find('body').append(html.fragment_fromstring('<script defer src="../assets/js/chips-cleanup.js?v=1"></script>'))
 # Deferred images in disclosures are not downloaded before expansion.
 for img in page.xpath('//details//img[@src]'):
  img.set('data-deferred-src',img.attrib.pop('src'))
 p.write_text(html.tostring(page,encoding='unicode',doctype='<!doctype html>'),encoding='utf8')
 for name,folder in [('chips-cleanup.css','css'),('chips-cleanup.js','js')]:shutil.copyfile(Path(__file__).with_name(name),dest/'assets'/folder/name)

