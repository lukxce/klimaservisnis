# Klima Servis Niš — status projekta

Handoff dokument za nastavak rada u novom razgovoru (ako se ovaj kompresuje/izgubi kontekst).
Poslednje ažurirano: 2026-07-02.

## Šta je ovo

Next.js sajt + Sanity CMS admin panel za firmu za servis, montažu i prodaju klima
uređaja u Nišu, Srbija. Fokus: agresivna SEO optimizacija (tehnička + sadržajna).

Ovo je **prvi od planiranog niza sličnih sajtova** za različite zanate (sledeći: električar).

## Lokacija i osnovne odluke

- **Putanja:** `/Users/Digitl/Documents/GitHub/klimaservisnis`
- **Domen:** `klimaservisnis.rs` (korisnik će kupiti/već kupio; `.rs` izabran nad `.com`
  jer je ccTLD jak signal za geo-targeting u Srbiji)
- **Grad:** Niš (ne multi-grad — korisnik je svesno izabrao city-locked domen/pristup
  za ovaj brend, za razliku od ranije razmatranog `mojklimaservis.rs`)
- **CMS:** Sanity (besplatan tier, embedovan Studio na `/studio`, bez potrebe za
  sopstvenim serverom/bazom — izabran nad Strapi/custom-built jer korisnik nije mogao
  lako da hostuje Strapi na Vercelu)
- **Boja/dizajn:** korisniku boja nije bitna. Vizuelni jezik je inspirisan (NE kopiran)
  strukturom sajta `eko-klimaservis.rs` (Beograd, konkurent) — navy/plava paleta,
  kartice, zaobljeni uglovi, hero + featured usluge + featured proizvodi + about +
  brand strip + CTA kartice + blog preview.

## Konkurentska analiza (uradjena ranije u razgovoru)

Analizirani sajtovi radi referentne SEO/strukturne inspiracije:
- `eko-klimaservis.rs` — WordPress/WooCommerce, dobra granularna H-struktura po
  usluzi+BTU, ali title tag predugačak (163 karaktera), nema meta description,
  minimalan JSON-LD (samo osnovni HVACBusiness, ništa specifično po tipu stranice)
- `klimaservisbeograd.co.rs` i `klimaservisbg.rs` — najbolje rangirani u Beogradu,
  ali **tehnički slabiji** od eko-klimaservis.rs (jedan nema nijedan `<h1>` tag,
  nijedan nema JSON-LD uopšte) — zaključak: rangiraju prvenstveno zbog exact-match
  domena + verovatno Google Business Profile/recenzije/backlinkovi, NE zbog SEO
  tehnike. Znači: tehnički bolji sajt (ovaj) realno može da ih nadmaši, ali domen
  sam neće biti dovoljan — treba i GBP + recenzije + citati.

## Tehnički stek

- Next.js 16.2.10 (App Router, TypeScript, Tailwind v4, Turbopack)
- Node v24 LTS instaliran preko **nvm** (ne Homebrew — korisnik eksplicitno izabrao
  nvm zbog upravljanja verzijama kroz više projekata)
- Sanity CMS: `sanity`, `next-sanity`, `@sanity/vision`, `@sanity/image-url`,
  `@portabletext/react`
- Sanity Project ID: `d10dfhk5`, dataset: `production`
- Env varijable u `.env.local` (gitignored, NIJE u repo-u):
  `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`,
  `SANITY_API_WRITE_TOKEN` (write token je već iskorišćen za seed, čuva se samo lokalno)

## Struktura sadržaja (Sanity schema)

`src/sanity/schemaTypes/`: `siteSettings`, `service` (cenovnik), `product` (shop),
`blogPost`. Svi tipovi imaju odgovarajuća polja (cena, BTU, specs, itd.) — vidi fajlove
direktno za pun spisak.

## Stranice (sve rade, 27 statičkih ruta na build-u)

- `/` — početna (hero, featured usluge, featured proizvodi, o nama, CTA, blog preview)
- `/cenovnik` + `/cenovnik/[slug]` — 8 usluga, grupisano po kategoriji, sa Service JSON-LD
- `/shop` + `/shop/[slug]` — 6 proizvoda (klima uređaja), sa Product JSON-LD
- `/blog` + `/blog/[slug]` — 3 napisana teksta (ne lorem ipsum), sa BlogPosting JSON-LD
- `/kontakt` — kontakt info
- `/studio` — Sanity Studio (admin panel/CMS)
- `/sitemap.xml`, `/robots.ts` — generisani automatski iz CMS podataka

## SEO infrastruktura (već implementirano)

- Metadata (title/description/OG) po stranici, generisano dinamički iz CMS podataka
- JSON-LD: `HVACBusiness` (globalno u layout-u), `Service`, `Product`, `BlogPosting`,
  `BreadcrumbList` (na svim detail stranicama)
- `sitemap.ts` i `robots.ts` (Next.js file convention, ne statični XML)
- Ispravan `og:locale` (sr_RS), canonical URL-ovi

## Sadržaj — šta je izmišljeno (korisnik je eksplicitno rekao "izmisli za početak")

Telefon (060 1234 567), adresa, godina osnivanja (2014), sve cene, svi proizvodi i
njihove cene — **SVE TREBA ZAMENITI PRAVIM PODACIMA** kroz `/studio` pre lansiranja.
Slike su placeholder (labelovani gradient blokovi tipa "Slika: Montaža klima uređaja")
— zamenjuju se upload-om kroz CMS, next/image i Sanity CDN su već povezani
(`next.config.ts` ima `cdn.sanity.io` u `remotePatterns`).

## Kako pokrenuti lokalno

```bash
export NVM_DIR="$HOME/.nvm"; [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
cd /Users/Digitl/Documents/GitHub/klimaservisnis
npm run dev
# http://localhost:3000
# http://localhost:3000/studio (admin panel)
```

Napomena: Node/npm/nvm nisu na default PATH-u u ne-login shell-ovima — uvek prvo
source-uj nvm kao gore, inače `node`/`npm` komande neće raditi.

Seed skripta (ponovo puni CMS placeholder sadržajem, koristi `createOrReplace` pa je
bezbedno pokrenuti više puta): `npm run seed`

## Šta NIJE urađeno / sledeći koraci

1. **Korisnik treba da pregleda `http://localhost:3000` i `/studio`** i unese prave
   podatke (telefon, adresa, cene, fotografije)
2. **CORS origin** za `/studio` u Sanity dashboardu (sanity.io/manage → API → CORS
   Origins → dodati `http://localhost:3000`, allow credentials) — možda već urađeno,
   proveriti ako Studio baca CORS grešku
3. **Deployment** — plan je Vercel (besplatno za ovaj obim), povezivanje domena
   `klimaservisnis.rs`
4. **Google Business Profile** — kritično za lokalni rang, nije još pominjano kao
   urađeno
5. Forme za "online prijava kvara" / "online zakazivanje servisa" (viđeno kod
   konkurencije, nije zatraženo eksplicitno niti implementirano — razmotriti kasnije)
6. Git — repo je inicijalizovan (`git init`) ali **nema nijedan commit još**
   (korisnik nije tražio commit)

## Plan za dalje (van ovog sajta)

Korisnik planira **više sličnih sajtova za druge zanate**, počev od električara.
Domen kandidat razmatran i **preporučen**: `elektricar-nis.rs` (slobodan u trenutku
provere). `elektricarnis.rs` i `mojelektricar.rs` su zauzeti (potonji registrovan
16.10.2025, nejasno da li je korisnikov). Nije još odlučeno da li će svaki zanat
imati potpuno odvojen Next.js+Sanity projekat ili deljenu arhitekturu/monorepo —
ovo treba razjasniti pre početka rada na sledećem sajtu.
