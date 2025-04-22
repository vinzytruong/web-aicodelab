export type Order = 'asc' | 'desc';

export interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Document) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export interface HeadCell {
    disablePadding: boolean;
    id: keyof Document;
    label: string;
    numeric: boolean;
}

export interface Document {
    id: string,
    title: string;
    type: string;
    year: number;
    author: string;
    field: string;
    publisher: string;
}