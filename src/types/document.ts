export interface Author {
    id: string;
    name: string;
}

export interface Field {
    id: string;
    name: string;
}

export interface DocumentType {
    id: string;
    title: string;
    content: string;
    type: string; // hoặc: 'Sách' | 'Bài báo' | 'Tài liệu' nếu bạn muốn giới hạn
    authors: Author[];
    field: Field;
}

