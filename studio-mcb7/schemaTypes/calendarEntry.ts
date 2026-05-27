import {defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons'

export const calendarEntry = defineType({
  name: 'calendarEntry',
  title: 'Calendar Entry',
  type: 'document',
  icon: CalendarIcon,
  orderings: [
    {
      title: 'Date, New–Old',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Date, Old–New',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
  ],
  fields: [
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      options: {dateFormat: 'MM-DD-YYYY'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      initialValue: 'studio-log',
      options: {
        list: [
          {title: 'Studio Log', value: 'studio-log'},
          {title: 'Notes', value: 'notes'},
          {title: 'Works', value: 'works'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'array',
      of: [
        {type: 'customImage'},
        {
          type: 'file',
          options: {accept: 'video/*'},
          fields: [
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'date',
      mediaAsset: 'media.0.asset',
      text: 'text',
    },
    prepare({title, mediaAsset, text}: {title?: string; mediaAsset?: unknown; text?: Array<{_type: string; children?: Array<{_type: string; text?: string}>}>}) {
      if (!title) return {title: 'No date'}
      const [year, month, day] = title.split('-')
      const subtitle = text
        ?.find((block) => block._type === 'block')
        ?.children
        ?.filter((child) => child._type === 'span')
        ?.map((span) => span.text)
        ?.join('')
      return {
        title: `${month}-${day}-${year}`,
        subtitle,
        media: mediaAsset,
      }
    },
  },
})
