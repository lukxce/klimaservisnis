import {defineField, defineType} from 'sanity'

import {seoField} from './seoField'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog tekst',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategorija',
      type: 'string',
      options: {
        list: [
          {title: 'Servis i održavanje', value: 'servis'},
          {title: 'Montaža', value: 'montaza'},
          {title: 'Izbor uređaja', value: 'izbor'},
          {title: 'Saveti', value: 'saveti'},
        ],
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Kratak opis (za listu i meta description)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: 'summary',
      title: 'Sažetak (za AI/brz pregled)',
      description:
        'Kratak sažetak od 2-3 rečenice na vrhu teksta — pomaže AI asistentima i čitaocima koji žele brz odgovor.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'keyTakeaways',
      title: 'Ključne tačke',
      description: 'Kratka bullet lista najvažnijih poena iz teksta.',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'coverImage',
      title: 'Naslovna slika',
      type: 'image',
    }),
    defineField({
      name: 'body',
      title: 'Sadržaj',
      type: 'array',
      of: [{type: 'block'}, {type: 'image'}],
    }),
    defineField({
      name: 'faq',
      title: 'Najčešća pitanja (opciono)',
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
    defineField({
      name: 'publishedAt',
      title: 'Datum objave',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'string',
      initialValue: 'Moj Klima Servis',
    }),
    seoField,
  ],
  orderings: [
    {
      title: 'Najnovije prvo',
      name: 'publishedDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],
})
