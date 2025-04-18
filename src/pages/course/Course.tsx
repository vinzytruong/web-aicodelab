import { Box, Card, CardActionArea, CardContent, Grid2, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { randomColor } from "../../utils/randomColor";

const COURSE = [
    { subject: "CT101-Lập trình căn bản A", name: "Instruction to Programming A", image: "", href: "", teacher: "ThS. Châu Xuân Phương" },
    { subject: "CT101-Lập trình căn bản A", name: "Data structure", image: "", href: "", teacher: "ThS. Châu Xuân Phương" },
    { subject: "CT101-Lập trình căn bản A", name: "Algorithms Analysis and Design", image: "", href: "", teacher: "ThS. Châu Xuân Phương" },
    { subject: "CT101-Lập trình căn bản A", name: "Introduction to simulation platform", image: "", href: "", teacher: "ThS. Châu Xuân Phương" },
    { subject: "CT101-Lập trình căn bản A", name: "Introduction to Software Engineering", image: "", href: "", teacher: "ThS. Châu Xuân Phương" },
    { subject: "CT101-Lập trình căn bản A", name: "Open Source Software Development", image: "", href: "", teacher: "ThS. Châu Xuân Phương" },
    { subject: "CT101-Lập trình căn bản A", name: "Software Constructions", image: "", href: "", teacher: "ThS. Châu Xuân Phương" },
    { subject: "CT101-Lập trình căn bản A", name: "Software Requirements Engineering", image: "", href: "", teacher: "ThS. Châu Xuân Phương" },
    { subject: "CT101-Lập trình căn bản A", name: "Software Architecture and Design", image: "", href: "", teacher: "ThS. Châu Xuân Phương" },
    { subject: "CT101-Lập trình căn bản A", name: "Software Quality Assurance and Testing", image: "", href: "", teacher: "ThS. Châu Xuân Phương" },
    { subject: "CT101-Lập trình căn bản A", name: "Software Maintenance", image: "", href: "", teacher: "ThS. Châu Xuân Phương" },
    { subject: "CT101-Lập trình căn bản A", name: "Software Project Management", image: "", href: "", teacher: "ThS. Châu Xuân Phương" },
    { subject: "CT101-Lập trình căn bản A", name: "Data mining", image: "", href: "", teacher: "ThS. Châu Xuân Phương" },
    { subject: "CT101-Lập trình căn bản A", name: "Artificial Intelligence", image: "", href: "", teacher: "ThS. Châu Xuân Phương" },
    { subject: "CT101-Lập trình căn bản A", name: "Research methods", image: "", href: "", teacher: "ThS. Châu Xuân Phương" },
    { subject: "CT177-Phân tích và thiết kế thuật toán", name: "Advanced database", image: "", href: "", teacher: "ThS. Châu Xuân Phương" },
]

function Course({ filters, mode }: any) {
    const { t } = useTranslation();

    const filteredData = COURSE.filter((item) => {
        const matchKeyword = item.name.toLowerCase().includes(filters.keyword.toLowerCase());
        const matchCategory = filters.category ? item.subject === filters.category : true;
        return matchKeyword && matchCategory;
    });


    return (
        <Grid2 container spacing={2} sx={{ width: "100%" }}>

            {filteredData?.map((item, index) => (
                <Grid2 size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={index}>
                    <Card variant="outlined" sx={{ width: "100%", height: "100%", borderRadius: "4px" }}>
                        <CardActionArea sx={{ height: "100%" }}>
                            <Box sx={{ height: "160px", backgroundColor: randomColor() }} />
                            <CardContent sx={{ height: "100%" }}>
                                <Typography variant="body1" fontWeight={600}>{t(item.name)}</Typography>
                                <Typography variant="caption">{t(item.teacher)}</Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid2>
            ))}
        </Grid2>
    );
}

export default Course;