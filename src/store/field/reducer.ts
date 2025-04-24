import { createReducer } from '@reduxjs/toolkit'
import { FIELDS_GET_ALL } from './action'
import { Field } from '../../types/document'


type FieldProps = {
    fields: Field[]

}

const initialState: FieldProps = {
    fields: [],
}

export default createReducer(initialState, (builder) =>
    builder
        .addCase(FIELDS_GET_ALL, (state, action) => {
            state.fields = action.payload.fields;
        })

)