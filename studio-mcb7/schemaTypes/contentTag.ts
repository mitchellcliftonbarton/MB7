import {defineField, defineType} from 'sanity'
import {TagIcon} from '@sanity/icons'

export const contentTag = defineType({
  name: 'contentTag',
  title: 'Content Tag',
  type: 'document',
  icon: TagIcon,
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
