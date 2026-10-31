from lxml import html
from pathlib import Path
import shutil

def refine_chip_news(page,dest):
    heading=page.xpath('//*[@id="h-x"]')[0]
    section=heading.xpath('ancestor::section')[0]
    section.set('class',section.get('class','')+' chip-news')
    heading.text='Nyt fra chipindustrien'
    lead=section.xpath('.//p[contains(@class,"lead")]')[0]
    lead.text='Fra chipfabrikker til AI og hukommelse. Her er udvalgte opslag fra X om selskaberne bag teknologien.'
    for node in section.xpath('.//*[contains(@class,"media-reading") or contains(@class,"xs-swipe")]'):
        node.getparent().remove(node)
    titles=['TSMC vokser videre','Intel efterlyser støtte til chipfabrikker','Ældre AI-chips er stadig efterspurgte','AI-chips · fra The Information','SK hynix vil bringe data tættere på beregningen']
    cards=section.xpath('.//li[contains(@class,"xp ")]')
    for card,title in zip(cards,titles):
        card.set('class','xp chip-news-card')
        h=html.Element('h3');h.text=title;h.set('class','chip-news-title')
        top=card.xpath('.//div[@class="xp-top"]')[0];top.addnext(h)
        for label in card.xpath('.//span[@class="xp-k"]'):
            label.drop_tree()
        for note in card.xpath('.//p[@class="xp-delt"]'):
            note.text='Delt af Mads Christiansen';card.remove(note);h.addnext(note)
        for label in card.xpath('.//button[contains(@class,"xp-vis")]'):
            label.text='Læs X-opslaget her'
    # Keep the original source links, dates and embed handlers intact.
    page.find('head').append(html.fragment_fromstring('<link rel="stylesheet" href="../assets/chipkaede/chip-news.css?v=20261031-1">'))
    shutil.copyfile(Path(__file__).with_name('chip-news.css'),dest/'assets/chipkaede/chip-news.css')
