import {defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons'

export const calendarEntry = defineType({
  name: 'calendarEntry',
  title: 'Calendar Entry',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      options: {dateFormat: 'MM-DD-YYYY'},
      validation: (Rule) => Rule.required(),
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
    },
    prepare({title}) {
      if (!title) return {title: 'No date'}
      const [year, month, day] = title.split('-')
      return {title: `${month}-${day}-${year}`}
    },
  },
})
