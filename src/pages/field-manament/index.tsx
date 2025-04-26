import { Box, Button, Grid2, Paper, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { Add } from "@mui/icons-material";
import CustomizedDialogs from "../../components/Dialog";
import useField from "../../hooks/useField";
import CustomFieldTable from "../../components/field-table";
import FormField from "./FormField";

const StyledContainer = styled(Grid2)(({ theme }) => ({
    padding: theme.spacing(0),
}));

function DocumentManagementPage() {
    const theme = useTheme()
    const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

    const { fields, isLoadingField } = useField()
    const [isOpenAddFieldDialog, setOpenAddFieldDialog] = useState<boolean>(false);

    const handleOpenAddFieldDialog = () => {
        setOpenAddFieldDialog(true)
    }

    return (
        <>
            <StyledContainer container spacing={2}>
                <Grid2 size={{ xs: 12 }}>
                    <Typography variant="h4">Quản lý lĩnh vực</Typography>
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
                                <CustomFieldTable fields={fields} isLoadingField={isLoadingField} />
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
        </>
    );
}

export default DocumentManagementPage;