import { Box, Typography } from "@mui/material";
import FormLogin from "./FormLogin";
import { CsAuthCardWrapper } from "./AuthCard";

function LoginPage() {
    return (
        <Box
            width={"100%"}
            height={"100vh"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
        >
            <CsAuthCardWrapper>
                <Typography pb={2} align="center" variant="h3">Login</Typography>
                <FormLogin />
            </CsAuthCardWrapper>
        </Box>
    );
}

export default LoginPage;