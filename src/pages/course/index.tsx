import { Grid2 } from "@mui/material";
import { styled } from "@mui/material/styles";
import FilterBar from "./Filterbar";
import Course from "./Course";
import { useState } from "react";

const StyledContainer = styled(Grid2)(({ theme }) => ({
    padding: theme.spacing(0),
}));

function ButtonPage() {
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
                <Course filters={filters} mode={mode} />
            </Grid2>
        </StyledContainer>
    );
}

export default ButtonPage;