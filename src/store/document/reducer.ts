import { createReducer } from '@reduxjs/toolkit'
import { DOCUMENTS_GET_ALL } from './action'
import { DocumentType } from '../../types/document'


type DocumentProps = {
    documents: DocumentType[]

}

const initialState: DocumentProps = {
    documents: [],
}

export default createReducer(initialState, (builder) =>
    builder
        .addCase(DOCUMENTS_GET_ALL, (state, action) => {
            state.documents = action.payload.documents;
        })

)