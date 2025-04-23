import { Box, Button, Grid2, Paper, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import useDocument from "../../hooks/useDocument";
import CustomDocumentTable from "../../components/document-table";
import FilterBar from "./Filterbar";
import { Add } from "@mui/icons-material";
import CustomizedDialogs from "../../components/Dialog";
import FormDocument from "./FormDocument";
import useField from "../../hooks/useField";
import CustomFieldTable from "../../components/field-table";
import CustomAuthorTable from "../../components/author-table";
import useAuthor from "../../hooks/useAuthor";
import FormField from "./FormField";
import FormAuthor from "./FormAuthor";

const StyledContainer = styled(Grid2)(({ theme }) => ({
    padding: theme.spacing(0),
}));

function DocumentManagementPage() {
    const theme = useTheme()
    const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
    const { document, isLoadingDocument } = useDocument()
    const { fields, isLoadingField } = useField()
    const { authors, isLoadingAuthor } = useAuthor()
    const [isOpenAddDocumentDialog, setOpenAddDocumentDialog] = useState<boolean>(false);
    const [isOpenAddFieldDialog, setOpenAddFieldDialog] = useState<boolean>(false);
    const [isOpenAddAuthorDialog, setOpenAddAuthorDialog] = useState<boolean>(false);

    const [filters, setFilters] = useState({
        keyword: "",
        category: "", // ví dụ như "Học phần"
    });

    const handleOpenAddDocumentDialog = () => {
        setOpenAddDocumentDialog(true)
    }

    const handleOpenAddFieldDialog = () => {
        setOpenAddFieldDialog(true)
    }

    const handleOpenAddAuthorDialog = () => {
        setOpenAddAuthorDialog(true)
    }


    return (
        <>
            <StyledContainer container spacing={2}>
                <Grid2 size={{ xs: 12 }}>

                    <Typography variant="h4">Quản lý học liệu</Typography>


                </Grid2>
                <Grid2 size={{ xs: 12 }} sx={{ background: "#fff", padding: 2 }}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 12 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", gap: 1 }}>
                                <Typography variant="h6">Lĩnh vực học liệu</Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<Add />}
                                    sx={{ whiteSpace: "nowrap", padding: "6px 12px", minWidth: "150px", borderRadius: "4px", boxShadow: 0 }}
                                    onClick={handleOpenAddFieldDialog}
                                >
                                    Thêm lĩnh vực
                                </Button>

                            </Box>
                        </Grid2>
                        <Grid2 size={{ xs: 12 }}>
                            <Paper sx={{ width: "100%" }}>
                                <CustomFieldTable filters={filters} fields={fields} isLoadingField={isLoadingField} />
                            </Paper>
                        </Grid2>
                    </Grid2>
                </Grid2>
                <Grid2 size={{ xs: 12 }} sx={{ background: "#fff", padding: 2 }}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 12 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", gap: 1 }}>
                                <Typography variant="h6">Tác giả của học liệu</Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<Add />}
                                    sx={{ whiteSpace: "nowrap", padding: "6px 12px", minWidth: "150px", borderRadius: "4px", boxShadow: 0 }}
                                    onClick={handleOpenAddAuthorDialog}
                                >
                                    Thêm tác giả
                                </Button>

                            </Box>
                        </Grid2>
                        <Grid2 size={{ xs: 12 }}>
                            <Paper sx={{ width: "100%" }}>
                                <CustomAuthorTable filters={filters} authors={authors} isLoadingAuthor={isLoadingAuthor} />
                            </Paper>
                        </Grid2>
                    </Grid2>
                </Grid2>
                <Grid2 size={{ xs: 12 }} sx={{ background: "#fff", padding: 2 }}>
                    <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 12 }}>
                            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", gap: 1 }}>
                                <FilterBar filters={filters} setFilters={setFilters} />
                                <Button
                                    variant="contained"
                                    startIcon={<Add />}
                                    sx={{ whiteSpace: "nowrap", padding: "6px 12px", minWidth: "150px", borderRadius: "4px", boxShadow: 0 }}
                                    onClick={handleOpenAddDocumentDialog}
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
                    </Grid2>
                </Grid2>


            </StyledContainer>
            <CustomizedDialogs
                size="sm"
                fullscreen={!matchUpMd}
                title={"Thêm lĩnh vực"}
                open={isOpenAddFieldDialog}
                handleOpen={setOpenAddFieldDialog}
                body={<FormField handleOpen={setOpenAddFieldDialog} />}
            />
            <CustomizedDialogs
                size="sm"
                fullscreen={!matchUpMd}
                title={"Thêm tác giả"}
                open={isOpenAddAuthorDialog}
                handleOpen={setOpenAddAuthorDialog}
                body={<FormAuthor handleOpen={setOpenAddAuthorDialog} />}
            />
            <CustomizedDialogs
                size="sm"
                fullscreen={!matchUpMd}
                title={"Thêm học liệu"}
                open={isOpenAddDocumentDialog}
                handleOpen={setOpenAddDocumentDialog}
                body={<FormDocument handleOpen={setOpenAddDocumentDialog} />}
            />
        </>

    );
}

export default DocumentManagementPage;