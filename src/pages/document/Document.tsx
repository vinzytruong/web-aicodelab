import { Box, Card, CardActionArea, CardContent, Grid2, Typography } from "@mui/material";
import { DOCUMENT } from "../../api/document";
import GraphDialog from "./GraphDialog";
import { randomColor } from "../../utils/randomColor";
import { DocumentType } from "../../types/document";

interface DocumentProps {
    filters: any,
    mode: any,
    documents: DocumentType[]
}

function Document({ filters, mode, documents }: DocumentProps) {
    const filteredData = documents?.filter((item: any) => {
        const matchKeyword = item.title.toLowerCase().includes(filters.keyword.toLowerCase());
        const matchCategory = filters.category ? item.type === filters.category : true;
        return matchKeyword && matchCategory;
    });
    console.log(documents);

    return (
        <Box>
            <Grid2 container spacing={2} sx={{ width: "100%" }}>
                {filteredData?.map((item, index) => (
                    <Grid2 size={{ xs: 12, sm: mode === "grid" ? 4 : 12 }} key={index}>
                        <Card variant="outlined">
                            <CardActionArea>
                                {mode === "grid" && <Box sx={{ height: "160px", backgroundColor: randomColor() }} />}
                                <CardContent>
                                    <Typography variant="body1" fontWeight={600}>{item.title}</Typography>
                                    <Typography variant="body2">Xuất bản: {item.publisher}</Typography>
                                    <Typography variant="body2">Tác giả: {item.author}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
            <GraphDialog documents={documents} />
        </Box>
    );
}

export default Document;
