import { Box, Grid2 } from "@mui/material";
import { styled } from "@mui/material/styles";
import ScheduleSlide from "./ScheduleSlide";
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

function HomePage() {
    const [filters, setFilters] = useState({
        keyword: "",
        category: "", // ví dụ như "Học phần"
    });
    const [mode, setMode] = useState<'list' | 'grid'>('list');

    const slideData = [
        {
            title: 'CT101- Lập trình căn bản A (Châu Xuân Phương)',
            content: 'Nội dung: Thực hành buổi 01',
            address: "Địa điểm: Phòng 201/DI"
        },
        {
            title: 'CT101- Lập trình căn bản A (Phan Huy Cường)',
            content: 'Nội dung: Thực hành buổi 01',
            address: "Địa điểm: Phòng 201/DI"
        },
        {
            title: 'CT101- Lập trình căn bản A (Trương Thị Thanh Tuyền)',
            content: 'Nội dung: Thực hành buổi 01',
            address: "Địa điểm: Phòng 201/DI"
        },
    ];

    return (
        <StyledContainer container spacing={2}>
            <Grid2 size={{ xs: 12 }}>
                <StyledSlideWrapper>
                    <ScheduleSlide
                        slides={slideData}
                        backgroundImage="https://swiperjs.com/demos/images/nature-1.jpg"
                    />
                </StyledSlideWrapper>
            </Grid2>

            <Grid2 size={{ xs: 12 }}>
                <FilterBar filters={filters} setFilters={setFilters} mode={mode} setMode={setMode} />
            </Grid2>
            <Grid2 size={{ xs: 12 }}>
                <Course filters={filters} mode={mode} />
            </Grid2>
        </StyledContainer>
    );
}

export default HomePage;
