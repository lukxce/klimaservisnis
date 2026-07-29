export function brandSlug(brand: string): string {
  return brand
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function btuBucket(btu: number): 9000 | 12000 | 18000 | 24000 {
  if (btu <= 10500) return 9000;
  if (btu <= 15000) return 12000;
  if (btu <= 21000) return 18000;
  return 24000;
}

export function capacitySlug(btu: number): string {
  return `${btu}-btu`;
}

type FaqItem = { question: string; answer: string };

type BrandHub = {
  slug: string;
  name: string;
  subtitle: string;
  intro: string[];
  faq: FaqItem[];
};

export const BRAND_HUBS: BrandHub[] = [
  {
    slug: "lg",
    name: "LG",
    subtitle:
      "LG je najzastupljeniji brend u našoj ponudi, sa modelima za svaki budžet i tip prostorije.",
    intro: [
      "LG je jedan od najprodavanijih brendova klima uređaja u Srbiji, što se vidi i u našem katalogu - najveći deo ponude čine baš LG modeli. Dual Inverter kompresor koji LG koristi u većini uređaja omogućava tiši rad i brže dostizanje željene temperature u poređenju sa klasičnim on/off kompresorima.",
      "U ponudi imamo LG modele od osnovnih Standard i Special serija, pa do naprednijih Dualcool AI Air Deluxe uređaja sa Wi-Fi kontrolom i pametnim funkcijama. Bilo da tražite najjeftiniju opciju za spavaću sobu ili napredniji uređaj za dnevni boravak, kod LG-a se najlakše nalazi model koji odgovara i prostoriji i budžetu.",
    ],
    faq: [
      {
        question: "Da li je LG klima dobar izbor?",
        answer:
          "LG je jedan od tehnološki najnaprednijih brendova na tržištu, sa dobrim odnosom cene i kvaliteta kod osnovnih modela i naprednim funkcijama kod viših serija. Zbog toga je LG i najzastupljeniji brend u našem katalogu.",
      },
      {
        question: "Koliko košta ugradnja LG klime u Nišu?",
        answer:
          "Montaža standardnog LG uređaja od 9 ili 12 BTU košta od 8000 dinara, dok je za 18 BTU od 10000 dinara, a za 24 BTU od 12000 dinara. Cena samog uređaja je posebna stavka i vidi se na stranici svakog modela.",
      },
      {
        question: "Koja je garancija na LG klime?",
        answer:
          "Garancija zavisi od serije uređaja i obično iznosi od 2 do 5 godina. Tačan period garancije naveden je na stranici svakog modela u delu sa specifikacijama.",
      },
    ],
  },
  {
    slug: "midea",
    name: "Midea",
    subtitle:
      "Midea je pouzdan izbor za sve kojima je najvažniji povoljan ulazni budžet uz zadržan inverter kvalitet.",
    intro: [
      "Midea je jedan od najvećih svetskih proizvođača klima uređaja i grejne opreme, i pored sopstvenog brenda proizvodi uređaje i za mnoge druge kompanije na tržištu. To iskustvo u masovnoj proizvodnji prevodi se u pristupačniju cenu, bez potpunog žrtvovanja osnovnih inverter prednosti - manje potrošnje struje i tišeg rada u odnosu na stariji, ne-inverter uređaje.",
      "U našoj ponudi Midea predstavlja najpovoljniju kategoriju, idealnu za manje stanove, izdavanje nekretnina ili kao drugi uređaj u kući gde vrhunske performanse nisu prioritet, ali pouzdanost i inverter tehnologija jesu.",
    ],
    faq: [
      {
        question: "Da li je Midea klima dobra?",
        answer:
          "Midea je pouzdan proizvođač sa dugogodišnjim iskustvom u industriji, i njihovi inverter modeli u ovoj cenovnoj kategoriji nude solidne performanse za svakodnevnu upotrebu u domaćinstvu.",
      },
      {
        question: "Koliko košta Midea klima sa ugradnjom u Nišu?",
        answer:
          "Cena uređaja se vidi na stranici svakog modela, dok montaža počinje od 8000 dinara za 9 i 12 BTU uređaje, odnosno od 10000 dinara za jače, 18 BTU modele.",
      },
      {
        question: "Da li Midea klima ima garanciju?",
        answer:
          "Da, svi Midea uređaji u našoj ponudi dolaze sa garancijom proizvođača, čiji je tačan period naveden na stranici modela.",
      },
    ],
  },
  {
    slug: "hisense",
    name: "Hisense",
    subtitle:
      "Hisense poslednjih godina sve više gradi reputaciju u segmentu inverter klima uređaja srednje klase.",
    intro: [
      "Hisense je kineski proizvođač koji je u poslednjih nekoliko godina značajno proširio prisustvo na evropskom tržištu, uključujući i segment klima uređaja. Njihovi inverter modeli pozicionirani su između najpovoljnijih i premium brendova - nude bolju opremljenost i efikasnost od ulaznih uređaja, po ceni koja je i dalje pristupačnija od vodećih azijskih i evropskih brendova.",
      "U našem katalogu Hisense predstavlja srednju kategoriju za kupce koji žele bolju opremljenost od najjeftinijih modela, ali ne žele da plate premiju za brend kakav je, na primer, Mitsubishi Electric.",
    ],
    faq: [
      {
        question: "Da li je Hisense klima dobar izbor?",
        answer:
          "Hisense je u poslednjih nekoliko godina znatno unapredio kvalitet svojih inverter uređaja i predstavlja dobar kompromis između cene i opremljenosti za kupce koji ne traže ni najjeftiniju ni najskuplju opciju.",
      },
      {
        question: "Koliko košta ugradnja Hisense klime u Nišu?",
        answer:
          "Montaža uređaja od 9 ili 12 BTU košta od 8000 dinara, dok je za 18 BTU modele cena od 10000 dinara. Cena samog uređaja prikazana je na stranici svakog modela.",
      },
      {
        question: "Da li Hisense klime imaju Wi-Fi upravljanje?",
        answer:
          "Zavisi od modela - deo naše ponude ima Wi-Fi kontrolu, što je naznačeno u specifikacijama na stranici svakog uređaja.",
      },
    ],
  },
  {
    slug: "vaillant",
    name: "Vaillant",
    subtitle:
      "Vaillant je nemački brend poznatiji po sistemima grejanja, čije klime nose isti pečat inženjerske preciznosti.",
    intro: [
      "Vaillant je nemačka kompanija sa višedecenijskom tradicijom u proizvodnji kotlova i sistema za grejanje, a poslednjih godina proširuje ponudu i na klima uređaje i toplotne pumpe. Kupci koji već poznaju Vaillant iz sveta grejanja često biraju njihove klime upravo zbog poverenja u brend i nemački pristup proizvodnji.",
      "U našoj ponudi Vaillant spada u viši cenovni razred, sa uređajima koji su namenjeni kupcima kojima je dugoročna pouzdanost i renome proizvođača važniji od najniže moguće cene.",
    ],
    faq: [
      {
        question: "Da li je Vaillant dobar brend za klimu?",
        answer:
          "Vaillant je prepoznatljiv nemački proizvođač sa dugom tradicijom u grejnoj tehnici, a taj isti kvalitet izrade prenosi i na svoju ponudu klima uređaja.",
      },
      {
        question: "Koliko košta ugradnja Vaillant klime u Nišu?",
        answer:
          "Montaža zavisi od kapaciteta uređaja i kreće se od 8000 dinara za 9 i 12 BTU, do 12000 dinara za najjače, 24 BTU modele. Cena samog uređaja navedena je na stranici svakog modela.",
      },
      {
        question: "Da li Vaillant klime rade i za grejanje?",
        answer:
          "Većina modernih inverter klima, uključujući Vaillant uređaje u našoj ponudi, radi i u režimu grejanja preko toplotne pumpe, što je naznačeno u specifikacijama modela.",
      },
    ],
  },
  {
    slug: "mitsubishi-electric",
    name: "Mitsubishi Electric",
    subtitle:
      "Mitsubishi Electric je japanski brend sa dugom tradicijom u proizvodnji pouzdanih i tihih klima uređaja.",
    intro: [
      "Mitsubishi Electric je jedan od najstarijih i najpoznatijih proizvođača klima uređaja na svetu, sa reputacijom izgrađenom na pouzdanosti, tihom radu i dugom radnom veku uređaja. To iskustvo se odražava i na cenu - Mitsubishi Electric uređaji spadaju u premium segment naše ponude.",
      "Ako tražite uređaj za koji ne planirate da menjate narednih desetak i više godina i za koga vam je bešuman rad prioritet, Mitsubishi Electric je brend koji se najčešće bira upravo iz tih razloga.",
    ],
    faq: [
      {
        question: "Zašto je Mitsubishi Electric klima skuplja od ostalih brendova?",
        answer:
          "Cena odražava dugogodišnju reputaciju brenda za pouzdanost, tih rad i dug radni vek uređaja, kao i napredniju kompresorsku tehnologiju koju Mitsubishi Electric koristi.",
      },
      {
        question: "Koliko košta ugradnja Mitsubishi Electric klime u Nišu?",
        answer:
          "Montaža počinje od 8000 dinara za 9 i 12 BTU uređaje. Cena samog uređaja prikazana je na stranici svakog modela i viša je od proseka zbog premium pozicioniranja brenda.",
      },
      {
        question: "Da li je Mitsubishi Electric zaista tiša od drugih klima?",
        answer:
          "Mitsubishi Electric tradicionalno važi za jedan od najtiših brendova na tržištu, što je posebno cenjeno u spavaćim sobama - tačan nivo buke naveden je u specifikacijama svakog modela.",
      },
    ],
  },
  {
    slug: "romstal",
    name: "Romstal",
    subtitle:
      "Romstal je regionalni distributer HVAC opreme čiji su uređaji poznati po dobrom odnosu cene i performansi na Balkanu.",
    intro: [
      "Romstal je kompanija sa dugogodišnjim prisustvom na tržištu grejne i rashladne tehnike u regionu, poznata po tome što nudi opremu koja je testirana na lokalnom tržištu i prilagođena balkanskim klimatskim uslovima. Njihovi klima uređaji pozicionirani su u srednji cenovni razred.",
      "Za kupce u Nišu koji žele proveren uređaj sa iskustvom na terenu u regionu, bez plaćanja premije za globalno poznat brend, Romstal je često solidan izbor.",
    ],
    faq: [
      {
        question: "Da li je Romstal dobar brend za klimu?",
        answer:
          "Romstal ima dugogodišnje iskustvo u distribuciji grejne i rashladne opreme na Balkanu, a njihovi klima uređaji nude solidan kvalitet u srednjem cenovnom razredu.",
      },
      {
        question: "Koliko košta ugradnja Romstal klime u Nišu?",
        answer:
          "Montaža zavisi od kapaciteta i kreće se od 8000 dinara za 9 i 12 BTU uređaje. Cena samog uređaja prikazana je na stranici svakog modela.",
      },
    ],
  },
  {
    slug: "clivet",
    name: "CLIVET",
    subtitle:
      "CLIVET je italijanski proizvođač poznatiji po profesionalnim i komercijalnim klima sistemima, čije stambene linije nude isti nivo inženjeringa.",
    intro: [
      "CLIVET je italijanska kompanija sa fokusom na profesionalne i komercijalne HVAC sisteme - klimatizaciju poslovnih prostora, tržnih centara i većih objekata. Njihove stambene inverter linije nasleđuju isto inženjersko iskustvo, prilagođeno za manje prostore.",
      "U našoj ponudi CLIVET je izbor za kupce koji cene italijanski dizajn i pristup razvoju opreme, uz pouzdanost stečenu na zahtevnijim, komercijalnim instalacijama.",
    ],
    faq: [
      {
        question: "Da li je CLIVET dobar izbor za stan ili kuću?",
        answer:
          "Iako je CLIVET poznatiji po komercijalnim sistemima, njihove stambene inverter linije nude istu pouzdanost prilagođenu manjim prostorima, uz italijanski dizajn.",
      },
      {
        question: "Koliko košta ugradnja CLIVET klime u Nišu?",
        answer:
          "Montaža počinje od 8000 dinara za 9 i 12 BTU uređaje. Cena samog uređaja prikazana je na stranici svakog modela.",
      },
    ],
  },
];

type CapacityHub = {
  btu: 9000 | 12000 | 18000 | 24000;
  colloquial: string;
  roomSize: string;
  installFrom: number;
  intro: string[];
  faq: FaqItem[];
};

export const CAPACITY_HUBS: CapacityHub[] = [
  {
    btu: 9000,
    colloquial: "9-tka",
    roomSize: "do 20-25 kvadrata",
    installFrom: 8000,
    intro: [
      "Klima od 9000 BTU, u žargonu poznata kao '9-tka', pokriva prostorije do otprilike 20-25 kvadrata - tipično spavaće sobe, manje kancelarije ili dečije sobe. Ako imate standardnu spavaću sobu u stanu ili kući u Nišu, ovo je najčešće dovoljan kapacitet.",
      "Slabiji uređaj troši manje struje po satu rada, ali ako je prostorija veća od preporučene, klima će raditi na punom kapacitetu duže i teže će održavati temperaturu - zato je bitno da kapacitet odgovara kvadraturi, a ne samo budžetu.",
    ],
    faq: [
      {
        question: "Za koji kvadrat je dovoljna klima od 9000 BTU?",
        answer:
          "9000 BTU, odnosno '9-tka', dovoljna je za prostorije do oko 20-25 kvadrata, pod uslovom da je izolacija standardna i da nema izuzetno velikih staklenih površina.",
      },
      {
        question: "Koliko košta ugradnja klime od 9000 BTU u Nišu?",
        answer:
          "Montaža standardnog uređaja od 9000 BTU košta od 8000 dinara, uključujući osnovnu instalaciju do tri metra. Cena samog uređaja prikazana je na stranici svakog modela.",
      },
      {
        question: "Da li je 9-tka dovoljna za dnevnu sobu?",
        answer:
          "Za manje dnevne sobe do 20 kvadrata da, ali za veće ili otvorene prostore preporučujemo 12000 BTU ili jači uređaj kako klima ne bi neprekidno radila na maksimumu.",
      },
    ],
  },
  {
    btu: 12000,
    colloquial: "12-ica",
    roomSize: "od 25 do 35 kvadrata",
    installFrom: 8000,
    intro: [
      "12000 BTU, poznata kao '12-ica', je najprodavaniji kapacitet u našoj ponudi i pokriva prostorije od 25 do 35 kvadrata - najčešće dnevne sobe standardne veličine ili spavaće sobe sa boljom izolacijom i većim prozorima.",
      "Za većinu domaćinstava u Nišu, dnevni boravak je prostorija koja najduže koristi klimu tokom leta, pa se ovaj kapacitet često bira i kao 'sigurnija' opcija - dovoljno jak da ne mora neprekidno da radi na maksimumu, a i dalje ekonomičan u potrošnji.",
    ],
    faq: [
      {
        question: "Za koji kvadrat je dovoljna klima od 12000 BTU?",
        answer:
          "12000 BTU, '12-ica', pokriva prostorije od 25 do 35 kvadrata i najčešći je izbor za dnevne sobe standardne veličine u stanovima i kućama u Nišu.",
      },
      {
        question: "Koliko košta ugradnja klime od 12000 BTU u Nišu?",
        answer:
          "Montaža uređaja od 12000 BTU košta isto kao i za 9000 BTU - od 8000 dinara za osnovnu instalaciju do tri metra. Cena samog uređaja prikazana je na stranici svakog modela.",
      },
      {
        question: "Da li je bolje uzeti 12-icu ili 9-icu za sigurnost?",
        answer:
          "Ako je prostorija na granici između preporučenih kvadratura za oba kapaciteta, isplativije je uzeti jači uređaj - radiće kraće i sa manje opterećenja, što produžava vek trajanja kompresora.",
      },
    ],
  },
  {
    btu: 18000,
    colloquial: "18-ica",
    roomSize: "od 35 do 50 kvadrata",
    installFrom: 10000,
    intro: [
      "18000 BTU, '18-ica', namenjena je većim prostorijama od 35 do 50 kvadrata - tipično otvorenim prostorima gde su kuhinja i dnevna soba spojene, ili većim poslovnim kancelarijama.",
      "Zbog većeg kapaciteta, ovi uređaji imaju i jaču spoljašnju jedinicu, pa je montaža nešto skuplja od manjih modela - to je uobičajeno za sve brendove, ne samo pojedinačne proizvođače.",
    ],
    faq: [
      {
        question: "Za koji prostor je klima od 18000 BTU?",
        answer:
          "18000 BTU, '18-ica', pokriva prostorije od 35 do 50 kvadrata, najčešće otvorene dnevne prostore sa spojenom kuhinjom ili veće kancelarije.",
      },
      {
        question: "Koliko košta ugradnja klime od 18000 BTU u Nišu?",
        answer:
          "Montaža uređaja od 18000 BTU košta od 10000 dinara, nešto više nego za manje kapacitete, zbog dužih cevi i veće spoljašnje jedinice. Cena samog uređaja prikazana je na stranici svakog modela.",
      },
    ],
  },
  {
    btu: 24000,
    colloquial: "24-ica",
    roomSize: "preko 50 kvadrata",
    installFrom: 12000,
    intro: [
      "24000 BTU, '24-ica', je najjači standardni kapacitet u našoj ponudi i namenjena je prostorijama preko 50 kvadrata - većim poslovnim prostorima, salama ili stanovima sa otvorenim planom preko 50 kvadrata.",
      "Za ovaj kapacitet posebno je važna pravilna procena pre kupovine - preterano jak uređaj za manju prostoriju troši struju bez potrebe, dok preslab za veliki prostor nikada neće efikasno da rashladi ili zagreje prostor. Pozovite nas za besplatnu procenu na licu mesta.",
    ],
    faq: [
      {
        question: "Za koji prostor je klima od 24000 BTU?",
        answer:
          "24000 BTU, '24-ica', namenjena je prostorijama preko 50 kvadrata - velikim poslovnim prostorima, salama ili stanovima i kućama sa otvorenim planom.",
      },
      {
        question: "Koliko košta ugradnja klime od 24000 BTU u Nišu?",
        answer:
          "Montaža uređaja od 24000 BTU košta od 12000 dinara, zbog dužih cevi instalacije i najveće spoljašnje jedinice u ponudi. Cena samog uređaja prikazana je na stranici svakog modela.",
      },
    ],
  },
];
