import { Grid2, styled } from "@mui/material";
import FilterBar from "./Filterbar";
import Document from "./Document";
import { useState } from "react";

const StyledContainer = styled(Grid2)(({ theme }) => ({
    padding: theme.spacing(0),
}));

function SearchPage() {
    const [filters, setFilters] = useState({
        keyword: "",
        category: "", // ví dụ như "Học phần"
    });
    const [mode, setMode] = useState<'list' | 'grid'>('list');

    return (
        <StyledContainer container spacing={2}>
            <Grid2 size={{ xs: 12 }}>
                <FilterBar filters={filters} setFilters={setFilters} mode={mode} setMode={setMode} />
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
                <Document filters={filters} mode={mode} />
            </Grid2>
        </StyledContainer>
    );
}

export default SearchPage;