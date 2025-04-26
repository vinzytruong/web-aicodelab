import { Box, Button, Grid2, Paper, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { Add } from "@mui/icons-material";
import CustomizedDialogs from "../../components/Dialog";
import CustomAuthorTable from "../../components/author-table";
import useAuthor from "../../hooks/useAuthor";
import FormAuthor from "./FormAuthor";

const StyledContainer = styled(Grid2)(({ theme }) => ({
    padding: theme.spacing(0),
}));

function DocumentManagementPage() {
    const theme = useTheme()
    const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

    const { authors, isLoadingAuthor, fetchDataAuthor } = useAuthor()
    const [isOpenAddAuthorDialog, setOpenAddAuthorDialog] = useState<boolean>(false);

    const handleOpenAddAuthorDialog = () => {
        setOpenAddAuthorDialog(true)
    }

    return (
        <>
            <StyledContainer container spacing={2}>
                <Grid2 size={{ xs: 12 }}>
                    <Typography variant="h4">Quản lý tác giả</Typography>
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
                                <CustomAuthorTable authors={authors} isLoadingAuthor={isLoadingAuthor} />
                            </Paper>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </StyledContainer>
            <CustomizedDialogs
                size="sm"
                fullscreen={!matchUpMd}
                title={"Thêm tác giả"}
                open={isOpenAddAuthorDialog}
                handleOpen={setOpenAddAuthorDialog}
                body={<FormAuthor handleOpen={setOpenAddAuthorDialog} />}
            />
           
        </>

    );
}

export default DocumentManagementPage;