import { Box, MenuItem, Select, styled } from '@mui/material';

const StyledSelect = styled(Select)(({ theme }) => ({
    minWidth: 320,
    backgroundColor: '#fff',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    '.MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
}));

function FilterBar({ filters, setFilters }: any) {

    return (
        <Box display="flex" width={"100%"} alignItems="center" justifyContent={"flex-start"} gap={1}>
            <StyledSelect
                size='small'
                value={filters.category}
                onChange={(e) => setFilters((prev: any) => ({ ...prev, category: e.target.value }))}
                displayEmpty
                inputProps={{ 'aria-label': 'Tất cả học liệu' }}
            >
                <MenuItem value="">Tất cả học liệu</MenuItem>
                <MenuItem value="Bài báo">Bài báo</MenuItem>
                <MenuItem value="Sách">Sách</MenuItem>
                <MenuItem value="Slide">Slide bài giảng</MenuItem>
            </StyledSelect>


        </ Box>
    );
}

export default FilterBar;
