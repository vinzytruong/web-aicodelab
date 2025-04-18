import React from 'react';
import {
    Box,
    Button,
    IconButton,
    Input,
    InputBase,
    MenuItem,
    OutlinedInput,
    Paper,
    Select,
    SelectChangeEvent,
    styled,
    TextField,
    useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';

const BlueButton = styled(Button)(({ theme }) => ({
    background: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
    textTransform: 'none',
    boxShadow: "none",
    height: "100%",

    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
}));

const WhiteIconButton = styled(IconButton)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    padding: 6,
}));

const ModeButton = styled(IconButton)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    background: theme.palette.primary.main,
    color: theme.palette.text.secondary,
    padding: 6,
}));

const StyledSelect = styled(Select)(({ theme }) => ({
    minWidth: 320,
    backgroundColor: '#fff',
    borderRadius: theme.shape.borderRadius,
    border: `1px solid ${theme.palette.divider}`,
    '.MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
}));

const SearchBar = styled(Paper)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '0',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#fff',
    marginLeft: 'auto',
    width: 280,
}));

function FilterBar({ filters, setFilters, mode, setMode }: any) {
    const theme = useTheme()

    return (
        <Box display="flex" alignItems="center" gap={1}>
            <BlueButton variant="contained" startIcon={<TuneIcon />}>
                Lọc
            </BlueButton>

            <WhiteIconButton
                onClick={() => setMode('list')}
                sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: mode === 'grid' ? theme.palette.primary.dark : theme.palette.primary.main,
                    color: mode === 'list' ? theme.palette.background.paper : theme.palette.primary.main,
                }}
            >
                <ViewListIcon />

            </WhiteIconButton>

            <ModeButton
                onClick={() => setMode('grid')}
                sx={{
                    border: `1px solid ${theme.palette.divider}`,
                    backgroundColor: mode === 'list' ? theme.palette.primary.dark : theme.palette.primary.main,
                    color: mode === 'list' ? theme.palette.primary.main : theme.palette.background.paper,
                }}
            >
                <ViewModuleIcon />
            </ModeButton>

            <StyledSelect
                size='small'
                value={filters.category}
                onChange={(e) => setFilters((prev: any) => ({ ...prev, category: e.target.value }))}
                displayEmpty
                inputProps={{ 'aria-label': 'Tất cả học liệu' }}
            >
                <MenuItem value="">Tất cả học liệu</MenuItem>
                <MenuItem value="Sách">Sách</MenuItem>
                <MenuItem value="Bài báo">Bài báo</MenuItem>
                <MenuItem value="Slide">Slide bài giảng</MenuItem>
            </StyledSelect>

            <SearchBar elevation={0}>
                <InputBase
                    size="small"
                    value={filters.keyword}
                    onChange={(e) =>
                        setFilters((prev: any) => ({ ...prev, keyword: e.target.value }))
                    }
                    sx={{ flex: 1, borderRadius: theme.shape.borderRadius }}
                    placeholder="Tìm kiếm"

                />
            </SearchBar>
        </ Box>
    );
}

export default FilterBar;
