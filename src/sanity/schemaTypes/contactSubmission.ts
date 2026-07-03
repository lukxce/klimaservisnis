import {defineField, defineType} from 'sanity'

export const contactSubmission = defineType({
  name: 'contactSubmission',
  title: 'Poruka sa sajta',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Ime',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'reason',
      title: 'Razlog kontakta',
      type: 'string',
      readOnly: true,
      options: {
        list: [
          {title: 'Zakazivanje servisa', value: 'servis'},
          {title: 'Montaža', value: 'montaza'},
          {title: 'Prijava kvara', value: 'kvar'},
          {title: 'Upit o kupovini klime', value: 'kupovina'},
          {title: 'Ostalo', value: 'ostalo'},
        ],
      },
    }),
    defineField({
      name: 'message',
      title: 'Poruka',
      type: 'text',
      readOnly: true,
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Novo', value: 'novo'},
          {title: 'U obradi', value: 'u_obradi'},
          {title: 'Rešeno', value: 'reseno'},
        ],
      },
      initialValue: 'novo',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Poslato',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: 'Najnovije prvo',
      name: 'submittedDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'reason',
      status: 'status',
    },
    prepare({title, subtitle, status}) {
      return {
        title: title || '(bez imena)',
        subtitle: `${subtitle ?? ''} — ${status ?? ''}`,
      }
    },
  },
})
