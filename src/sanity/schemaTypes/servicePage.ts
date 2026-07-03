import {defineField, defineType} from 'sanity'

import {seoField} from './seoField'

export const servicePage = defineType({
  name: 'servicePage',
  title: 'Stranica usluge (kategorija)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov',
      type: 'string',
      description: 'npr. "Servis klima uređaja"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'Mora se poklapati sa kategorijom usluga: servis, montaza, popravka ili dijagnostika',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Podnaslov (hero)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'body',
      title: 'Detaljan tekst (dugačak, za SEO)',
      description:
        'Opširan, stručan tekst o ovoj usluzi — cilj je da stranica bude prepoznata kao autoritet na temu.',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'checklist',
      title: 'Šta uključuje (checklista)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Naslov stavke', type: 'string'},
            {name: 'description', title: 'Opis', type: 'string'},
          ],
        },
      ],
    }),
    defineField({
      name: 'ctaBandTitle',
      title: 'Naslov istaknute trake',
      type: 'string',
      description: 'npr. "Hitne intervencije i popravke"',
    }),
    defineField({
      name: 'ctaBandText',
      title: 'Tekst istaknute trake',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ctaBandBullets',
      title: 'Stavke istaknute trake',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'whyUs',
      title: 'Zašto izabrati nas',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Naslov', type: 'string'},
            {name: 'description', title: 'Opis', type: 'string'},
          ],
        },
      ],
    }),
    defineField({
      name: 'faq',
      title: 'Najčešća pitanja (FAQ)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'question', title: 'Pitanje', type: 'string'},
            {name: 'answer', title: 'Odgovor', type: 'text', rows: 3},
          ],
        },
      ],
    }),
    seoField,
  ],
})
