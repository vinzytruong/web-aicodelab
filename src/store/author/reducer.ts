import { createReducer } from '@reduxjs/toolkit'
import { AUTHORS_GET_ALL } from './action'
import { Author } from '../../types/document'


type AuthorProps = {
    authors: Author[]

}

const initialState: AuthorProps = {
    authors: [],
}

export default createReducer(initialState, (builder) =>
    builder
        .addCase(AUTHORS_GET_ALL, (state, action) => {
            state.authors = action.payload.authors;
        })

)