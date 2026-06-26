import {defineField, defineType} from 'sanity'
import {ComponentIcon} from '@sanity/icons'

export const medium = defineType({
  name: 'medium',
  title: 'Medium',
  type: 'document',
  icon: ComponentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title'},
  },
})
