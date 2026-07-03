import {defineField, defineType} from 'sanity'

import {makeSeoOverrideField} from './seoField'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Podešavanja sajta',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Naziv firme',
      type: 'string',
      initialValue: 'Moj Klima Servis Niš',
    }),
    defineField({
      name: 'tagline',
      title: 'Slogan',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon (primarni)',
      type: 'string',
    }),
    defineField({
      name: 'phoneSecondary',
      title: 'Telefon (sekundarni)',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Adresa',
      type: 'string',
    }),
    defineField({
      name: 'city',
      title: 'Grad',
      type: 'string',
      initialValue: 'Niš',
    }),
    defineField({
      name: 'serviceAreas',
      title: 'Oblasti pokrivanja',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Niš i okolna mesta koja pokrivate',
    }),
    defineField({
      name: 'foundedYear',
      title: 'Godina osnivanja',
      type: 'number',
    }),
    defineField({
      name: 'workingHours',
      title: 'Radno vreme (prikaz na sajtu)',
      type: 'string',
      description: 'Slobodan tekst za prikaz, npr. "Pon–Sub: 08–20h"',
    }),
    defineField({
      name: 'openingHoursSpecification',
      title: 'Radno vreme (za Google/SEO)',
      description:
        'Strukturirano radno vreme koje čitaju Google i mape — mora biti tačno da bi se poklapalo sa gore unetim tekstom.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'hoursBlock',
          fields: [
            {
              name: 'dayOfWeek',
              title: 'Dani',
              type: 'array',
              of: [{type: 'string'}],
              options: {
                list: [
                  {title: 'Ponedeljak', value: 'Monday'},
                  {title: 'Utorak', value: 'Tuesday'},
                  {title: 'Sreda', value: 'Wednesday'},
                  {title: 'Četvrtak', value: 'Thursday'},
                  {title: 'Petak', value: 'Friday'},
                  {title: 'Subota', value: 'Saturday'},
                  {title: 'Nedelja', value: 'Sunday'},
                ],
              },
            },
            {name: 'opens', title: 'Otvara u (npr. 08:00)', type: 'string'},
            {name: 'closes', title: 'Zatvara u (npr. 20:00)', type: 'string'},
          ],
        },
      ],
    }),
    defineField({
      name: 'geo',
      title: 'Geo-lokacija (za mape)',
      type: 'object',
      fields: [
        {name: 'lat', title: 'Geografska širina (latitude)', type: 'number'},
        {name: 'lng', title: 'Geografska dužina (longitude)', type: 'number'},
      ],
    }),
    defineField({
      name: 'brands',
      title: 'Brendovi koje servisirate',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'socials',
      title: 'Društvene mreže',
      type: 'object',
      fields: [
        {name: 'facebook', type: 'url', title: 'Facebook'},
        {name: 'instagram', type: 'url', title: 'Instagram'},
      ],
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'heroImage',
      title: 'Slika — hero sekcija (početna strana)',
      description: 'Velika slika desno od naslova na vrhu početne strane.',
      type: 'image',
    }),
    defineField({
      name: 'aboutImage',
      title: 'Slika — "O nama" sekcija (početna strana)',
      description: 'Slika u tamnoj sekciji sa opisom firme na početnoj strani.',
      type: 'image',
    }),
    makeSeoOverrideField('seoUsluge', 'stranica /usluge'),
    makeSeoOverrideField('seoCenovnik', 'stranica /cenovnik'),
    makeSeoOverrideField('seoShop', 'stranica /shop'),
    makeSeoOverrideField('seoBlog', 'stranica /blog'),
  ],
})
