import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
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
            S.documentTypeListItem('calendarEntry').title('Calendar Entries'),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
