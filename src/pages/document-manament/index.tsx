import { Box, Button, Grid2, Paper, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import useDocument from "../../hooks/useDocument";
import CustomDocumentTable from "../../components/document-table";
import FilterBar from "./Filterbar";
import { Add } from "@mui/icons-material";
import CustomizedDialogs from "../../components/Dialog";
import FormDocument from "./FormDocument";
import useField from "../../hooks/useField";
import useAuthor from "../../hooks/useAuthor";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const StyledContainer = styled(Grid2)(({ theme }) => ({
    padding: theme.spacing(0),
}));

function DocumentManagementPage() {
    const theme = useTheme()
    const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));
    const { documents, isLoadingDocument, importDocument } = useDocument()
    const { fetchDataField } = useField()
    const { fetchDataAuthor } = useAuthor()
    const [isOpenAddDocumentDialog, setOpenAddDocumentDialog] = useState<boolean>(false);
    
    const [filters, setFilters] = useState({
        keyword: "",
        category: "", // ví dụ như "Học phần"
    });

    const handleOpenAddDocumentDialog = () => {
        setOpenAddDocumentDialog(true)
    }

    const handleDownloadTemplate = () => {
        const sampleData = [
            {
                title: "Ví dụ tiêu đề",
                content: "Nội dung mẫu",
                author_name: "Nguyễn Văn A, Trần Thị B",
                field_name: "Khoa học máy tính",
                type: "Bài báo" // hoặc "Slide", "Sách"
            }
        ];

        const worksheet = XLSX.utils.json_to_sheet(sampleData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Articles");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });

        saveAs(data, "template_articles.xlsx");
    };

    const handleImportExcel = async (e: any) => {
        const file = e.target.files[0];
        if (!file) return;
        await importDocument(file);
        await fetchDataAuthor();
        await fetchDataField()
    };


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
                                <FilterBar filters={filters} setFilters={setFilters} />
                                <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: 1 }}>

                                    <Button
                                        variant="contained"
                                        startIcon={<Add />}
                                        sx={{ whiteSpace: "nowrap", padding: "6px 12px", minWidth: "150px", borderRadius: "4px", boxShadow: 0 }}
                                        onClick={handleOpenAddDocumentDialog}
                                    >
                                        Thêm học liệu
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<Add />}
                                        sx={{ whiteSpace: "nowrap", padding: "6px 12px", minWidth: "150px", borderRadius: "4px", boxShadow: 0 }}
                                        onClick={handleDownloadTemplate}
                                    >
                                        Tải mẫu Excel
                                    </Button>

                                    <input
                                        type="file"
                                        accept=".xlsx"
                                        style={{ display: "none" }}
                                        id="import-excel-input"
                                        onChange={handleImportExcel}
                                    />
                                    <label htmlFor="import-excel-input">
                                        <Button
                                            variant="contained"
                                            component="span"
                                            startIcon={<Add />}
                                            sx={{ whiteSpace: "nowrap", padding: "6px 12px", minWidth: "150px", borderRadius: "4px", boxShadow: 0 }}
                                        >
                                            Import Excel
                                        </Button>
                                    </label>
                                </Box>
                            </Box>
                        </Grid2>
                        <Grid2 size={{ xs: 12 }}>
                            <Paper sx={{ width: "100%" }}>
                                <CustomDocumentTable filters={filters} documents={documents} isLoadingDocument={isLoadingDocument} />
                            </Paper>
                        </Grid2>
                    </Grid2>
                </Grid2>
            </StyledContainer>

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