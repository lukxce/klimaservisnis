import {defineField} from 'sanity'

const seoSubFields = [
  {
    name: 'title',
    title: 'SEO naslov (title tag)',
    type: 'string',
    description: 'Preporučena dužina: do 60 karaktera.',
    validation: (Rule: any) => Rule.max(70).warning('Naslov duži od 70 karaktera može biti odsečen u Google-u.'),
  },
  {
    name: 'description',
    title: 'Meta opis',
    type: 'text',
    rows: 3,
    description: 'Preporučena dužina: do 160 karaktera.',
    validation: (Rule: any) => Rule.max(165).warning('Opis duži od 165 karaktera može biti odsečen u Google-u.'),
  },
]

// Deljeno polje za ručno podešavanje SEO naslova/opisa. Ako se ostavi prazno,
// sajt automatski generiše naslov i opis na osnovu ostalog sadržaja stranice.
export const seoField = defineField({
  name: 'seo',
  title: 'SEO podešavanja (opciono)',
  description:
    'Ručno prepisivanje naslova i opisa za Google. Ostavite prazno da sajt sam generiše na osnovu sadržaja.',
  type: 'object',
  options: {collapsible: true, collapsed: true},
  fields: seoSubFields,
})

// Za stranice bez sopstvenog dokumenta (npr. /usluge, /cenovnik, /shop, /blog
// pregledne stranice) — koristi se u okviru Podešavanja sajta, sa imenom polja
// po izboru (npr. "seoUsluge").
export function makeSeoOverrideField(name: string, title: string) {
  return defineField({
    name,
    title: `SEO — ${title}`,
    description:
      'Ručno prepisivanje naslova i opisa za Google na ovoj stranici. Ostavite prazno da sajt sam generiše.',
    type: 'object',
    options: {collapsible: true, collapsed: true},
    fields: seoSubFields,
  })
}
