from lxml import html

def refine_tech(tree):
    nav=tree.xpath('//*[@id="sm-h-fond"]/following-sibling::ul')[0]
    nav.clear()
    for target,label in [('temaer','De 12 temaer'),('forbindelser','Se forbindelserne'),('ai-rejsen','Fra skærm til strøm'),('virksomhedsfaser','Fra teknologi til forretning'),('vigtig-information','Kilder & vigtig information')]:
        nav.append(html.fragment_fromstring('<li><a class="sm-link" href="#'+target+'" data-spy="'+target+'"><span>'+label+'</span></a></li>'))
    nav.addnext(html.fragment_fromstring('<div class="tech-other-paths"><span>SE OGSÅ</span><a href="portfolio/index.html">Porteføljeanalyse →</a><a href="widget/index.html">Fondens afkast →</a></div>'))
    phases=tree.xpath('//*[@id="virksomhedsfaser"]')[0]
    phases.xpath('./p[@class="v18-ingress"]')[0].text='Den samme teknologi kan være et lovende forsøg i ét selskab og en stor forretning i et andet. Vælg en fase og se, hvad du skal forstå om kunderne, økonomien og næste skridt.'
    examples=[
      ('Oklo','oklo','Fra reaktordesign til anlæg i drift','Oklo er et eksempel på arbejdet med at gøre ny reaktorteknologi til en kommerciel forretning. Her er godkendelser, byggeri og finansiering centrale milepæle.','Hvad skal være på plads, før teknologien kan levere strøm til en kunde?','https://oklo.com/newsroom/oklo-publishes-full-year-2025-financial-results-and-business-update','Årsopdatering 2025'),
      ('IonQ','ionq','Kunder før en lønsom forretning','IonQ rapporterede omsætning og driftsunderskud i 2025. Det illustrerer forskellen på, at kunder betaler for kvanteteknologi, og at hele forretningen kan finansiere sig selv.','Kan flere leverancer bringe indtægter og omkostninger tættere på hinanden?','https://investors.ionq.com/news/news-details/2026/IonQ-Announces-Fourth-Quarter-and-Full-Year-2025-Financial-Results/','Årsresultat 2025'),
      ('Rocket Lab','rocket-lab','En eksisterende forretning bygges større','Rocket Lab øgede omsætningen med 38 % i 2025 gennem opsendelser og rumsystemer. Eksemplet handler om at skalere leverancer, mens der investeres i nye muligheder.','Kan selskabet øge kapaciteten, uden at omkostningerne løber foran?','https://investors.rocketlabcorp.com/news-releases/news-release-details/rocket-lab-announces-fourth-quarter-and-full-year-2025-financial','Årsresultat 2025'),
      ('NVIDIA','nvidia','Høj vækst med indtjening','NVIDIA rapporterede både omsætningsvækst og overskud i regnskabsåret 2026. Her flytter spørgsmålet sig fra, om produktet kan sælges, til hvor længe efterspørgsel og indtjening kan holde.','Hvor kommer næste vækst fra, og hvad kræver den af kunderne?','https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Announces-Financial-Results-for-Fourth-Quarter-and-Fiscal-2026/','Regnskabsår 2026'),
      ('Microsoft','microsoft','En stor forretning skal forny sig','Microsoft kombinerer etablerede softwareforretninger med investeringer i cloud og AI. En etableret virksomhed kan derfor have modne produkter og nye vækstområder på samme tid.','Skaber de nye investeringer værdi ud over den eksisterende indtjening?','https://www.microsoft.com/investor/reports/ar26/index.html','Årsrapport 2026')
    ]
    for i,(name,slug,title,copy,question,source,date) in enumerate(examples):
        panel=phases.xpath('.//*[@id="fase-'+str(i)+'"]')[0]
        text=html.Element('div',{'class':'phase-explanation'})
        for child in list(panel): text.append(child)
        panel.append(text)
        example=html.fragment_fromstring('<aside class="phase-example"><span class="eyebrow">SE DET I ET SELSKAB</span><a class="phase-company" href="selskaber/'+slug+'.html">'+name+' <span>↗</span></a><h4>'+title+'</h4><p>'+copy+'</p><blockquote>'+question+'</blockquote><a class="tekstlink" href="selskaber/'+slug+'.html">Udforsk '+name+' →</a><a class="phase-source" href="'+source+'" target="_blank" rel="noopener">Kilde: '+date+' ↗</a></aside>')
        panel.append(example)
    growth=phases.xpath('.//*[@id="fase-2"]//div[@class="phase-explanation"]/p')[0]
    growth.text='Kunderne er der, og salget vokser. Nu skal selskabet levere i større skala uden at miste kvalitet eller bruge uforholdsmæssigt meget kapital. Vækst er ikke det samme som overskud; det afgørende er, om økonomien forbedres, når forretningen bliver større.'
    profitable=phases.xpath('.//*[@id="fase-3"]//div[@class="phase-explanation"]/p')[0]
    profitable.text='Forretningen tjener penge og vokser. Det centrale spørgsmål er, hvad den næste investerede krone skaber: mere indtjening, et stærkere produkt eller blot mere omsætning. Væksttempoet kan være højt eller moderat.'
    for p in phases.xpath('./p[@class="lille"]'):
        p.text='Selskaberne illustrerer spørgsmålene i hver fase. Et selskab kan spænde over flere faser; eksemplerne bygger på de angivne rapporter.'
