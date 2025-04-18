import { Box } from "@mui/material";
import MainCard from "../../components/MainCard";

export const CsAuthCardWrapper = ({ children, ...other }: any) => (
    <MainCard
        sx={{
            maxWidth: { xs: 325, lg: 425 },
            margin: { xs: 2.5, md: 3 },
            '& > *': {
                flexGrow: 1,
                flexBasis: '50%'
            }
        }}
        content={false}
        {...other}
    >
        <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
    </MainCard>
);