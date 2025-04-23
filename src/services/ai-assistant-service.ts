import { DocumentType } from "../types/document";
import { aiAssistantApi } from "./global-config-service";

export const getAllDocument = () => aiAssistantApi.get('/articles')

export const getAllField = () => aiAssistantApi.get('/fields');

export const getAllAuthor = () => aiAssistantApi.get('/authors');

export const getFieldById = (id: string) => aiAssistantApi.get(`/fields/${id}`);

export const createField = (field: { name: string }) => aiAssistantApi.post('/fields', field);

export const updateField = (id: string, field: { name: string }) => aiAssistantApi.put(`/fields/${id}`, field);

export const deleteFieldById = (id: string) => aiAssistantApi.delete(`/fields/${id}`);

export const searchFieldByName = (name: string) => aiAssistantApi.post('/fields/search', { name });

// Tạo tác giả mới
export const createAuthor = (author: { name: string }) => aiAssistantApi.post('/authors', author);

// Lấy thông tin tác giả theo ID
export const getAuthorById = (id: string) => aiAssistantApi.get(`/authors/${id}`);

// Cập nhật thông tin tác giả
export const updateAuthor = (id: string, author: { name: string }) => aiAssistantApi.put(`/authors/${id}`, author);

// Xoá tác giả
export const deleteAuthorById = (id: string) => aiAssistantApi.delete(`/authors/${id}`);

// Tìm tác giả theo tên chính xác
export const getAuthorByName = (name: string) => aiAssistantApi.get(`/authors/name/${name}`);

// Tìm tác giả theo tên gần giống
export const searchAuthorsByName = (name: string) => aiAssistantApi.post('/authors/search', { name });

// Tạo bài viết mới
export const createDocument = (article: DocumentType) => aiAssistantApi.post('/articles', article);

// Lấy tất cả bài viết
export const getAllArticles = () => aiAssistantApi.get('/articles');

// Lấy bài viết theo ID
export const getArticleById = (id: string) => aiAssistantApi.get(`/articles/${id}`);

// Cập nhật bài viết
export const updateArticle = (id: string, article: DocumentType) => aiAssistantApi.put(`/articles/${id}`, article);

// Xoá bài viết
export const deleteArticleById = (id: string) => aiAssistantApi.delete(`/articles/${id}`);

// Tạo bài viết từ file Excel
export const createArticlesFromExcel = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return aiAssistantApi.post('/articles/excel', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

// Tìm bài viết theo tiêu đề chính xác
export const getArticleByTitle = (title: string) => aiAssistantApi.get(`/articles/title/${title}`);

// Tìm bài viết theo tiêu đề gần đúng
export const searchArticlesByName = (name: string) => aiAssistantApi.post('/articles/search', { name });
