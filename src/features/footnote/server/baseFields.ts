import type { CollectionSlug, FieldAffectingData, SanitizedConfig } from 'payload'

export const getBaseFields = (
  config: SanitizedConfig,
  enabledCollections?: CollectionSlug[],
  disabledCollections?: CollectionSlug[],
  maxDepth?: number,
): FieldAffectingData[] => {
  let enabledRelations: CollectionSlug[]

  if (enabledCollections) {
    enabledRelations = enabledCollections
  } else if (disabledCollections) {
    enabledRelations = config.collections
      .filter(({ slug }) => !disabledCollections.includes(slug))
      .map(({ slug }) => slug)
  } else {
    enabledRelations = config.collections
      .filter(({ admin: { enableRichTextLink, hidden } }) => {
        if (typeof hidden !== 'function' && hidden) {
          return false
        }
        return enableRichTextLink
      })
      .map(({ slug }) => slug)
  }

  const baseFields: FieldAffectingData[] = []

  baseFields.push({
    name: 'content',
    type: 'text',
    admin: {
      placeholder: 'e.g. 1, 2, 3',
    },
    label: 'Content',
    required: true,
  })

  return baseFields
}
