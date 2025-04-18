import { Stack } from "@mui/material";
import { CsLocaleV2 } from "./Locale";
import { CsTheme } from "./Theme";

export function CsToolbarActions() {
    return (
        <Stack direction="row" gap={1} sx={{ p: 0 }}>
            <CsLocaleV2 />
            <CsTheme />
        </Stack>
    );
}