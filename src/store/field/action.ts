import { createAction } from '@reduxjs/toolkit'
import { Field } from '../../types/document'

export const FIELDS_GET_ALL = createAction<{ fields: Field[] }>('@fields/GET_ALL')
