import { createServerFeature } from '@payloadcms/richtext-lexical'

/**
 * Server-side registration of the custom <mark> highlight feature.
 * It links to the client-side implementation to be used in the editor.
 */

export const MarkFeature = createServerFeature({
  feature: {
    ClientFeature: '@/features/mark/mark.client', // Path to client-side logic
  },
  key: 'marks', // Unique key for identifying this feature
})
