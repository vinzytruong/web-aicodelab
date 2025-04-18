import { Typography } from "@mui/material";
import { SidebarFooterProps } from "@toolpad/core";
import { VERSION, WEB_NAME_BRIEF } from "../contants";

function CsSidebarFooter({ mini }: SidebarFooterProps) {
    return (
        <Typography
            variant="caption"
            sx={{ m: 1, whiteSpace: 'nowrap', overflow: 'hidden' }}
        >
            {mini ? `© ${WEB_NAME_BRIEF}` : `© ${new Date().getFullYear()} ${WEB_NAME_BRIEF} ${VERSION}`}
        </Typography>
    );
}
export default CsSidebarFooter;