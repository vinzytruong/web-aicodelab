import { Box, Card, CardActionArea, CardContent, Grid2, Typography } from "@mui/material";
import { DOCUMENT } from "../../api/document";
import GraphDialog from "./GraphDialog";
import { randomColor } from "../../utils/randomColor";

function Document({ filters, mode }: any) {
    const filteredData = DOCUMENT.filter((item) => {
        const matchKeyword = item.name.toLowerCase().includes(filters.keyword.toLowerCase());
        const matchCategory = filters.category ? item.category === filters.category : true;
        return matchKeyword && matchCategory;
    });

    return (
        <Box>
            <Grid2 container spacing={2} sx={{ width: "100%" }}>
                {filteredData.map((item, index) => (
                    <Grid2 size={{ xs: 12, sm: mode === "grid" ? 4 : 12 }} key={index}>
                        <Card variant="outlined">
                            <CardActionArea>
                                {mode === "grid" && <Box sx={{ height: "160px", backgroundColor: randomColor() }} />}
                                <CardContent>
                                    <Typography variant="body1" fontWeight={600}>{item.name}</Typography>
                                    <Typography variant="caption">{item.conference}, </Typography>
                                    <Typography variant="caption">{item.author}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid2>
                ))}
            </Grid2>
            <GraphDialog />
        </Box>
    );
}

export default Document;
