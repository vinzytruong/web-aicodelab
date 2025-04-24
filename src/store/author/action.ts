import { createAction } from '@reduxjs/toolkit'
import { Author } from '../../types/document'

export const AUTHORS_GET_ALL = createAction<{ authors: Author[] }>('@authors/GET_ALL')
