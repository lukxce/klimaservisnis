import {defineField, defineType} from 'sanity'

import {seoField} from './seoField'

export const product = defineType({
  name: 'product',
  title: 'Proizvod (shop)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Naziv modela',
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
      name: 'brand',
      title: 'Brend',
      type: 'string',
    }),
    defineField({
      name: 'type',
      title: 'Vrsta klima uređaja',
      type: 'string',
      options: {
        list: [
          {title: 'Zidni', value: 'Zidni'},
          {title: 'Kanalni', value: 'Kanalni'},
          {title: 'Kasetni', value: 'Kasetni'},
          {title: 'Podni', value: 'Podni'},
          {title: 'Mobilni', value: 'Mobilni'},
        ],
      },
      initialValue: 'Zidni',
    }),
    defineField({
      name: 'btu',
      title: 'BTU kapacitet',
      type: 'number',
    }),
    defineField({
      name: 'price',
      title: 'Cena (RSD)',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'oldPrice',
      title: 'Stara cena (RSD, za popust)',
      type: 'number',
    }),
    defineField({
      name: 'installationIncluded',
      title: 'Montaža uključena u cenu',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'inStock',
      title: 'Na stanju',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'images',
      title: 'Slike',
      type: 'array',
      of: [{type: 'image'}],
    }),
    defineField({
      name: 'shortDescription',
      title: 'Kratak opis',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description',
      title: 'Detaljan opis',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'features',
      title: 'Najvažnije karakteristike (bullet lista)',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'specs',
      title: 'Specifikacije',
      type: 'object',
      fields: [
        {name: 'energyClassCooling', title: 'Energetski razred (hlađenje)', type: 'string'},
        {name: 'energyClassHeating', title: 'Energetski razred (grejanje)', type: 'string'},
        {name: 'gasType', title: 'Tip gasa', type: 'string'},
        {name: 'wifi', title: 'Wi-Fi', type: 'boolean'},
        {name: 'warranty', title: 'Garancija', type: 'string'},
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Istaknuto na početnoj',
      type: 'boolean',
      initialValue: false,
    }),
    seoField,
  ],
})
