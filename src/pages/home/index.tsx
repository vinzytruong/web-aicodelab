import { Box, Container, Grid2, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { useKeycloak } from "@react-keycloak/web";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// Styled component cho container chính
const StyledContainer = styled(Grid2)(({ theme }) => ({
    padding: theme.spacing(0),
}));



function HomePage() {

    const { initialized } = useKeycloak();
    const { t } = useTranslation()

    const features = [
        {
            title: "Kho tài liệu",
            link: process.env.REACT_APP_DOCUMENT_UI_URL,
            image: "/images/station.png",
            isShow: true
        },
        {
            title: "Trợ giảng AI",
            link: process.env.REACT_APP_AI_ASSISTANT_UI_URL,
            image: "/images/user.png",
            isShow: true
        },
        {
            title: "Các khóa học",
            link: process.env.REACT_APP_COURSE_UI_URL,
            image: "/images/scheduleItem.png",
            isShow: true
        },
        {
            title: "Công cụ tiện ích",
            link: process.env.REACT_APP_COURSE_UI_URL,
            image: "/images/scheduleItem.png",
            isShow: true
        },
        {
            title: "Lịch thi",
            link: process.env.REACT_APP_COURSE_UI_URL,
            image: "/images/scheduleItem.png",
            isShow: true
        },
        {
            title: "Lịch thực hành",
            link: process.env.REACT_APP_COURSE_UI_URL,
            image: "/images/scheduleItem.png",
            isShow: true
        }
    ];

    if (!initialized) {
        return <div>Loading...</div>;
    }


    return (
        <Container maxWidth="xl">
            <StyledContainer container spacing={2}>
                <Grid2 size={{ xs: 4 }}>
                    <Paper sx={{ width: "100%", height: "100%", display: "grid", placeItems: "center", p: 4 }}>
                        <Box sx={{ height: "200px", width: "200px", borderRadius: "8px", background: "grey", display: "grid", placeItems: "center" }}>
                        </Box>
                        <Box sx={{ width: "100%", pt: 4 }}>
                            <Grid2 container spacing={2} >
                                <Grid2 size={{ xs: 4 }}>
                                    <Typography variant="body2" sx={{ fontSize: 15, lineHeight: 2.5 }}>{t("Họ và tên:")}</Typography>
                                </Grid2>
                                <Grid2 size={{ xs: 8 }}>
                                    <Typography variant="body2" sx={{ fontSize: 15, lineHeight: 2.5 }}>{t("Trương Phúc Vĩnh")}</Typography>
                                </Grid2>


                            </Grid2>
                            <Grid2 container spacing={2} >
                                <Grid2 size={{ xs: 4 }}>
                                    <Typography variant="body2" sx={{ fontSize: 15, lineHeight: 2.5 }}>{t("Mã số sinh viên:")}</Typography>
                                </Grid2>
                                <Grid2 size={{ xs: 8 }}>
                                    <Typography variant="body2" sx={{ fontSize: 15, lineHeight: 2.5 }}>{t("M3724015")}</Typography>
                                </Grid2>


                            </Grid2>
                            <Grid2 container spacing={2}>
                                <Grid2 size={{ xs: 4 }}>
                                    <Typography variant="body2" sx={{ fontSize: 15, lineHeight: 2.5 }}>{t("Ngành học")}:</Typography>
                                </Grid2>
                                <Grid2 size={{ xs: 8 }}>
                                    <Typography variant="body2" sx={{ fontSize: 15, lineHeight: 2.5 }}>{t("Kỹ thuật phần mềm")}</Typography>
                                </Grid2>


                            </Grid2>
                            <Grid2 container spacing={2}>
                                <Grid2 size={{ xs: 4 }}>
                                    <Typography variant="body2" sx={{ fontSize: 15, lineHeight: 2.5 }}>{t("Khóa")}:</Typography>
                                </Grid2>
                                <Grid2 size={{ xs: 8 }}>
                                    <Typography variant="body2" sx={{ fontSize: 15, lineHeight: 2.5 }}>{t("45")}</Typography>
                                </Grid2>


                            </Grid2>
                        </Box>

                    </Paper>

                </Grid2>

                <Grid2 size={{ xs: 8 }}>
                    <Grid2 container spacing={2}>
                        {features?.map((feature, index) =>
                            <Grid2 key={index} size={{ xs: 12, md: 4 }}>
                                <Link to={feature.link!} style={{ textDecoration: "none" }}>
                                    <Paper sx={{ aspectRatio: "1/1", width: "100%", display: "grid", placeItems: "center" }}>
                                        <Box sx={{ width: "100%", height: "100px", p: 1, display: "grid", placeItems: "center" }}>
                                            <img src={feature.image} width={90} height={90} alt={feature.title} />
                                        </Box>
                                        <Typography variant="body2" sx={{ fontSize: 15 }}>{t(feature.title)}</Typography>
                                    </Paper>
                                </Link>

                            </Grid2>
                        )}
                    </Grid2>

                </Grid2>
            </StyledContainer>


        </Container>
    );
}

export default HomePage;
