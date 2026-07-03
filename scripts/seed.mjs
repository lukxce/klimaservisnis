// Puni Sanity CMS početnim (izmišljenim) sadržajem tako da sajt ne bude prazan.
// Pokretanje: node scripts/seed.mjs
// Zahteva NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET i SANITY_API_WRITE_TOKEN u .env.local

import { createClient } from "@sanity/client";
import { config as loadEnv } from "dotenv";

loadEnv({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Nedostaje NEXT_PUBLIC_SANITY_PROJECT_ID ili SANITY_API_WRITE_TOKEN u .env.local — vidi README za uputstvo.",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  title: "Moj Klima Servis Niš",
  tagline: "Servis, montaža i prodaja klima uređaja u Nišu",
  phone: "060 1234 567",
  phoneSecondary: "018 123 456",
  email: "info@klimaservisnis.rs",
  address: "Vožda Karađorđa 15, Niš",
  city: "Niš",
  serviceAreas: ["Niš", "Niška Banja", "Medijana", "Pantelej", "Crveni Krst", "Palilula"],
  foundedYear: 2014,
  workingHours: "Pon–Sub: 08–20h",
  openingHoursSpecification: [
    {
      _type: "hoursBlock",
      _key: "weekdays",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "08:00",
      closes: "20:00",
    },
  ],
  geo: { lat: 43.3209, lng: 21.8958 },
  brands: ["Gree", "Midea", "Daikin", "LG", "Hisense", "Vivax", "Mitsubishi", "Samsung"],
};

const services = [
  { slug: "servis-9-12-btu", title: "Servis klime 9 i 12 BTU", category: "servis", shortDescription: "Čišćenje filtera, dezinfekcija isparivača i provera rada uređaja.", priceFrom: 2500, featured: true, order: 1 },
  { slug: "servis-18-24-btu", title: "Servis klime 18 i 24 BTU", category: "servis", shortDescription: "Čišćenje filtera, dezinfekcija isparivača i provera rada uređaja za veće uređaje.", priceFrom: 3000, order: 2 },
  { slug: "veliki-servis-9-12-btu", title: "Veliki servis klime 9 i 12 BTU", category: "servis", shortDescription: "Rasklapanje jedinice, dubinsko pranje isparivača i ventilatora, dezinfekcija.", priceFrom: 4500, order: 3 },
  { slug: "veliki-servis-18-24-btu", title: "Veliki servis klime 18 i 24 BTU", category: "servis", shortDescription: "Rasklapanje jedinice, dubinsko pranje isparivača i ventilatora za veće uređaje.", priceFrom: 5500, order: 4 },
  { slug: "montaza-9-12-btu", title: "Montaža klime 9 i 12 BTU", category: "montaza", shortDescription: "Profesionalna ugradnja unutrašnje i spoljašnje jedinice, uključen osnovni materijal do 3m.", priceFrom: 8000, featured: true, order: 5 },
  { slug: "montaza-18-btu", title: "Montaža klime 18 BTU", category: "montaza", shortDescription: "Profesionalna ugradnja jedinice od 18 BTU, uključen osnovni materijal do 3m.", priceFrom: 10000, order: 6 },
  { slug: "montaza-24-btu", title: "Montaža klime 24 BTU", category: "montaza", shortDescription: "Profesionalna ugradnja jedinice od 24 BTU, uključen osnovni materijal do 3m.", priceFrom: 12000, order: 7 },
  { slug: "demontaza-klime", title: "Demontaža klime", category: "montaza", shortDescription: "Uklanjanje postojećeg uređaja, uz mogućnost ponovne ugradnje na novoj lokaciji.", priceFrom: 3000, order: 8 },
  { slug: "duzni-metar-9-12-btu", title: "Dužni metar instalacije 9 i 12 BTU", category: "montaza", shortDescription: "Cena po svakom dodatnom metru bakarne instalacije preko standardna 3m.", priceFrom: 2200, priceNote: "po dužnom metru", order: 9 },
  { slug: "duzni-metar-18-btu", title: "Dužni metar instalacije 18 BTU", category: "montaza", shortDescription: "Cena po svakom dodatnom metru bakarne instalacije preko standardna 3m.", priceFrom: 2500, priceNote: "po dužnom metru", order: 10 },
  { slug: "duzni-metar-24-btu", title: "Dužni metar instalacije 24 BTU", category: "montaza", shortDescription: "Cena po svakom dodatnom metru bakarne instalacije preko standardna 3m.", priceFrom: 2800, priceNote: "po dužnom metru", order: 11 },
  { slug: "kondenz-crevo", title: "Kondenz crevo", category: "popravka", shortDescription: "Postavljanje ili zamena creva za odvod kondenzovane vode.", priceFrom: 300, priceNote: "po metru", order: 12 },
  { slug: "zamena-izolacije", title: "Zamena izolacije na bakarnim cevima", category: "popravka", shortDescription: "Zamena oštećene ili istrošene izolacije radi bolje energetske efikasnosti.", priceFrom: 700, priceNote: "po metru", order: 13 },
  { slug: "zamena-kondenzatora", title: "Zamena kondenzatora", category: "popravka", shortDescription: "Zamena neispravnog kondenzatora na spoljašnjoj jedinici.", priceFrom: 3500, priceTo: 6000, priceNote: "zavisi od kapaciteta uređaja", order: 14 },
  { slug: "dopuna-gasa", title: "Dopuna i provera freona", category: "popravka", shortDescription: "Provera zaptivenosti sistema i dopuna gasa R32 ili R410A.", priceFrom: 6000, priceTo: 9000, priceNote: "zavisi od tipa gasa i kapaciteta", featured: true, order: 15 },
  { slug: "popravka-elektronike", title: "Popravka elektronike", category: "popravka", shortDescription: "Dijagnostika i popravka upravljačke ploče, senzora i ventilatora.", priceFrom: 3000, priceTo: 8000, order: 16 },
  { slug: "zamena-holendera", title: "Zamena holendera", category: "popravka", shortDescription: "Zamena spojnice na instalaciji radi otklanjanja curenja gasa.", priceFrom: 1300, priceNote: "po komadu", order: 17 },
  { slug: "zamena-ventila", title: "Zamena ventila", category: "popravka", shortDescription: "Zamena neispravnog ventila na unutrašnjoj ili spoljašnjoj jedinici.", priceFrom: 4000, order: 18 },
  { slug: "step-motor", title: "Step motor", category: "popravka", shortDescription: "Zamena step motora zaduženog za pokretanje lamela unutrašnje jedinice.", priceFrom: 3000, order: 19 },
  { slug: "konstatacija-kvara", title: "Konstatacija kvara", category: "dijagnostika", shortDescription: "Izlazak servisera i utvrđivanje uzroka kvara, uračunato u cenu popravke ako se izvrši.", priceFrom: 1500, featured: true, order: 20 },
];

const products = [
  {
    slug: "gree-pular-eco-12k", title: "Gree Pular Eco 12k", brand: "Gree", type: "Zidni", btu: 12000, price: 480, installationIncluded: true,
    shortDescription: "Inverter klima uređaj sa Wi-Fi upravljanjem, R32 gas, tih rad.", featured: true,
    specs: { energyClassCooling: "A++", energyClassHeating: "A+", gasType: "R32", wifi: true, warranty: "2 + 5 godina" },
    features: ["Inverter tehnologija za stabilnu temperaturu i nižu potrošnju struje", "Wi-Fi upravljanje putem mobilne aplikacije", "Tih rad unutrašnje jedinice", "Auto-restart funkcija posle nestanka struje", "Filter za prečišćavanje vazduha"],
  },
  {
    slug: "midea-xtreme-save-12k", title: "Midea Xtreme Save 12k", brand: "Midea", type: "Zidni", btu: 12000, price: 450, oldPrice: 520, installationIncluded: true,
    shortDescription: "Visoko energetski efikasan model, idealan za dnevne boravke do 35m².", featured: true,
    specs: { energyClassCooling: "A+++", energyClassHeating: "A++", gasType: "R32", wifi: true, warranty: "2 + 5 godina" },
    features: ["Izuzetno visoka energetska efikasnost (A+++)", "I-ECO tehnologija za dodatnu uštedu energije", "Wi-Fi upravljanje", "Rad na niskim spoljnim temperaturama do -15°C", "Self-clean funkcija isparivača"],
  },
  {
    slug: "daikin-sensira-18k", title: "Daikin Sensira 18k", brand: "Daikin", type: "Zidni", btu: 18000, price: 780, installationIncluded: true,
    shortDescription: "Pouzdan japanski brend, pogodan za veće prostorije i poslovni prostor.", featured: true,
    specs: { energyClassCooling: "A++", energyClassHeating: "A+", gasType: "R32", wifi: false, warranty: "2 + 5 godina" },
    features: ["Pouzdana japanska tehnologija", "Econo režim za smanjenu potrošnju energije", "Tih rad i stabilno hlađenje i grejanje", "Automatski restart nakon nestanka struje", "Pogodan za veće prostorije i poslovni prostor"],
  },
  {
    slug: "hisense-comfort-9k", title: "Hisense Comfort 9k", brand: "Hisense", type: "Zidni", btu: 9000, price: 380, installationIncluded: true,
    shortDescription: "Kompaktan i tih uređaj za manje sobe i kancelarije.",
    specs: { energyClassCooling: "A++", energyClassHeating: "A+", gasType: "R32", wifi: false, warranty: "2 + 5 godina" },
    features: ["Kompaktan dizajn pogodan za manje prostorije", "Tih rad, idealan za spavaće sobe i kancelarije", "I-Feel funkcija za precizno merenje temperature u prostoriji", "Brzo hlađenje i grejanje pri pokretanju"],
  },
  {
    slug: "lg-dualcool-24k", title: "LG DualCool 24k", brand: "LG", type: "Zidni", btu: 24000, price: 990, installationIncluded: true, featured: true,
    shortDescription: "Snažan inverter model za velike prostorije, Wi-Fi i brzo hlađenje.",
    specs: { energyClassCooling: "A++", energyClassHeating: "A+", gasType: "R32", wifi: true, warranty: "2 + 5 godina" },
    features: ["Snažan kapacitet za velike prostorije i otvorene planove", "Wi-Fi upravljanje putem LG ThinQ aplikacije", "DUAL Inverter kompresor za brzo hlađenje i tih rad", "Auto Clean funkcija sprečava stvaranje buđi i neprijatnih mirisa"],
  },
  {
    slug: "vivax-cool-12k", title: "Vivax Cool 12k", brand: "Vivax", type: "Zidni", btu: 12000, price: 420, installationIncluded: true,
    shortDescription: "Odličan odnos cene i kvaliteta za stambeni prostor.",
    specs: { energyClassCooling: "A++", energyClassHeating: "A+", gasType: "R32", wifi: false, warranty: "2 + 3 godine" },
    features: ["Odličan odnos cene i kvaliteta", "Inverter tehnologija", "Četiri režima rada: hlađenje, grejanje, sušenje i ventilacija", "Jednostavno upravljanje daljinskim upravljačem"],
  },
];

const blogPosts = [
  {
    slug: "kada-raditi-servis-klime",
    title: "Kada je vreme za servis klima uređaja?",
    category: "servis",
    excerpt: "Redovan servis produžava vek trajanja klime i smanjuje potrošnju struje. Evo kada tačno treba da ga zakažete.",
    summary: "Mali servis klime treba raditi jednom godišnje (idealno pred sezonu hlađenja), a veliki servis na svake 2–3 godine. Zanemarivanje servisa dovodi do gubitka efikasnosti i skupljih kvarova kompresora.",
    keyTakeaways: [
      "Mali servis: jednom godišnje, idealno pred sezonu hlađenja (april–maj)",
      "Veliki servis: na svake 2–3 godine, ili kod neprijatnog mirisa, curenja ili slabijeg hlađenja",
      "Klima bez servisa gubi i do 20% efikasnosti već posle prve sezone",
      "Redovno održavanje je uvek jeftinije od popravke kompresora",
    ],
    publishedAt: "2026-03-10T09:00:00.000Z",
    author: "Moj Klima Servis",
    body: [
      p("Svake godine, sa prvim toplim danima, isti scenario se ponavlja u hiljadama domaćinstava: uključite klimu posle zimske pauze i dočeka vas neprijatan miris, slabo hlađenje ili čudan zvuk. Dobra vest je da se skoro sve ovo može izbeći jednostavnim redovnim servisom, a u ovom tekstu objašnjavamo tačno kada, zašto i kako."),
      h2("Kratak odgovor: kada tačno treba servis"),
      p("Ako želite brz odgovor bez čitanja celog teksta: mali servis radite jednom godišnje, po pravilu u martu ili aprilu, pre nego što temperature krenu da rastu. Veliki servis radite na svake dve do tri godine, ili odmah čim primetite neki od upozoravajućih znakova opisanih ispod. Ako klimu koristite i za grejanje tokom zime, dodajte još jedan mali servis pred grejnu sezonu, u oktobru."),
      h2("Zašto klima uopšte treba servis"),
      p("Klima uređaj radi tako što uvlači vazduh iz prostorije, hladi ga (ili greje) preko isparivača, i vraća ga nazad. Zajedno sa vazduhom, u uređaj ulazi i sve što se u tom vazduhu nalazi: prašina, dlake kućnih ljubimaca, polen, čak i sitne masne čestice iz kuhinje. Sav taj materijal se hvata na filteru i, vremenom, na samom isparivaču."),
      p("Kad se filter i isparivač zaprljaju, dešavaju se dve stvari. Prvo, smanjuje se protok vazduha, pa uređaj mora duže da radi da bi ohladio istu prostoriju, što direktno podiže račun za struju. Drugo, vlažna, zaprljana površina isparivača postaje idealno mesto za razvoj plesni i bakterija, koje se zatim raznose po vazduhu svaki put kad uključite klimu."),
      p("Taj karakterističan, neprijatan miris pri paljenju uređaja gotovo uvek je znak da je vreme za servis, a ne kvar koji zahteva popravku."),
      h2("Znaci da klima traži servis"),
      ...bullets([
        "Neprijatan, ustajao miris kada uključite uređaj",
        "Slabije hlađenje nego ranije, iako je temperatura na daljinskom ista",
        "Uređaj radi duže da bi postigao istu temperaturu",
        "Primetno veći račun za struju u odnosu na prethodnu sezonu",
        "Kapanje ili curenje vode iz unutrašnje jedinice",
        "Glasniji rad nego što pamtite od ranije",
      ]),
      p("Ako prepoznajete dva ili više ovih znakova, verovatno ste već malo zakasnili sa servisom, ali to nije razlog za brigu, samo razlog da ga zakažete što pre."),
      h2("Mali servis naspram velikog servisa"),
      h3("Šta je mali servis"),
      p("Mali servis je ono što većina ljudi zamišlja pod redovnim održavanjem: vađenje i pranje filtera, pregled i površinsko čišćenje isparivača, provera odvoda kondenzata i kratak test rada. Traje kratko, radi se bez rasklapanja jedinice i to je minimum koji svaki uređaj treba da dobije jednom godišnje."),
      h3("Šta je veliki servis"),
      p("Veliki servis ide dublje: unutrašnja jedinica se delimično rasklapa, a isparivač i ventilator (turbina) se peru pod pritiskom specijalizovanim sredstvom koje rastvara naslage koje se ne mogu ukloniti običnim brisanjem. Ovo je servis koji stvarno vraća uređaj u stanje blisko fabričkom i preporučuje se na svake dve do tri godine, ili odmah ako mali servis nije rešio neprijatan miris ili slabo hlađenje."),
      h2("Kalendar servisa tokom godine"),
      p("Ako živite u Nišu ili okolini, klimatske prilike diktiraju logičan raspored. Mart ili april su idealni za mali servis pred sezonu hlađenja, jer je to period kada serviseri imaju manje gužve nego u jeku leta, pa se lakše dogovara termin. Ako uređaj koristite i za grejanje, dodajte kratku proveru u oktobru, pre nego što ga prebacite na zimski režim. Veliki servis planirajte za proleće, na svake dve do tri godine, kako bi uređaj ušao spreman u najintenzivniji period korišćenja."),
      h2("Šta se stvarno dešava ako preskočite servis"),
      p("Najveći, i najskuplji, rizik zanemarenog servisa je kompresor. Kada je protok vazduha smanjen zaprljanim filterom i isparivačem, kompresor mora da radi pod većim opterećenjem da bi postigao istu temperaturu. To opterećenje se akumulira iz sezone u sezonu i realno skraćuje vek trajanja upravo najskupljeg dela uređaja. Popravka ili zamena kompresora često košta upoređeno koliko i nekoliko godina redovnog servisa unapred, pa je matematika prilično jednostavna."),
      h2("Da li nešto od ovoga možete sami"),
      p("Da, delimično. Spoljašnji filter (onaj koji se lako izvlači iz unutrašnje jedinice) možete sami da izvadite, isperete mlakom vodom, osušite i vratite. Ovo je preporučljivo raditi na svake dve do tri nedelje tokom sezone intenzivnog korišćenja, između zakazanih servisa. Ono što treba prepustiti profesionalcu je sve što zahteva rasklapanje jedinice, čišćenje isparivača ili bilo kakav rad sa rashladnim gasom, jer neispravno vraćena jedinica lako počne da curi vodu ili gubi hermetičnost sistema."),
      h2("Koliko servis realno košta u odnosu na alternativu"),
      p("Cena malog servisa je uporediva sa cenom jednog izlaska u restoran za dvoje. Cena popravke kompresora je uporediva sa cenom novog, budžetski povoljnog uređaja. Kada se ta dva broja stave jedan pored drugog, redovan servis prestaje da deluje kao dodatni trošak i postaje ono što zapravo jeste: najjeftiniji način da klima potraje."),
    ],
    faq: [
      { question: "Koliko često treba servisirati klima uređaj?", answer: "Mali servis jednom godišnje, veliki servis na svake 2–3 godine." },
      { question: "Šta se dešava ako se klima ne servisira redovno?", answer: "Gubi efikasnost, troši više struje i povećava se rizik od skupe popravke kompresora." },
    ],
  },
  {
    slug: "ugradnja-klime-sta-treba-da-znate",
    title: "Ugradnja klime: šta treba da znate pre nego što pozovete servisera",
    category: "montaza",
    excerpt: "Od izbora BTU kapaciteta do pripreme zida: kratak vodič kroz proces montaže klima uređaja.",
    summary: "Pravilna ugradnja klima uređaja zavisi od tačnog izbora BTU kapaciteta prema kvadraturi, pozicioniranja jedinica i profesionalnog vakumiranja sistema pre puštanja gasa. Standardna montaža uključuje do 3 metra instalacije.",
    keyTakeaways: [
      "Do 20m²: dovoljno je 9.000 BTU; preko 35m²: potrebno je 18.000 BTU ili više",
      "Standardna montaža uključuje do 3m instalacije, dalje se dodatno naplaćuje",
      "Vakumiranje sistema pre puštanja gasa je ključno za dugovečnost kompresora",
      "Udaljenost unutrašnje i spoljašnje jedinice direktno utiče na cenu",
    ],
    publishedAt: "2026-04-02T09:00:00.000Z",
    author: "Moj Klima Servis",
    body: [
      p("Kupili ste novu klimu ili se spremate da je kupite, i sad sledi korak koji većina ljudi potceni: montaža. Loše izvedena ugradnja može da pretvori odličan uređaj u problematičan, dok dobra montaža obezbeđuje tih rad i punu efikasnost godinama unapred. Evo šta treba da znate pre nego što serviser dođe na vrata."),
      h2("Prvo: da li imate pravi kapacitet uređaja"),
      p("Pre nego što razmišljate o samoj montaži, proverite da li ste izabrali odgovarajući BTU kapacitet za prostoriju. Ovo je greška koju čak i iskusni kupci prave, obično u pravcu prevelikog uređaja u uverenju da je to bezbednija opcija. Nije. Kao osnovna orijentacija: do 20 kvadrata je dovoljno 9.000 BTU, između 20 i 28 kvadrata potrebno je 12.000 BTU, do 35 kvadrata 18.000 BTU, a za veće ili otvorene prostore 24.000 BTU ili razmatranje multi-split sistema sa dve unutrašnje jedinice."),
      p("Ako niste sigurni u koju kategoriju spada vaš prostor, bolje je zatražiti besplatnu procenu pre kupovine nego nagađati, jer pogrešan kapacitet znači ili slabije hlađenje ili nepotrebno visoku potrošnju."),
      h2("Šta pripremiti pre dolaska servisera"),
      ...bullets([
        "Odlučite okvirno gde želite unutrašnju jedinicu (zid bez prepreka, van direktne linije sa vratima)",
        "Razmislite gde bi spoljašnja jedinica bila najmanje upadljiva, a dobro provetrena",
        "Proverite da li imate slobodan pristup do te lokacije za montera i opremu",
        "Ako živite u zgradi, proverite pravila kućnog reda vezana za fasadu",
        "Oslobodite prostor ispod planirane pozicije unutrašnje jedinice",
      ]),
      p("Što više ovih stvari razjasnite unapred, brže i jeftinije će proći sam dan montaže, jer serviser neće morati da čeka na vaše odluke usred posla."),
      h2("Zašto je udaljenost jedinica bitna za cenu"),
      p("Standardna montaža po pravilu uključuje do tri metra instalacije bakarnih cevi između unutrašnje i spoljašnje jedinice. Svaki dodatni metar se naplaćuje posebno, jer znači dodatnu bakarnu cev, izolaciju, produžetak kabla i više vremena rada. Ako imate mogućnost da postavite obe jedinice relativno blizu (na primer, unutrašnja na spoljašnjem zidu, spoljašnja odmah sa druge strane istog zida), montaža će biti brža i jeftinija nego ako jedinice moraju da budu razdvojene kroz više prostorija."),
      h2("Šta se tačno dešava na dan montaže"),
      h3("Postavljanje jedinica"),
      p("Serviser prvo označava tačne pozicije, buši potrebne otvore za instalaciju i montira nosače za obe jedinice."),
      h3("Provlačenje instalacije"),
      p("Bakarne cevi, kabl za napajanje i crevo za odvod kondenzata provlače se kroz zid i povezuju na obe jedinice, uz pažljivo zaptivanje svih otvora."),
      h3("Vakumiranje, korak koji ne smete da preskočite"),
      p("Ovo je verovatno najvažniji, a najmanje vidljiv deo montaže. Pre nego što se pusti rashladni gas, sistem se vakumira kako bi se izvukli vazduh i vlaga iz cevi. Ako se ovaj korak preskoči ili uradi na brzinu, vlaga koja ostane u sistemu vremenom razara kompresor iznutra, a problem se često ne pokaže odmah, nego tek posle nekoliko meseci ili sezona. Kada dogovarate montažu, slobodno pitajte da li vakumiranje ulazi u cenu i koliko dugo traje, jer je to pitanje koje razlikuje ozbiljnog izvođača od onog koji žuri."),
      h3("Puštanje gasa i test"),
      p("Na kraju se otvara ventil, sistem se puni rashladnim gasom, a uređaj se testira u oba režima rada dok se ne potvrdi da hladi i greje kako treba, bez curenja na spojevima."),
      h2("Koliko vremena da izdvojite"),
      p("Za jednu standardnu jedinicu, računajte na dva do četiri sata, u zavisnosti od tipa zida i udaljenosti jedinica. Ako montirate više jedinica odjednom (multi-split sistem), realno je planirati ceo radni dan. Nema potrebe da neko bude prisutan tokom čitave montaže, ali je dobro da neko bude dostupan na početku, radi dogovora oko tačne pozicije, i na kraju, radi objašnjenja rada uređaja."),
      h2("Pitanja koja vredi postaviti pre nego što potvrdite termin"),
      ...bullets([
        "Da li je materijal za standardnih 3 metra uključen u cenu, i koliko košta dodatni metar",
        "Da li se vakumiranje sistema podrazumeva ili se posebno naplaćuje",
        "Kolika je garancija na izvedene radove montaže",
        "Da li mogu da donesem sopstveni uređaj, ili mora da bude kupljen kod njih",
      ]),
      p("Odgovori na ova pitanja govore mnogo o ozbiljnosti izvođača. Ako neko izbegava da odgovori jasno na pitanje o vakumiranju ili garanciji, to je znak da vredi potražiti drugu ponudu."),
      h2("Umesto zaključka: montaža je investicija, ne trošak koji treba minimizirati"),
      p("Razlika u ceni između jeftine i profesionalne montaže obično je manja nego što ljudi misle, dok razlika u posledicama može biti ogromna. Uređaj koji je pravilno montiran radiće tiho, efikasno i bez iznenađenja godinama, dok loše montiran uređaj, čak i vrhunskog brenda, može da razočara već u prvoj sezoni."),
    ],
    faq: [
      { question: "Koliko BTU mi treba za sobu od 25m²?", answer: "Za prostoriju te veličine preporučuje se uređaj od 12.000 BTU." },
      { question: "Da li mogu sam da kupim klimu pa naručim samo montažu?", answer: "Da, moguće je doneti sopstveni uređaj i naručiti samo uslugu montaže." },
    ],
  },
  {
    slug: "izbor-klime-po-kvadraturi",
    title: "Koju klimu izabrati prema kvadraturi prostorije",
    category: "izbor",
    excerpt: "Pregled preporučenih BTU kapaciteta za sobe, dnevne boravke i poslovni prostor.",
    summary: "Izbor BTU kapaciteta klima uređaja zavisi pre svega od kvadrature prostorije: 9.000 BTU za manje sobe, 12.000–18.000 BTU za dnevne boravke, 24.000 BTU ili multi-split sistem za velike ili otvorene prostore.",
    keyTakeaways: [
      "Do 20m²: 9.000 BTU",
      "20–28m²: 12.000 BTU",
      "28–35m²: 18.000 BTU",
      "Preko 35m² ili veliki stakleni prostori: 24.000 BTU ili multi-split sistem",
    ],
    publishedAt: "2026-05-18T09:00:00.000Z",
    author: "Moj Klima Servis",
    body: [
      p("Jedno od najčešćih pitanja koje čujemo od kupaca je jednostavno: koji BTU mi treba? Odgovor zavisi od više faktora nego što bi se na prvi pogled reklo, ali postoji jasna logika iza izbora, i u ovom tekstu je objašnjavamo tako da posle čitanja možete sami da procenite šta vam odgovara, a šta serviser treba samo da potvrdi na licu mesta."),
      h2("Šta uopšte znači BTU"),
      p("BTU (British Thermal Unit) je jedinica koja opisuje koliko toplote uređaj može da ukloni iz prostorije u jedinici vremena, odnosno koliki mu je kapacitet hlađenja (i grejanja, kod inverter uređaja koji rade u oba režima). Što je BTU veći, to uređaj može da ohladi veći ili teže hladljiv prostor. Ali veći BTU ne znači automatski i bolji izbor, o čemu više u nastavku."),
      h2("Osnovna tabela: BTU prema kvadraturi"),
      ...bullets([
        "Do 20 m² (manja soba, kancelarija): 9.000 BTU",
        "20 do 28 m² (veća soba, manji dnevni boravak): 12.000 BTU",
        "28 do 35 m² (veći dnevni boravak, otvoren prostor ka kuhinji): 18.000 BTU",
        "Preko 35 m² ili prostori sa velikim staklenim površinama: 24.000 BTU ili multi-split sistem",
      ]),
      p("Ovo su orijentacione vrednosti za standardnu visinu plafona (do 2,7 metra) i uobičajenu izolaciju. U nastavku objašnjavamo kada treba odstupiti od ove tabele naviše ili naniže."),
      h2("Faktori koji povećavaju potreban kapacitet"),
      ...bullets([
        "Prostorija okrenuta ka jugu ili zapadu, sa direktnim suncem veći deo dana",
        "Velike staklene površine ili francuski prozori",
        "Visina plafona iznad standardne (potkrovlja, stanovi sa visokim plafonima)",
        "Prostor koji se otvara ka kuhinji, gde dodatni izvori toplote (šporet, rerna) opterećuju hlađenje",
        "Veći broj osoba koje redovno borave u prostoriji (svaka osoba dodaje toplotu)",
      ]),
      p("Ako se prepoznajete u dva ili više ovih faktora, razmislite o jednoj kategoriji jačem uređaju od one koju predviđa osnovna tabela."),
      h2("Faktori koji smanjuju potreban kapacitet"),
      ...bullets([
        "Prostorija okrenuta ka severu, sa malo direktne sunčeve svetlosti",
        "Dobra termoizolacija zidova i stolarije novijeg datuma",
        "Prizemlje ili prostorija ispod neizloženog sprata, bez direktnog uticaja krova",
      ]),
      p("U ovim slučajevima, uređaj iz osnovne tabele obično je i više nego dovoljan, a u nekim slučajevima može se razmotriti i kategorija niže."),
      h2("Zašto veći BTU nije uvek bolji izbor"),
      p("Intuitivno deluje logično: kupim jači uređaj, sigurniji sam da će hladiti dovoljno. U praksi, predimenzionisan uređaj radi lošije od pravilno odabranog. Prejak kompresor brzo ohladi prostoriju do zadate temperature i onda se gasi, da bi se ubrzo ponovo uključio kad temperatura malo poraste. Taj obrazac kratkih ciklusa uključivanja i isključivanja je manje efikasan od kontinuiranog rada na nižoj snazi, troši više struje po jedinici hlađenja i ubrzava habanje kompresora."),
      p("Osim toga, prejaka klima često ne uspe dovoljno da smanji vlažnost vazduha, jer se prebrzo gasi, pa prostorija deluje hladno, ali vlažno, umesto prijatno rashlađeno."),
      h2("Kada razmišljati o multi-split sistemu"),
      p("Ako imate više prostorija koje želite da klimatizujete, a spoljašnji prostor za jedinice je ograničen, multi-split sistem (jedna spoljašnja jedinica koja napaja dve ili više unutrašnjih) može biti praktičnije i, dugoročno, isplativije rešenje od nezavisnih uređaja u svakoj sobi. Nedostatak je što u slučaju kvara spoljašnje jedinice, gube se sve povezane sobe odjednom, dok kod nezavisnih uređaja kvar pogađa samo jednu prostoriju."),
      h2("Praktičan primer: dnevni boravak sa kuhinjom"),
      p("Zamislimo tipičan primer: dnevni boravak od 26 kvadrata, otvoren ka kuhinji, sa balkonskim vratima okrenutim ka jugu. Osnovna tabela bi predložila 12.000 BTU za 26 kvadrata, ali otvorena kuhinja i južna orijentacija su dva faktora koja guraju izbor naviše, pa bi realna preporuka bila 18.000 BTU. Ovo je tipičan primer zašto samo kvadratura, bez konteksta prostorije, nije dovoljna za pouzdanu procenu."),
      h2("Najčešće greške pri izboru"),
      ...bullets([
        "Oslanjanje isključivo na kvadraturu, bez uzimanja u obzir orijentacije i staklenih površina",
        "Kupovina najjačeg dostupnog uređaja u uverenju da je to najsigurniji izbor",
        "Zanemarivanje energetskog razreda, koji dugoročno utiče na račun za struju više nego sama nabavna cena",
        "Nepoštovanje preporuke za standardnu dužinu instalacije, što kasnije poskupljuje montažu",
      ]),
      h2("Šta uraditi ako niste sigurni"),
      p("Ako i posle ove tabele niste sasvim sigurni koji kapacitet vam odgovara, najbolje rešenje je besplatna procena pre kupovine. Serviser koji dođe na lice mesta može za nekoliko minuta da proceni orijentaciju, izolaciju i specifičnosti prostora i predloži tačan kapacitet, umesto da nagađate na osnovu opšte tabele."),
    ],
    faq: [
      { question: "Da li veći BTU znači bolje hlađenje?", answer: "Ne nužno. Predimenzionisan uređaj se često uključuje i isključuje u kratkim ciklusima, što smanjuje efikasnost i habanje kompresora, zato je važno birati tačan kapacitet." },
      { question: "Da li orijentacija prostorije utiče na izbor kapaciteta?", answer: "Da, sobe okrenute ka jugu ili sa puno stakla obično zahtevaju jači uređaj od standardne preporuke za istu kvadraturu." },
    ],
  },
  {
    slug: "grejanje-klimom-zimi-da-li-se-isplati",
    title: "Grejanje klimom zimi: da li se isplati u Srbiji?",
    category: "saveti",
    excerpt: "Svake jeseni nas klijenti pitaju isto: može li klima ozbiljno da zameni grejanje zimi. Evo iskrenog odgovora, zasnovanog na onome što viđamo na terenu.",
    summary: "Inverter klima greje efikasno do određene spoljne temperature, ali u srpskim zimama sa temperaturama ispod nule efikasnost pada, pa je najisplativije koristiti je kao dopunu postojećem grejanju, a ne kao zamenu.",
    keyTakeaways: [
      "Inverter klima greje efikasno do otprilike -5°C do -10°C spoljne temperature, zavisno od modela",
      "Ispod te granice efikasnost naglo pada, a potrošnja raste",
      "Najbolji rezultat daje kombinacija: klima kao dopuna centralnom grejanju, ne kao zamena",
      "Redovan servis pred zimu direktno utiče na to koliko će klima efikasno grejati",
    ],
    publishedAt: "2026-06-05T09:00:00.000Z",
    author: "Moj Klima Servis",
    body: [
      p("Svake godine, negde krajem oktobra, počnu pozivi sa istim pitanjem: „Imam klimu, da li mi uopšte treba grejanje, ili mogu samo nju da koristim cele zime?” Iskreno, odgovor nije ni da ni ne, zavisi od par stvari koje ću ovde da razložim onako kako bih objasnio i klijentu na terenu."),
      h2("Kako klima uopšte greje"),
      p("Klima uređaj koji radi u režimu grejanja je zapravo toplotna pumpa: umesto da proizvodi toplotu, ona je „vadi” iz spoljašnjeg vazduha i prebacuje u prostoriju. To zvuči čudno kada je napolju hladno, ali sistem radi i na niskim temperaturama, samo sa manjom efikasnošću što je hladnije napolju."),
      p("Ovde je ključna reč efikasnost. Kod normalnih temperatura (recimo od 5 do 15 stepeni), inverter klima za jedan kilovat utrošene struje realno vrati i po tri do četiri kilovata toplotne energije. To je razlog zašto grejanje klimom u prelaznim periodima (oktobar, mart, april) zna da bude jeftinije od klasičnog grejanja."),
      h2("Gde je granica"),
      p("Problem nastaje kada temperatura padne ispod nule i ostane tu danima. Većina inverter klima i dalje radi i na minus deset, minus petnaest stepeni, ali im efikasnost pada dramatično, u nekim slučajevima se približi običnom električnom grejaču. Na jakom mrazu, spoljašnja jedinica troši dodatnu energiju i na odmrzavanje sopstvenog izmenjivača, što dodatno smanjuje realnu korist."),
      p("Drugim rečima: klima koja u oktobru greje odlično i jeftino, u januarskoj hladnoći greje, ali skupo."),
      h2("Šta stvarno viđamo na terenu"),
      p("Kad instaliramo novu klimu u jesen, čest je scenario da klijent prvu sezonu koristi isključivo nju za grejanje, oduševljen uštedom u odnosu na struju ili gas. Onda dođe prvi ozbiljan mraz, računi porastu, i sledeće zime se klima vrati na svoju prirodnu ulogu: dopuna, ne glavni izvor."),
      p("Ovo nije loše iskustvo, samo je realističnije očekivanje. Kombinacija klime (za blaže dane) i osnovnog grejanja (za najhladnije periode) gotovo uvek daje bolji rezultat od oslanjanja isključivo na jedno ili drugo."),
      h2("Kada se isplati kao glavni izvor grejanja"),
      ...bullets([
        "Manji, dobro izolovani stanovi, posebno u novogradnji",
        "Prostori gde se boravi povremeno, pa nema smisla grejati ceo sistem centralnog grejanja",
        "Regioni i sezone sa blažim zimama, gde temperatura retko ide duboko ispod nule",
      ]),
      h2("Kada se ne isplati kao jedini izvor"),
      ...bullets([
        "Starije zgrade sa slabom izolacijom, gde toplota brzo izlazi napolje",
        "Veći stanovi i kuće gde bi bilo potrebno više jedinica da se pokrije ceo prostor",
        "Periodi produženog mraza, kada se struja troši brzo bez proporcionalnog efekta",
      ]),
      h2("Praktičan savet iz iskustva"),
      p("Ako planirate da klimu koristite i za grejanje ove zime, dva su koraka koja stvarno prave razliku. Prvo, obavezno uradite servis pred sezonu grejanja, ne samo pred leto, jer zaprljan filter i isparivač jednako štete i grejanju kao i hlađenju. Drugo, ne gasite uređaj potpuno preko noći u hladnim periodima, jer ponovno zagrevanje ohlađene prostorije troši više energije nego održavanje stabilne, nešto niže temperature (recimo 18 stepeni umesto potpunog gašenja)."),
      p("Za većinu domaćinstava u Nišu i okolini, realno očekivanje je: klima kao odličan, jeftin izvor grejanja u oktobru, novembru, martu i aprilu, uz standardno grejanje kao oslonac tokom najhladnijih nedelja decembra, januara i februara."),
    ],
    faq: [
      { question: "Do koje temperature klima efikasno greje?", answer: "Većina savremenih inverter uređaja zadržava dobru efikasnost do oko -5°C do -10°C spoljne temperature, u zavisnosti od modela." },
      { question: "Da li je jeftinije grejati klimom ili strujom preko običnog grejača?", answer: "Klima je u proseku jeftinija jer prenosi toplotu umesto da je proizvodi, ali ta prednost se smanjuje na jakom mrazu." },
      { question: "Da li servis pred zimu ima smisla ako klimu koristim samo za hlađenje leti?", answer: "Ako je koristite i za grejanje, da, apsolutno. Ako je koristite samo leti, dovoljan je jedan servis godišnje pred sezonu hlađenja." },
    ],
  },
  {
    slug: "najcesce-greske-pri-montazi-klime",
    title: "Najčešće greške pri montaži klime koje kasnije skupo koštaju",
    category: "montaza",
    excerpt: "Dobar deo poziva koje primamo nisu nove montaže, nego ispravljanje tuđih. Evo šta najčešće nalazimo na terenu.",
    summary: "Najskuplje greške pri montaži klime (loša pozicija spoljašnje jedinice, nedovoljno vakumiranje, loše zaptivanje) retko se vide odmah, nego se pokažu tek posle nekoliko meseci ili sezona, kada je popravka skuplja nego što bi bila pravilna montaža.",
    keyTakeaways: [
      "Spoljašnja jedinica na direktnom, celodnevnom suncu radi lošije i troši više struje",
      "Nedovoljno vakumiranje se ne vidi odmah, ali skraćuje vek kompresora",
      "Loše zaptivena instalacija kroz zid dovodi do vlage i buđi unutar zida",
      "Predugačka instalacija bez dodatnog punjenja gasa direktno smanjuje kapacitet hlađenja",
    ],
    publishedAt: "2026-06-20T09:00:00.000Z",
    author: "Moj Klima Servis",
    body: [
      p("Kad bih morao da izdvojim jedan deo posla koji radim, a koji mi najviše otkriva o stanju tržišta, to bi bio izlazak na intervenciju gde na kraju ispostavi da problem uopšte nije u uređaju, nego u tome kako je montiran, i to često od nekog ko je došao, uzeo pare i otišao, bez pečata i bez garancije. Evo šta se najčešće nađe."),
      h2("Spoljašnja jedinica na punom suncu"),
      p("Ovo je verovatno najčešća greška koju vidim, a najlakše se izbegava. Spoljašnja jedinica koja stoji ceo dan na direktnom suncu, posebno na jugozapadnoj fasadi, radi u težim uslovima nego jedinica u hladu ili sa makar delimičnom zaštitom. Kompresor mora više da se trudi da odbaci toplotu u već zagrejan vazduh oko sebe, što znači veću potrošnju i, dugoročno, brže habanje."),
      p("Rešenje nije komplikovano: ako pozicija mora da bude na suncu, dovoljna je jednostavna nadstrešnica koja ne ometa protok vazduha, i razlika se oseti već posle prve sezone."),
      h2("Vakumiranje „na oko”"),
      p("Ovo je greška koja se ne vidi odmah, i baš zato je opasna. Pravilno vakumiranje traje neko vreme, obično dvadesetak do trideset minuta, dovoljno da se iz sistema izvuče sav vazduh i vlaga. Kad neko taj korak uradi za dva minuta, ili ga potpuno preskoči, sistem izgleda kao da radi normalno prve nedelje, prvog meseca, čak i prve sezone."),
      p("Problem se pojavi kasnije: vlaga koja je ostala u sistemu se meša sa uljem kompresora i vremenom razjeda unutrašnje delove. Kad dobijemo poziv „klima mi je odjednom prestala da hladi kako treba, a stara je tek dve godine”, ovo je prva stvar koju proveravamo, i nažalost, često se pokaže tačno."),
      h3("Kako da proverite da li je vaš sistem pravilno vakumiran"),
      p("Realno, kao korisnik ne možete sami da proverite ovaj korak nakon montaže, sistem izgleda isto spolja bilo da je urađen kako treba ili ne. Zato je najbolja zaštita da unapred pitate izvođača da li vakumiranje ulazi u cenu i koliko dugo traje, i da tražite pismenu potvrdu ili račun sa jasno navedenom uslugom montaže."),
      h2("Loše zaptivanje prolaza kroz zid"),
      p("Otvor kroz koji prolaze cevi, kabl i crevo za kondenz mora da bude brižljivo zaptiven silikonom ili posebnom masom, sa obe strane zida. Kad se ovo uradi na brzinu, kroz taj otvor vremenom ulazi vlaga spolja, a u kombinaciji sa kondenzacijom na cevima, to je direktan put ka buđi unutar zida, koja se često otkrije tek kad se skine gips ili oljušti farba oko otvora."),
      h2("Predugačka instalacija bez dopune gasa"),
      p("Svaki uređaj je fabrički napunjen gasom za standardnu dužinu instalacije, obično do tri ili pet metara, u zavisnosti od proizvođača. Ako je instalacija duža, a monter ne doda odgovarajuću količinu gasa za dodatne metre, sistem radi sa manje rashladnog fluida nego što mu treba. Rezultat je slabije hlađenje, uređaj koji radi duže da bi postigao istu temperaturu, i veća potrošnja, sve to dok korisnik misli da je kupio slab uređaj, a zapravo je uređaj odličan, samo pogrešno montiran."),
      h2("Šta ovo znači za vas kao korisnika"),
      p("Ne pišem ovo da uplašim ljude od montaže, nego da objasnim zašto cena nije jedini faktor koji treba gledati kad birate izvođača. Razlika između jeftine i profesionalne montaže je često manja nego što izgleda na prvi pogled, dok razlika u posledicama, kao što vidite gore, može biti ogromna i pojaviti se tek kad je najmanje očekujete."),
      ...bullets([
        "Tražite da vam jasno kažu da li vakumiranje ulazi u cenu",
        "Proverite da li dobijate pisanu garanciju na izvedene radove",
        "Pitajte kako se obračunava dodatna instalacija preko standardne dužine",
        "Ne birajte izvođača isključivo po najnižoj ceni, pogotovo ako je značajno niža od proseka",
      ]),
    ],
    faq: [
      { question: "Kako da znam da li je moja klima pravilno montirana?", answer: "Ako radi tiho, hladi ravnomerno i nema curenja, verovatno je sve u redu. Ako sumnjate, možemo da izvršimo proveru sistema i pritiska gasa." },
      { question: "Da li se greške pri montaži mogu naknadno ispraviti?", answer: "Većina može, uključujući ponovno vakumiranje i dopunu gasa, ali to je dodatni trošak koji se mogao izbeći pravilnom montažom od početka." },
      { question: "Da li skuplja montaža uvek znači kvalitetnija usluga?", answer: "Ne nužno, ali izuzetno niska cena u odnosu na tržišni prosek često znači da se neki koraci, poput vakumiranja, preskaču da bi se uštedelo vreme." },
    ],
  },
  {
    slug: "kada-je-vreme-za-novu-klimu",
    title: "Pet znakova da je vreme za novu klimu, ne za još jednu popravku",
    category: "saveti",
    excerpt: "Ne mora svaki kvar da znači kraj za vaš uređaj, ali postoji tačka kada popravka prestaje da ima smisla. Evo kako to prepoznajemo kada procenjujemo na terenu.",
    summary: "Stariji uređaji, posebno oni na gasu R22 koji se više ne proizvodi, sa učestalim kvarovima i niskim energetskim razredom, obično se više ne isplate popravljati. Pet konkretnih znakova pomažu da se odluka donese racionalno, ne emotivno.",
    keyTakeaways: [
      "Uređaji na gasu R22 su sve skuplji za servisiranje jer se taj gas više ne proizvodi u EU",
      "Ako ste popravljali isti uređaj dva ili više puta u poslednje dve godine, računica retko ide u prilog popravci",
      "Stariji uređaji nižeg energetskog razreda mogu da koštaju više na godišnjem nivou nego kupovina novog",
      "Vek trajanja klima uređaja je realno oko 10 do 15 godina uz redovan servis",
    ],
    publishedAt: "2026-07-01T09:00:00.000Z",
    author: "Moj Klima Servis",
    body: [
      p("Ovo je razgovor koji vodim sa klijentima često, obično dok stojim pored uređaja koji je već treći put ove godine otkazao. Niko ne voli da čuje da mu uređaj treba zameniti, pogotovo ne od servisera koji bi teoretski zaradio na još jednoj popravci. Ali posao radim pošteno, i ponekad je iskren savet vredniji od još jedne fakture."),
      h2("Zašto ovo pitanje uopšte postoji"),
      p("Svaka popravka ima smisla dok je njena cena znatno niža od cene novog uređaja slične klase. Problem je što se ta granica retko pređe odjednom, nego postepeno, kroz nekoliko manjih popravki koje pojedinačno deluju opravdano, a zbirno, kad se saberu, pokažu da je odavno bilo isplativije kupiti novi."),
      h2("Znak broj 1: uređaj radi na gasu R22"),
      p("Ovo je danas verovatno najjasniji signal. Gas R22, koji se koristio u starijim klima uređajima, više se ne proizvodi u Evropskoj uniji zbog uticaja na ozonski omotač, što znači da postojeće zalihe polako nestaju, a cena mu raste iz godine u godinu. Ako vaš uređaj radi na R22 i javi se curenje gasa, dopuna može da bude neproporcionalno skupa u odnosu na sam uređaj, jednostavno zato što se gas sve teže nabavlja."),
      h2("Znak broj 2: druga popravka u poslednje dve godine"),
      p("Jedna popravka je normalna pojava u životnom veku uređaja. Druga popravka u kratkom roku je signal da nešto sistemski nije u redu, možda je kompresor pri kraju svog veka, možda su elektronske komponente počele da stare zajedno. U tom trenutku vredi zastati i sabrati: koliko ste do sada uložili u popravke, i koliko bi realno koštala još jedna, pa tu sumu uporediti sa cenom novog uređaja slične snage."),
      h2("Znak broj 3: uređaj ima više od deset godina"),
      p("Uz redovan servis, klima uređaj realno traje između deset i petnaest godina. Posle te granice, čak i kad radi, obično radi lošije nego što je radio kao nov, jer su komponente prirodno istrošene. Ako imate uređaj stariji od deset godina i suočite se sa ozbiljnijim kvarom, to je trenutak da ozbiljno razmotrite zamenu, ne samo popravku."),
      h2("Znak broj 4: računi za struju rastu, a hlađenje je sve slabije"),
      p("Stariji uređaji imaju niži energetski razred od modernih inverter modela. Ako primetite da vam račun za struju raste iz sezone u sezonu, dok istovremeno klima hladi sve slabije, to nije slučajnost, to je kombinacija starenja kompresora i zastarele tehnologije. U tom slučaju, novi energetski efikasan uređaj se često isplati kroz uštedu na struji u roku od par godina, nezavisno od toga da li stari uređaj uopšte otkazuje."),
      h2("Znak broj 5: rezervni delovi su teško dostupni ili preskupi"),
      p("Za starije modele, posebno one koji se više ne proizvode, pojedini delovi mogu da budu teško dostupni ili se naručuju sa dugim čekanjem, a cena im raste upravo zato što ih je sve manje na tržištu. Kad procena popravke uključi frazu „delimo naći deo, ali potrajaće”, to je znak da se uređaj približio kraju svog praktičnog veka."),
      h2("Kako mi pravimo tu procenu"),
      p("Kada dođemo na intervenciju kod starijeg uređaja, ne predlažemo zamenu automatski, prvo uvek radimo standardnu dijagnostiku. Tek kad brojevi jasno pokažu da popravka nije isplativa, to i kažemo, uz objašnjenje zašto, i ostavljamo odluku vama. Cilj nam je da imate poverenja da vam nećemo naplatiti nešto što ne treba, bilo da je u pitanju popravka koja nije potrebna, ili nagovaranje na kupovinu novog uređaja koji vam realno ne treba."),
      ...bullets([
        "Uređaj radi na gasu R22",
        "Druga ozbiljnija popravka u poslednje dve godine",
        "Stariji je od deset godina",
        "Potrošnja raste, a hlađenje slabi",
        "Rezervni delovi su teško dostupni ili preskupi",
      ]),
      p("Ako prepoznajete dva ili više ovih znakova, vredi zatražiti procenu pre nego što uložite u još jednu popravku."),
    ],
    faq: [
      { question: "Da li je uređaj na R22 gasu opasan za korišćenje?", answer: "Nije opasan, i dalje može bezbedno da radi, ali servisiranje i dopuna gasa postaju sve skuplji i teže dostupni." },
      { question: "Koliko realno traje klima uređaj uz redovan servis?", answer: "Uz redovno godišnje održavanje, realan vek trajanja je između deset i petnaest godina." },
      { question: "Da li uvek predlažete zamenu kad je uređaj star?", answer: "Ne, prvo uvek radimo dijagnostiku. Zamenu predlažemo samo kada brojevi jasno pokažu da popravka nije isplativa." },
    ],
  },
];

const servicePages = [
  {
    slug: "servis",
    title: "Servis klima uređaja",
    heroSubtitle: "Redovno održavanje koje produžava vek trajanja uređaja i smanjuje potrošnju struje.",
    body: [
      h2("Zašto je redovan servis klima uređaja neophodan"),
      p("Klima uređaj tokom rada usisava vazduh iz prostorije zajedno sa prašinom, dlakama kućnih ljubimaca, polenom i vlagom. Sav taj materijal se vremenom taloži na filteru i isparivaču. Kad se ti delovi zaprljaju, protok vazduha se smanjuje, kompresor mora duže da radi da bi postigao istu temperaturu, a računi za struju rastu bez vidljivog razloga."),
      p("Osim potrošnje energije, tu je i pitanje higijene. Vlažan isparivač u kombinaciji sa prašinom je idealna sredina za razvoj plesni i bakterija, koje se potom raznose po prostoriji svaki put kad se klima uključi. Kod ljudi sa alergijama ili respiratornim tegobama ovo nije zanemarljivo, a neprijatan miris pri uključivanju je najčešće prvi znak da je servis odavno trebalo da se obavi."),
      p("Proizvođači klima uređaja u uputstvima za korišćenje eksplicitno preporučuju redovno održavanje, a kod nekih modela redovan servis je i uslov za važenje garancije. Zanemarivanje ovog koraka znači da se kvarovi, kad se jednom pojave, teže i skuplje otklanjaju."),
      h2("Šta je mali, a šta veliki servis"),
      h3("Mali (redovni) servis"),
      p("Mali servis je standardna, godišnja intervencija koja obuhvata čišćenje i dezinfekciju filtera, pregled isparivača, proveru odvoda kondenzata i osnovnu proveru rada uređaja. Traje kratko, ne zahteva rasklapanje jedinice i dovoljan je za uređaje koji rade u normalnim uslovima, u čistom stambenom prostoru."),
      h3("Veliki servis"),
      p("Veliki servis podrazumeva potpuno rasklapanje unutrašnje jedinice, dubinsko pranje isparivača i ventilatora (turbine) pod pritiskom, čišćenje odvoda kondenzata i po potrebi proveru pritiska rashladnog gasa. Preporučuje se na svake dve do tri godine, ili odmah ako primetite curenje vode, neprijatan miris koji mali servis nije rešio, ili primetno slabije hlađenje i pored redovnog održavanja."),
      h2("Koliko često treba servisirati klima uređaj"),
      p("Za stambeni prostor sa uobičajenom upotrebom, jednom godišnje je dovoljno za mali servis, po pravilu u proleće, pred početak sezone hlađenja. Ako klimu koristite intenzivno i za grejanje tokom zime, servis pred zimsku sezonu je jednako važan jer se isparivač prlja bez obzira na to da li uređaj hladi ili greje."),
      p("Poslovni prostori, restorani, frizerski i kozmetički saloni i slični prostori sa povećanom količinom prašine ili vlage u vazduhu zahtevaju servis i do dva puta godišnje, jer se filter i isparivač zaprljaju znatno brže nego u stanu."),
      h2("Šta se dešava ako zanemarite servis"),
      ...bullets([
        "Potrošnja struje raste jer kompresor radi duže da bi nadoknadio smanjen protok vazduha",
        "Neprijatan miris i lošiji kvalitet vazduha u prostoriji",
        "Curenje kondenzovane vode usled začepljenog odvoda",
        "Ubrzano habanje kompresora, koji je pojedinačno najskuplji deo za zamenu",
        "Mogući gubitak prava na garanciju kod pojedinih proizvođača",
      ]),
      p("U praksi, redovno održavanje uvek izlazi jeftinije od popravke ili zamene kompresora, a razlika u ceni između te dve situacije obično je višestruka."),
      h2("Kako izgleda profesionalni servis, korak po korak"),
      h3("Dijagnostika pre servisa"),
      p("Serviser prvo pokreće uređaj i proverava rad u režimu hlađenja i grejanja, sluša da li ima neuobičajenih zvukova i proverava temperaturu vazduha na izlazu iz unutrašnje jedinice."),
      h3("Čišćenje filtera i isparivača"),
      p("Filteri se vade, peru ili menjaju ako su oštećeni, a isparivač se čisti specijalizovanim sredstvima koja rastvaraju naslage masnoće i prašine bez oštećenja lamela."),
      h3("Provera rashladnog fluida"),
      p("Proverava se pritisak u sistemu. Ako je nizak, to obično ukazuje na mikro-curenje koje treba locirati i sanirati pre dopune gasa, jer sama dopuna bez otklanjanja uzroka curenja rešava problem samo privremeno."),
      h3("Provera električnih komponenti"),
      p("Kontrolišu se konektori, kondenzator i rad ventilatora, kako spoljašnje tako i unutrašnje jedinice, jer su ovo delovi koji najčešće otkazuju usled starenja i temperaturnih oscilacija."),
      h3("Test rada nakon servisa"),
      p("Na kraju se uređaj testira u oba režima rada, meri se temperatura i proverava da nema curenja vode, uz kratko objašnjenje korisniku o stanju uređaja."),
      h2("Da li servis klime produžava njen vek trajanja"),
      p("Da. Klima uređaj koji se redovno servisira realno može da radi znatno duže od proizvođačke garancije, dok uređaj koji nikad nije servisiran često pokazuje ozbiljne probleme sa kompresorom već u prvih pet do sedam godina. Najveći deo trošenja ne dolazi od samog hlađenja, nego od toga što kompresor mora da radi pod većim opterećenjem kada je protok vazduha smanjen zaprljanim filterom i isparivačem."),
      h2("Da li možete sami da očistite klimu"),
      p("Osnovno čišćenje spoljašnjeg filtera (vađenje, ispiranje vodom i sušenje) korisnik može sam da uradi između servisa, i to je preporučljivo raditi na svake dve do tri nedelje tokom sezone intenzivnog korišćenja. Ono što nije preporučljivo raditi samostalno je čišćenje isparivača, provera i dopuna gasa ili rasklapanje jedinice, jer neispravno sklopljena jedinica može da curi vodu u prostoriju ili da ošteti električne komponente."),
      h2("Kako izabrati pouzdanog servisera"),
      ...bullets([
        "Transparentan cenovnik pre početka radova, bez skrivenih troškova",
        "Serviser koji objašnjava šta tačno radi i zašto",
        "Garancija na izvedeni servis",
        "Iskustvo sa vašim konkretnim brendom i tipom uređaja",
      ]),
    ],
    checklist: [
      { title: "Čišćenje i dezinfekcija filtera", description: "Uklanjanje bakterija, plesni i neprijatnih mirisa." },
      { title: "Provera i dopuna freona", description: "Kako bi uređaj radio s maksimalnom efikasnošću." },
      { title: "Kontrola električnih komponenti i konektora", description: "Za siguran i dugotrajan rad." },
      { title: "Pregled spoljašnje jedinice", description: "Uklanjanje prljavštine i provera ispravnosti ventilatora i kompresora." },
    ],
    ctaBandTitle: "Hitne intervencije i popravke",
    ctaBandText: "U slučaju iznenadnih kvarova, naš servisni tim stoji vam na raspolaganju za brze i efikasne popravke. Bez obzira na vrstu problema, možete računati na:",
    ctaBandBullets: ["Brz dolazak i dijagnostiku kvara", "Originalne rezervne delove", "Garanciju na izvršene popravke", "Transparentne cene i profesionalan pristup"],
    whyUs: [
      { title: "Iskusni i sertifikovani tehničari", description: "Garantuju stručnost i kvalitet usluge." },
      { title: "Korišćenje najsavremenije opreme", description: "Za preciznu instalaciju i održavanje." },
      { title: "Pouzdanost i tačnost", description: "Poštujemo dogovorene rokove i standarde." },
      { title: "Dostupnost i fleksibilnost", description: "Prilagođavamo se vašem rasporedu." },
    ],
    faq: [
      { question: "Koliko često treba servisirati klima uređaj?", answer: "Preporučuje se mali servis jednom godišnje, po pravilu pred sezonu hlađenja, a veliki servis na svake 2–3 godine." },
      { question: "Koliko traje servis klime?", answer: "Mali servis obično traje 30–45 minuta po jedinici, dok veliki servis, koji uključuje rasklapanje jedinice, traje 1–2 sata." },
      { question: "Da li treba da budem prisutan tokom servisa?", answer: "Poželjno je da neko bude prisutan da servisera pusti u prostor, ali fizičko prisustvo tokom čitavog servisa nije neophodno." },
      { question: "Koja je cena malog servisa klime?", answer: "Cena zavisi od BTU kapaciteta uređaja i kreće se od 2.500 dinara, a tačan cenovnik pogledajte ispod." },
    ],
  },
  {
    slug: "montaza",
    title: "Montaža klima uređaja",
    heroSubtitle: "Profesionalna ugradnja koja obezbeđuje tih rad, maksimalnu efikasnost i dugovečnost uređaja.",
    body: [
      h2("Zašto stručna montaža određuje ceo vek trajanja klime"),
      p("Kvalitet montaže utiče na performanse klima uređaja koliko i sam uređaj, ako ne i više. Loše postavljena instalacija, nedovoljno vakumiran sistem ili pogrešno pozicionirana spoljašnja jedinica mogu da smanje efikasnost novog uređaja i do trideset procenata, dovedu do bržeg habanja kompresora ili izazovu curenje već u prvoj godini korišćenja. Zato je montaža korak na kojem se najviše isplati angažovati proverenog izvođača, čak i ako je to nešto skuplja opcija od najjeftinije ponude na tržištu."),
      h2("Izbor pravog kapaciteta uređaja pre montaže"),
      p("Pre same ugradnje, ključno je da BTU kapacitet uređaja odgovara kvadraturi i karakteristikama prostorije. Kao orijentacija: do 20 kvadrata dovoljan je uređaj od 9.000 BTU, prostorije između 20 i 28 kvadrata zahtevaju 12.000 BTU, do 35 kvadrata 18.000 BTU, a veći ili otvoreni prostori 24.000 BTU ili razmatranje multi-split sistema. Na konačan izbor utiču i orijentacija prostorije, sprat, izolacija zidova i broj osoba koje borave u prostoru."),
      p("Predimenzionisan uređaj nije bolje rešenje. Prejak kompresor se često uključuje i isključuje u kratkim ciklusima umesto da radi kontinuirano na nižoj snazi, što ubrzava habanje i smanjuje efikasnost dugoročno."),
      h2("Kako izgleda proces montaže korak po korak"),
      h3("Procena pozicije jedinica"),
      p("Unutrašnja jedinica se postavlja tako da vazduh ravnomerno struji kroz prostoriju, po pravilu na zidu bez prepreka i van direktne linije sa vratima. Spoljašnja jedinica treba da bude na mestu sa dobrom cirkulacijom vazduha, zaštićena od direktnog sunca ako je moguće, i lako dostupna za buduće servisiranje."),
      h3("Bušenje i provlačenje instalacije"),
      p("Bakarne cevi za rashladni fluid, kabl za napajanje i crevo za odvod kondenzata provlače se kroz zid, uz brižljivo zaptivanje otvora da ne bi dolazilo do prodora vlage ili insekata."),
      h3("Vakumiranje sistema"),
      p("Ovo je korak koji se najčešće preskače kod neovlašćenih montera, a najviše utiče na dugovečnost uređaja. Pre puštanja gasa, sistem se vakumira kako bi se uklonili vazduh i vlaga iz cevi. Ako ostane i tragova vlage, ona se meša sa rashladnim fluidom i uljem kompresora i vremenom razara unutrašnje komponente."),
      h3("Puštanje gasa i test rada"),
      p("Nakon vakumiranja, otvara se ventil i rashladni fluid iz spoljašnje jedinice puni sistem. Uređaj se zatim pokreće u oba režima rada, meri se temperatura vazduha i proverava da nema curenja na spojevima."),
      h2("Standardna instalacija i dodatni metri"),
      p("Cenovnik montaže po pravilu uključuje do tri metra instalacije bakarnih cevi između unutrašnje i spoljašnje jedinice. Ako je razmak veći, svaki dodatni metar se naplaćuje posebno, jer zahteva dodatni materijal (bakarna cev, izolacija, kabl) i duže vreme rada. Zato je korisno unapred razmisliti o poziciji obe jedinice i po mogućnosti ih postaviti što bliže jedna drugoj, bez ugrožavanja estetike i funkcionalnosti prostora."),
      h2("Koliko traje montaža klima uređaja"),
      p("Standardna montaža jedne jedinice sa uobičajenom dužinom instalacije traje između dva i četiri sata, u zavisnosti od udaljenosti jedinica, tipa zida (beton, gips, opeka) i da li je potrebno provlačenje kroz više prostorija. Montaža multi-split sistema sa više unutrašnjih jedinica traje duže, obično celi radni dan."),
      h2("Da li mogu sam da kupim klimu, a naručim samo montažu"),
      p("Da, ovo je uobičajena praksa. Montaža se naplaćuje nezavisno od toga gde je uređaj kupljen. Jedina razlika je što garanciju na sam uređaj tada daje prodavac kod koga je kupljen, dok garanciju na izvedene radove montaže daje firma koja je montažu izvela."),
      h2("Montaža u zgradi: pravila i saglasnosti"),
      p("U stambenim zgradama uobičajeno je da se poštuju pravila kućnog reda vezana za izgled fasade i poziciju spoljašnjih jedinica. Iskusan monter zna kako da predloži rešenje koje je funkcionalno i istovremeno najmanje upadljivo, a po potrebi može da vas posavetuje i oko toga kako da izbegnete nesuglasice sa komšijama ili upravnikom zgrade."),
      h2("Znaci loše izvedene montaže"),
      ...bullets([
        "Neuobičajena buka ili vibracije spoljašnje jedinice",
        "Curenje vode iz unutrašnje jedinice",
        "Slabije hlađenje ili grejanje u odnosu na deklarisani kapacitet uređaja",
        "Zamrzavanje bakarnih cevi ili isparivača",
        "Neprijatan miris koji se javlja ubrzo nakon ugradnje",
      ]),
      p("Ako primetite bilo koji od ovih znakova ubrzo nakon montaže, vredi zatražiti proveru, jer je u pitanju najverovatnije nedovoljno vakumiranje sistema ili nepravilno postavljena instalacija, a ne kvar samog uređaja."),
    ],
    checklist: [
      { title: "Procena idealne pozicije jedinica", description: "Za optimalan protok vazduha i lakše održavanje." },
      { title: "Bušenje i provlačenje instalacije", description: "Uredno postavljanje bakarnih cevi i kablova." },
      { title: "Vakumiranje sistema", description: "Uklanjanje vlage i vazduha pre puštanja gasa, ključno za dugovečnost kompresora." },
      { title: "Test rada i puštanje u pogon", description: "Provera hlađenja, grejanja i curenja pre predaje korisniku." },
    ],
    ctaBandTitle: "Montaža u kratkom roku",
    ctaBandText: "Za standardne ugradnje u većini slučajeva izlazimo na teren u roku od 24–48h od poziva. Uz montažu dobijate:",
    ctaBandBullets: ["Besplatnu procenu na licu mesta", "Osnovni materijal do 3m instalacije", "Uredno završene radove i čišćenje prostora", "Garanciju na izvedene radove"],
    whyUs: [
      { title: "Sertifikovani instalateri", description: "Obučeni za rad sa svim vodećim brendovima klima uređaja." },
      { title: "Kvalitetan instalacioni materijal", description: "Bakarne cevi i izolacija visokog kvaliteta." },
      { title: "Uredna i brza montaža", description: "Prosečna ugradnja traje 2–4 sata." },
      { title: "Podrška posle ugradnje", description: "Tu smo i nakon montaže za sva pitanja." },
    ],
    faq: [
      { question: "Koliko traje ugradnja klima uređaja?", answer: "Standardna montaža traje između 2 i 4 sata, u zavisnosti od udaljenosti unutrašnje i spoljašnje jedinice." },
      { question: "Da li je materijal uključen u cenu montaže?", answer: "Osnovna instalacija do 3 metra je uključena; svaki dodatni metar bakarne cevi se posebno naplaćuje." },
      { question: "Da li mogu sam da kupim klimu pa vas pozovem samo za montažu?", answer: "Da, montiramo uređaje kupljene kod nas ili donete od strane korisnika." },
      { question: "Da li je potrebna saglasnost zgrade ili komšija za spoljašnju jedinicu?", answer: "U zgradama je uobičajeno da se poštuju pravila zajednice, a rado ćemo vam savetovati najbolju i najmanje ometajuću poziciju." },
    ],
  },
  {
    slug: "popravka",
    title: "Popravka klima uređaja",
    heroSubtitle: "Brza dijagnostika i popravka kvarova, uz originalne rezervne delove i garanciju na izvedene radove.",
    body: [
      h2("Najčešći kvarovi kod klima uređaja"),
      p("Klima uređaji su relativno pouzdani sistemi, ali kao i svaki uređaj sa pokretnim delovima i električnim komponentama, vremenom mogu da otkažu. Najčešći kvarovi koje serviseri viđaju na terenu su curenje rashladnog gasa, kvar kompresora, neispravan kondenzator, oštećena elektronika upravljačke ploče i začepljen odvod kondenzata."),
      h2("Klima duva, ali ne hladi: šta je uzrok"),
      p("Ovo je jedna od najčešćih prijava kvara. Najčešći uzroci su nedostatak rashladnog gasa usled curenja, zaprljan filter ili isparivač koji ometaju izmenu toplote, ili kvar na kompresoru koji je centralna komponenta celog sistema. Tačan uzrok se sa sigurnošću utvrđuje jedino dijagnostikom na licu mesta, jer isti simptom može imati potpuno različite uzroke, a i različitu cenu popravke."),
      h2("Klima curi vodu: šta uraditi"),
      p("Curenje vode iz unutrašnje jedinice najčešće je posledica začepljenog odvoda kondenzata, neravno postavljene jedinice pri montaži, ili zaleđenog isparivača koji se otapa i prelama kapacitet odvodnog sistema. U retkim slučajevima radi se o oštećenju samog creva za odvod. Ovo je kvar koji ne treba odlagati, jer voda koja curi u zid ili plafon može da izazove dodatnu, znatno skuplju štetu na objektu."),
      h2("Klima se sama gasi ili ne reaguje na daljinski"),
      p("Ako se uređaj gasi sam od sebe tokom rada, najčešće je u pitanju zaštita od pregrevanja koja se aktivira zbog prljavog filtera, nedovoljnog protoka vazduha na spoljašnjoj jedinici ili problema sa naponom napajanja. Ako uređaj uopšte ne reaguje na daljinski upravljač, proverite prvo baterije i osiguravajuću sklopku u razvodnom ormaru pre nego što zakažete izlazak servisera, jer je to najjednostavniji i najčešći uzrok."),
      h2("Kako izgleda proces popravke"),
      h3("Dijagnostika kvara na licu mesta"),
      p("Serviser prvo utvrđuje uzrok kvara: meri pritisak rashladnog gasa, proverava rad kompresora i ventilatora, testira elektronske komponente i vizuelno pregleda instalaciju u potrazi za tragovima curenja ili oštećenja."),
      h3("Predlog i procena troškova"),
      p("Nakon dijagnostike, dobijate jasno objašnjenje uzroka kvara i procenu cene popravke pre nego što se bilo šta zameni ili popravi, tako da unapred znate na čemu ste."),
      h3("Zamena neispravnih delova"),
      p("U zavisnosti od kvara, menja se kompresor, kondenzator, elektronska ploča, ventil ili drugi deo, uz korišćenje delova koji odgovaraju specifikaciji proizvođača uređaja."),
      h3("Provera zaptivenosti i dopuna gasa"),
      p("Ako je kvar bio vezan za curenje, mesto curenja se sanira, sistem se ponovo vakumira i puni gasom na propisan pritisak, čime se sprečava ponavljanje istog problema u kratkom roku."),
      h3("Testiranje nakon popravke"),
      p("Uređaj se testira u realnim uslovima rada, u oba režima, pre nego što se intervencija smatra završenom."),
      h2("Popravka ili zamena: kada se koja opcija isplati"),
      p("Kod uređaja starijih od deset godina, kod kojih kvar zahvata kompresor, često je isplativije razmotriti zamenu novim, energetski efikasnijim uređajem nego ulaganje u skupu popravku starog. Kod novijih uređaja ili kvarova koji ne zahvataju kompresor (elektronika, ventili, curenje), popravka je gotovo uvek bolji izbor. Iskren savet o tome šta se isplati dobijate uvek nakon dijagnostike, ne pre nje."),
      h2("Garancija na izvedene popravke"),
      p("Sve izvedene popravke dolaze sa garancijom čiji rok zavisi od vrste intervencije. Ovo je bitna razlika u odnosu na angažovanje neformalnih majstora bez evidentiranog rada, kod kojih u slučaju ponavljanja kvara nemate na koga da se pozovete."),
      h2("Koliko brzo se izlazi na teren kod hitnih kvarova"),
      p("Kod hitnih slučajeva, posebno tokom letnjih vrućina kada je klima praktično neophodnost, trudimo se da izađemo na teren u okviru istog ili narednog radnog dana. Brz dolazak i tačna dijagnostika su često važniji od same cene popravke, jer skraćuju vreme bez funkcionalnog uređaja."),
    ],
    checklist: [
      { title: "Dijagnostika kvara na licu mesta", description: "Utvrđivanje uzroka pre početka popravke." },
      { title: "Zamena neispravnih delova", description: "Kompresor, kondenzator, elektronika i drugi delovi." },
      { title: "Provera zaptivenosti i dopuna gasa", description: "Otklanjanje curenja i vraćanje pritiska na optimalan nivo." },
      { title: "Testiranje nakon popravke", description: "Provera rada uređaja pre završetka intervencije." },
    ],
    ctaBandTitle: "Hitne intervencije i popravke",
    ctaBandText: "U slučaju iznenadnih kvarova, naš servisni tim stoji vam na raspolaganju za brze i efikasne popravke. Bez obzira na vrstu problema, možete računati na:",
    ctaBandBullets: ["Brz dolazak i dijagnostiku kvara", "Originalne rezervne delove", "Garanciju na izvršene popravke", "Transparentne cene i profesionalan pristup"],
    whyUs: [
      { title: "Iskusni majstori", description: "Prepoznaju uzrok kvara brzo i precizno." },
      { title: "Originalni rezervni delovi", description: "Za dugotrajno i pouzdano rešenje problema." },
      { title: "Garancija na popravke", description: "Sigurnost da je posao urađen kako treba." },
      { title: "Transparentne cene", description: "Znate tačnu cenu pre početka radova." },
    ],
    faq: [
      { question: "Koliko košta dijagnostika kvara?", answer: "Konstatacija kvara iznosi od 1.500 dinara i uračunava se u cenu popravke ukoliko se ona izvrši." },
      { question: "Klima duva, ali ne hladi: šta je uzrok?", answer: "Najčešći uzroci su nedostatak freona, zaprljan filter/isparivač ili kvar na kompresoru, a tačan uzrok se utvrđuje dijagnostikom na licu mesta." },
      { question: "Da li dajete garanciju na popravke?", answer: "Da, sve izvedene popravke imaju garanciju čiji rok zavisi od vrste intervencije." },
      { question: "Koliko brzo možete da izađete na teren?", answer: "U većini slučajeva u okviru istog ili narednog radnog dana." },
    ],
  },
  {
    slug: "dijagnostika",
    title: "Dijagnostika kvara",
    heroSubtitle: "Precizno utvrđivanje uzroka kvara pre bilo kakve intervencije, uz jasnu i transparentnu procenu.",
    body: [
      h2("Zašto je dijagnostika prvi i najvažniji korak"),
      p("Kod klima uređaja, isti simptom (na primer, klima duva ali ne hladi) može imati nekoliko potpuno različitih uzroka, od kojih neki koštaju hiljadu dinara, a neki i deset puta više. Dijagnostika je proces kojim se taj uzrok precizno utvrđuje pre nego što se bilo šta zameni ili popravi, tako da ne plaćate za intervencije koje ne rešavaju stvarni problem."),
      p("Bez ozbiljne dijagnostike, popravka se svodi na nagađanje: menja se deo za delom dok se problem ne reši, što je i sporije i skuplje za korisnika. Zato je dijagnostika investicija koja se isplati, ne dodatni trošak koji se može preskočiti."),
      h2("Šta obuhvata profesionalna dijagnostika"),
      h3("Vizuelni pregled uređaja"),
      p("Pregledaju se unutrašnja i spoljašnja jedinica, sva vidljiva instalacija i priključci, u potrazi za tragovima curenja ulja (znak curenja gasa), korozije, oštećenja izolacije ili labavih spojeva."),
      h3("Merenje pritiska i temperature"),
      p("Manometrom se meri pritisak rashladnog gasa u sistemu, a temperaturnom sondom razlika između usisnog i izduvnog vazduha. Ova merenja pokazuju da li kompresor i ceo rashladni krug rade u okviru normalnih parametara."),
      h3("Provera elektronike i senzora"),
      p("Savremeni uređaji imaju ugrađenu dijagnostiku koja putem trepćuće LED diode ili šifre greške na displeju ukazuje na tip kvara. Serviser očitava ove kodove i dodatno testira senzore i upravljačku ploču multimetrom, jer sama šifra greške često ukazuje samo na simptom, ne i na koren problema."),
      h3("Pisana procena i predlog rešenja"),
      p("Nakon završene dijagnostike, dobijate jasno, razumljivim jezikom objašnjen uzrok kvara i procenu troškova popravke, pre nego što se donese odluka o daljem koraku."),
      h2("Koliko traje dijagnostika kvara"),
      p("U proseku dijagnostika traje između dvadeset i trideset minuta, u zavisnosti od složenosti problema i toga da li je potrebno delimično rasklapanje jedinice da bi se videli unutrašnji delovi. Kod složenijih slučajeva, gde je potrebno pratiti rad uređaja kroz duži ciklus da bi se uhvatila povremena greška, dijagnostika može trajati i duže."),
      h2("Da li se cena dijagnostike računa u popravku"),
      p("Da. Ukoliko se nakon dijagnostike odlučite za popravku kod nas, cena konstatacije kvara se oduzima od ukupne cene popravke. Plaćate je kao samostalnu uslugu jedino ako se odlučite da popravku ne izvršite ili je poverite nekom drugom."),
      h2("Šta ako popravka nije isplativa"),
      p("Deo posla je i da vam damo iskren savet, čak i kada taj savet znači manji posao za nas. Ako je uređaj star, kvar zahvata kompresor, a cena popravke se približava ceni novog uređaja slične klase, to ćemo vam otvoreno reći i predložićemo alternativu, umesto da vam naplatimo popravku koja se dugoročno ne isplati."),
      h2("Najčešći kodovi grešaka i šta znače"),
      p("Iako se oznake razlikuju od proizvođača do proizvođača, većina grešaka na displeju spada u nekoliko širih kategorija: greška senzora temperature, greška komunikacije između unutrašnje i spoljašnje jedinice, greška niskog pritiska (obično curenje gasa) i greška zaštite kompresora od preopterećenja. Tačno tumačenje šifre zahteva uvid u tehničku dokumentaciju konkretnog modela, što je još jedan razlog zašto se dijagnostika prepušta serviseru, a ne pokušava samostalno tumačenje po internetu."),
      h2("Kada je vreme da pozovete servisera"),
      ...bullets([
        "Klima duva, ali vazduh nije hladan ili topao kao ranije",
        "Neuobičajeni zvuci, škripanje ili lupanje pri radu",
        "Curenje vode iz unutrašnje jedinice",
        "Uređaj se sam gasi ili ne reaguje na komande",
        "Treperi indikator greške na displeju ili unutrašnjoj jedinici",
      ]),
      p("Što pre reagujete na prve znake problema, manja je verovatnoća da će se kvar proširiti na dodatne komponente i poskupeti popravku."),
    ],
    checklist: [
      { title: "Vizuelni pregled uređaja", description: "Unutrašnje i spoljašnje jedinice, instalacije i priključaka." },
      { title: "Merenje pritiska i temperature", description: "Provera rada kompresora i cirkulacije gasa." },
      { title: "Provera elektronike i senzora", description: "Očitavanje grešaka i test rada komponenti." },
      { title: "Pisana procena i predlog rešenja", description: "Jasno objašnjenje kvara i opcija za popravku." },
    ],
    ctaBandTitle: "Brza i pouzdana dijagnostika",
    ctaBandText: "Naš cilj je da tačno utvrdimo uzrok kvara pre nego što predložimo bilo kakvu intervenciju, tako da ne plaćate za nepotrebne popravke. Uz dijagnostiku dobijate:",
    ctaBandBullets: ["Jasno objašnjenje uzroka kvara", "Pisanu procenu troškova popravke", "Iskren savet, čak i ako popravka nije isplativa", "Uračunavanje cene dijagnostike u popravku"],
    whyUs: [
      { title: "Precizna oprema za merenje", description: "Tačno lociranje kvara bez nagađanja." },
      { title: "Iskustvo sa svim brendovima", description: "Radimo dijagnostiku uređaja svih proizvođača." },
      { title: "Transparentnost", description: "Objašnjavamo svaki nalaz razumljivim jezikom." },
      { title: "Fer procena", description: "Predlažemo popravku samo kada je zaista isplativa." },
    ],
    faq: [
      { question: "Da li se cena dijagnostike računa u popravku?", answer: "Da, ukoliko se odlučite za popravku kod nas, cena konstatacije kvara se oduzima od ukupne cene." },
      { question: "Koliko traje dijagnostika?", answer: "U proseku 20–30 minuta, u zavisnosti od složenosti problema." },
      { question: "Šta ako popravka nije isplativa?", answer: "Iskreno ćemo vas obavestiti i predložiti alternativu, npr. zamenu uređaja novim." },
      { question: "Da li mogu da dobijem pisanu procenu?", answer: "Da, na zahtev dostavljamo pisanu procenu troškova popravke." },
    ],
  },
];

function h2(text) {
  return { _type: "block", style: "h2", children: [{ _type: "span", text }] };
}
function h3(text) {
  return { _type: "block", style: "h3", children: [{ _type: "span", text }] };
}
function p(text) {
  return { _type: "block", style: "normal", children: [{ _type: "span", text }] };
}
function bullets(items) {
  return items.map((text) => ({
    _type: "block",
    style: "normal",
    listItem: "bullet",
    level: 1,
    children: [{ _type: "span", text }],
  }));
}

async function run() {
  console.log(`Seedujem podatke u Sanity projekat ${projectId} (dataset: ${dataset})...`);

  await client.createOrReplace(siteSettings);
  console.log("✓ Podešavanja sajta");

  for (const [i, service] of services.entries()) {
    const { slug, ...rest } = service;
    await client.createOrReplace({
      _id: `service-${slug}`,
      _type: "service",
      ...rest,
      slug: { _type: "slug", current: slug },
    });
    console.log(`✓ Usluga ${i + 1}/${services.length}: ${service.title}`);
  }

  for (const [i, page] of servicePages.entries()) {
    const { slug, ...rest } = page;
    await client.createOrReplace({
      _id: `servicePage-${slug}`,
      _type: "servicePage",
      ...rest,
      slug: { _type: "slug", current: slug },
    });
    console.log(`✓ Stranica usluge ${i + 1}/${servicePages.length}: ${page.title}`);
  }

  for (const [i, product] of products.entries()) {
    const { slug, ...rest } = product;
    await client.createOrReplace({
      _id: `product-${slug}`,
      _type: "product",
      ...rest,
      slug: { _type: "slug", current: slug },
    });
    console.log(`✓ Proizvod ${i + 1}/${products.length}: ${product.title}`);
  }

  for (const [i, post] of blogPosts.entries()) {
    await client.createOrReplace({
      _id: `blogPost-${post.slug}`,
      _type: "blogPost",
      title: post.title,
      category: post.category,
      excerpt: post.excerpt,
      summary: post.summary,
      keyTakeaways: post.keyTakeaways,
      publishedAt: post.publishedAt,
      author: post.author,
      slug: { _type: "slug", current: post.slug },
      body: post.body,
      faq: post.faq,
    });
    console.log(`✓ Blog ${i + 1}/${blogPosts.length}: ${post.title}`);
  }

  console.log("\nGotovo! Otvori /studio da vidiš i uređuješ sadržaj.");
}

run().catch((err) => {
  console.error("Seed nije uspeo:", err.message);
  process.exit(1);
});
