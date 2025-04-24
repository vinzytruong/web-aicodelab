import { Grid2, styled, Typography } from "@mui/material";
import FilterBar from "./Filterbar";
import Document from "./Document";
import { useEffect, useState } from "react";
import useDocument from "../../hooks/useDocument";

const StyledContainer = styled(Grid2)(({ theme }) => ({
    padding: theme.spacing(0),
}));

function SearchPage() {
    const { documents, setSearchTerm } = useDocument()
    const [filters, setFilters] = useState({
        keyword: "",
        category: "", // ví dụ như "Học phần"
    });
    const [mode, setMode] = useState<'list' | 'grid'>('list');

    useEffect(() => {
        setSearchTerm(filters.keyword);
    }, [filters.keyword, setSearchTerm]);

    return (
        <StyledContainer container spacing={2}>
            <Grid2 size={{ xs: 12 }}>
                <Typography variant="h4">Kho học liệu</Typography>
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
                <FilterBar filters={filters} setFilters={setFilters} mode={mode} setMode={setMode} />
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
                <Document filters={filters} mode={mode} documents={documents} />
            </Grid2>
        </StyledContainer>
    );
}

export default SearchPage;