import { createServerFeature } from '@payloadcms/richtext-lexical'

/**
 * Server-side registration of the custom <mark> highlight feature.
 * It links to the client-side implementation to be used in the editor.
 */

export const FootnoteFeature = createServerFeature({
  feature: {
    ClientFeature: '@/features/footnote/footnote.client', // Path to client-side logic
  },
  key: 'footnote', // Unique key for identifying this feature
})
