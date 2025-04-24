import { Box, TableHead, TableRow, TableSortLabel, useTheme } from "@mui/material";
import { HeadCell, Order, Author } from "./table";
import { visuallyHidden } from '@mui/utils';
import { StyledTableCell } from "./style";
import { useTranslation } from "react-i18next";

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Author) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    headCells: readonly HeadCell[];
}

export function EnhancedTableHead(props: EnhancedTableProps) {
    const theme = useTheme()
    const { t } = useTranslation();
    const { order, orderBy, headCells, onRequestSort } = props;

    const createSortHandler = (property: keyof Author) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <StyledTableCell padding="normal">#</StyledTableCell>
                {headCells.map((headCell) => (
                    <StyledTableCell
                        key={headCell.id}
                        // align={headCell.id === "action" ? "center" : (headCell.numeric ? 'right' : 'left')}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}>
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                            sx={{
                                color: `${theme.palette.text.primary} !important`,
                                '& .MuiTableSortLabel-icon': {
                                    color: `${theme.palette.text.primary} !important`,
                                }
                            }}>
                            {t(headCell.label)}
                            {orderBy === headCell.id &&
                                <Box sx={visuallyHidden} >
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            }
                        </TableSortLabel>
                    </StyledTableCell>
                ))}
                <StyledTableCell
                    align={"center"}
                    padding={'normal'}>
                    Thao tác
                </StyledTableCell>
            </TableRow>
        </TableHead>
    );
}