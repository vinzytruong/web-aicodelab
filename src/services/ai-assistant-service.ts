import { DocumentType } from "../types/document";
import { documentApi } from "./global-config-service";

export const getAllDocument = () => documentApi.get('/articles')

export const getAllField = () => documentApi.get('/fields');

export const getAllAuthor = () => documentApi.get('/authors');

export const getFieldById = (id: string) => documentApi.get(`/fields/${id}`);

export const createField = (field: { name: string }) => documentApi.post('/fields', field);

export const updateField = (id: string, field: { name: string }) => documentApi.put(`/fields/${id}`, field);

export const deleteFieldById = (id: string) => documentApi.delete(`/fields/${id}`);

export const searchFieldByName = (name: string) => documentApi.post('/fields/search', { name });

// Tạo tác giả mới
export const createAuthor = (author: { name: string }) => documentApi.post('/authors', author);

// Lấy thông tin tác giả theo ID
export const getAuthorById = (id: string) => documentApi.get(`/authors/${id}`);

// Cập nhật thông tin tác giả
export const updateAuthor = (id: string, author: { name: string }) => documentApi.put(`/authors/${id}`, author);

// Xoá tác giả
export const deleteAuthorById = (id: string) => documentApi.delete(`/authors/${id}`);

// Tìm tác giả theo tên chính xác
export const getAuthorByName = (name: string) => documentApi.get(`/authors/name/${name}`);

// Tìm tác giả theo tên gần giống
export const searchAuthorsByName = (name: string) => documentApi.post('/authors/search', { name });

// Tạo bài viết mới
export const createDocument = (article: DocumentType) => documentApi.post('/articles', article);

// Lấy tất cả bài viết
export const getAllDocuments = () => documentApi.get('/articles');

// Lấy bài viết theo ID
export const getDocumentById = (id: string) => documentApi.get(`/articles/${id}`);

// Cập nhật bài viết
export const updateDocument = (id: string, article: DocumentType) => documentApi.put(`/articles/${id}`, article);

// Xoá bài viết
export const deleteDocumentById = (id: string) => documentApi.delete(`/articles/${id}`);

// Tạo bài viết từ file Excel
export const createDocumentsFromExcel = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return documentApi.post('/articles/excel', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

// Tìm bài viết theo tiêu đề chính xác
export const getDocumentByTitle = (title: string) => documentApi.get(`/articles/title/${title}`);

// Tìm bài viết theo tiêu đề gần đúng
export const searchDocumentsByName = (name: string) => documentApi.get('/articles/search', { params: { name } });

