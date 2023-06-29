'use client'

import { useCallback, useContext } from 'react'
import { useAtomValue } from 'jotai'
import { selectAtom } from 'jotai/utils'
import type { ExtractAtomValue } from 'jotai'
import type { createInitialValue } from './providers'

import { jotaiStore } from '~/lib/store'

import { MAX_COMMENT_TEXT_LENGTH } from './constants'
import {
  CommentBoxContext,
  CommentCompletedCallbackContext,
  CommentIsReplyContext,
  CommentOriginalRefIdContext,
} from './providers'

export const useUseCommentReply = () => useContext(CommentIsReplyContext)
export const useCommentOriginalRefId = () =>
  useContext(CommentOriginalRefIdContext)
export const useCommentCompletedCallback = () =>
  useContext(CommentCompletedCallbackContext)

export const useCommentBoxTextValue = () =>
  useAtomValue(useContext(CommentBoxContext).text)

export const useCommentBoxRefIdValue = () =>
  useAtomValue(useContext(CommentBoxContext).refId)

export const useGetCommentBoxAtomValues = () => {
  return useContext(CommentBoxContext)
}

export const useCommentBoxHasText = () =>
  useAtomValue(
    selectAtom(
      useContext(CommentBoxContext).text,
      useCallback((v) => v.length > 0, []),
    ),
  )

export const useCommentBoxTextIsOversize = () =>
  useAtomValue(
    selectAtom(
      useContext(CommentBoxContext).text,
      useCallback((v) => v.length > MAX_COMMENT_TEXT_LENGTH, []),
    ),
  )
type CommentContextValue = ReturnType<typeof createInitialValue>

export const useSetCommentBoxValues = <
  T extends keyof CommentContextValue,
>() => {
  const ctx = useContext(CommentBoxContext)
  return (key: T, value: ExtractAtomValue<CommentContextValue[T]>) => {
    const atom = ctx[key]
    if (!atom) throw new Error(`atom ${key} not found`)
    jotaiStore.set(atom as any, value)
  }
}