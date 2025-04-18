import { Avatar, Box, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useConfig } from '../hooks/useConfig';
import { DarkMode, LightMode } from '@mui/icons-material';


export const CsTheme = () => {
    const theme = useTheme();
    // const { t } = useTranslation();

    const { navType, onChangeMenuType, borderRadius } = useConfig();

    return (
        <Box display='flex' alignItems="center" justifyContent='space-between'>
            <Tooltip title={"Chủ đề"}>
                <Avatar
                    variant="rounded"
                    sx={{
                        border: '1px solid',
                        cursor: "pointer",
                        borderRadius: `${borderRadius}px`,
                        borderColor: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.light,
                        background: theme.palette.mode === 'dark' ? theme.palette.primary.main : theme.palette.primary.light,
                        color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
                        '&[aria-controls="menu-list-grow"],&:hover': {
                            borderColor: theme.palette.primary.main,
                            background: theme.palette.primary.main,
                            color: theme.palette.primary.light
                        }
                    }}
                    onClick={() => onChangeMenuType(navType === 'dark' ? 'light' : 'dark')}
                    color="inherit"
                >
                    {navType === 'dark' ? <DarkMode /> : <LightMode />}
                </Avatar>
            </Tooltip>
        </Box>
    );
};
