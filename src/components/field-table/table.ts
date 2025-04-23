export type Order = 'asc' | 'desc';

export interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Field) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

export interface HeadCell {
    disablePadding: boolean;
    id: keyof Field;
    label: string;
    numeric: boolean;
}

export interface Field {
    id: string;
    name: string;

}