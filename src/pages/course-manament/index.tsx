import { Grid2, styled, Typography } from "@mui/material";

const StyledContainer = styled(Grid2)(({ theme }) => ({
    padding: theme.spacing(0),
}));

function CourseManagementPage() {
    return (
        <StyledContainer container spacing={2}>
            <Grid2 size={{ xs: 12 }}>
                <Typography variant="h4">Quản lý khóa học</Typography>
            </Grid2>

        </StyledContainer>
    );
}

export default CourseManagementPage;