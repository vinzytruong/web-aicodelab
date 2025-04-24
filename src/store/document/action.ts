import { createAction } from '@reduxjs/toolkit'
import { DocumentType } from '../../types/document'

export const DOCUMENTS_GET_ALL = createAction<{ documents: DocumentType[] }>('@documents/GET_ALL')
