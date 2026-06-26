import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {CalendarIcon} from '@sanity/icons'
import {schemaTypes} from './schemaTypes'

const HOME_PAGE_ID = 'homePage'

export default defineConfig({
  name: 'default',
  title: 'MCB7',

  projectId: 'a0bahnie',
  dataset: 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Home Page')
              .id('homePage')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId(HOME_PAGE_ID)
              ),
            S.listItem()
              .title('Calendar')
              .id('calendar')
              .icon(CalendarIcon)
              .child(
                S.list()
                  .title('Calendar')
                  .items([
                    S.documentTypeListItem('calendarEntry').title('Entries'),
                    S.documentTypeListItem('medium').title('Mediums'),
                    S.documentTypeListItem('contentTag').title('Categories'),
                  ])
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
