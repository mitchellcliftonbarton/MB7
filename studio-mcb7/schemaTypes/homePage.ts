import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'featuredWork',
      title: 'Featured Work',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Featured Work Item',
          fields: [
            defineField({
              name: 'media',
              title: 'Media',
              type: 'array',
              of: [
                {
                  type: 'image',
                  title: 'Image',
                  options: {hotspot: true},
                },
                {
                  type: 'file',
                  title: 'Video',
                  options: {accept: 'video/*'},
                },
              ],
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'caption',
            },
            prepare({title}) {
              return {title: title ?? 'Untitled'}
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Home Page'}
    },
  },
})
