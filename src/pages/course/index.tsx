import { Box, Grid2, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useConfig } from "../../hooks/useConfig";
import FilterBar from "./Filterbar";
import Course from "./Course";
import { useState } from "react";

// Styled component cho container chính
const StyledContainer = styled(Grid2)(({ theme }) => ({
    padding: theme.spacing(0),
}));

// Styled component cho phần Schedule Slide
const StyledSlideWrapper = styled(Box)(({ theme }) => ({
    width: "100%",
    height: 250,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
    },
}));

function ButtonPage() {
    const { t } = useTranslation();
    const { borderRadius } = useConfig();
    const theme = useTheme();

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