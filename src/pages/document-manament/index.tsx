import { Box, Button, Grid2, Paper, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import useDocument from "../../hooks/useDocument";
import CustomDocumentTable from "../../components/document-table";
import FilterBar from "./Filterbar";
import { Add } from "@mui/icons-material";
import CustomizedDialogs from "../../components/Dialog";
import FormDocument from "./FormDocument";

const StyledContainer = styled(Grid2)(({ theme }) => ({
    padding: theme.spacing(0),
}));

function DocumentManagementPage() {
    const theme = useTheme()
    const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
    const { document, isLoadingDocument } = useDocument()
    const [isOpenAddFarmDialog, setOpenAddFarmDialog] = useState<boolean>(false);
    const [filters, setFilters] = useState({
        keyword: "",
        category: "", // ví dụ như "Học phần"
    });

    const handleOpenAddFarmDialog = () => {
        setOpenAddFarmDialog(true)
    }


    return (
        <>
            <StyledContainer container spacing={2}>
                <Grid2 size={{ xs: 12 }}>

                    <Typography variant="h4">Quản lý học liệu</Typography>


                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", gap: 1 }}>
                        <FilterBar filters={filters} setFilters={setFilters} />
                        <Button
                            variant="contained"
                            startIcon={<Add />}
                            sx={{ whiteSpace: "nowrap", padding: "6px 12px", minWidth: "150px", borderRadius: "4px", boxShadow: 0 }}
                            onClick={handleOpenAddFarmDialog}
                        >
                            Thêm học liệu
                        </Button>

                    </Box>
                </Grid2>
                <Grid2 size={{ xs: 12 }}>
                    <Paper sx={{ width: "100%" }}>
                        <CustomDocumentTable filters={filters} documents={document} isLoadingDocument={isLoadingDocument} />
                    </Paper>
                </Grid2>

            </StyledContainer>
            <CustomizedDialogs
                size="sm"
                fullscreen={!matchUpMd}
                title={"Thêm học liệu"}
                open={isOpenAddFarmDialog}
                handleOpen={setOpenAddFarmDialog}
                body={<FormDocument handleOpen={setOpenAddFarmDialog} />}
            />
        </>

    );
}

export default DocumentManagementPage;