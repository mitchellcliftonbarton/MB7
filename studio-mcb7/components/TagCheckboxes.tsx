import {useCallback, useEffect, useState} from 'react'
import {set, unset, useClient} from 'sanity'
import type {ArrayOfObjectsInputProps, Reference} from 'sanity'
import {Box, Button, Checkbox, Flex, Spinner, Stack, Text, TextInput} from '@sanity/ui'

type Tag = {_id: string; title: string}

type TagRef = Reference & {_key: string}

const API_VERSION = '2024-07-19'

function randomKey(length = 12): string {
  let key = ''
  while (key.length < length) {
    key += Math.random().toString(36).slice(2)
  }
  return key.slice(0, length)
}

/**
 * Builds a custom array input that renders a reference array as a checkbox
 * list of the referenced documents, with an inline field to create and
 * select a new one. Reused for any single-type reference array (e.g. the
 * Content and Medium fields on a calendar entry).
 */
export function createTagCheckboxesInput(typeName: string) {
  return function TagCheckboxes(props: ArrayOfObjectsInputProps) {
    const {value, onChange} = props
    const refs = (value ?? []) as TagRef[]
    const client = useClient({apiVersion: API_VERSION})

    const [tags, setTags] = useState<Tag[]>([])
    const [loading, setLoading] = useState(true)
    const [newTitle, setNewTitle] = useState('')
    const [creating, setCreating] = useState(false)

    const fetchTags = useCallback(async () => {
      const result = await client.fetch<Tag[]>(
        `*[_type == $type && defined(title)] | order(title asc){_id, title}`,
        {type: typeName},
      )
      setTags(result)
      setLoading(false)
    }, [client])

    useEffect(() => {
      fetchTags()
    }, [fetchTags])

    const selectedIds = new Set(refs.map((ref) => ref._ref).filter(Boolean))

    const toggle = useCallback(
      (id: string) => {
        const exists = refs.some((ref) => ref._ref === id)
        const next: TagRef[] = exists
          ? refs.filter((ref) => ref._ref !== id)
          : [...refs, {_key: randomKey(), _type: 'reference', _ref: id}]
        onChange(next.length ? set(next) : unset())
      },
      [refs, onChange],
    )

    const createTag = useCallback(async () => {
      const title = newTitle.trim()
      if (!title || creating) return
      setCreating(true)
      try {
        const created = await client.create({_type: typeName, title})
        setTags((prev) =>
          [...prev, {_id: created._id, title}].sort((a, b) => a.title.localeCompare(b.title)),
        )
        onChange(set([...refs, {_key: randomKey(), _type: 'reference', _ref: created._id}]))
        setNewTitle('')
      } finally {
        setCreating(false)
      }
    }, [newTitle, creating, client, refs, onChange])

    return (
      <Stack space={3}>
        {loading ? (
          <Flex align="center" gap={2}>
            <Spinner muted />
            <Text muted size={1}>
              Loading…
            </Text>
          </Flex>
        ) : (
          <Stack space={3}>
            {tags.length === 0 && (
              <Text muted size={1}>
                None yet. Add one below.
              </Text>
            )}
            {tags.map((tag) => (
              <Flex as="label" key={tag._id} align="center" gap={2} style={{cursor: 'pointer'}}>
                <Checkbox checked={selectedIds.has(tag._id)} onChange={() => toggle(tag._id)} />
                <Text size={1}>{tag.title}</Text>
              </Flex>
            ))}
          </Stack>
        )}

        <Flex gap={2}>
          <Box flex={1}>
            <TextInput
              value={newTitle}
              placeholder="Add new…"
              onChange={(event) => setNewTitle(event.currentTarget.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault()
                  createTag()
                }
              }}
            />
          </Box>
          <Button
            text="Add"
            mode="ghost"
            disabled={!newTitle.trim() || creating}
            onClick={createTag}
          />
        </Flex>
      </Stack>
    )
  }
}

export const ContentTagCheckboxes = createTagCheckboxesInput('contentTag')
export const MediumCheckboxes = createTagCheckboxesInput('medium')
