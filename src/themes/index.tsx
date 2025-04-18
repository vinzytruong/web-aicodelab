import Typography from './typography';
import Palette from './palette';
import componentStyleOverrides from './override';
import { useMemo, ReactNode } from 'react';
import { useConfig } from '../hooks/useConfig';
import { TypographyOptions } from '@mui/material/styles/createTypography';
import { createTheme, ThemeOptions, ThemeProvider, Theme, styled } from '@mui/material/styles';
import { Box, CssBaseline, StyledEngineProvider } from '@mui/material';

interface Props {
    children: ReactNode;
}
const CustomScrollBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100vh',
    overflowY: 'auto', // Đảm bảo scrollbar hiện lên khi cần
    '&::-webkit-scrollbar': {
        width: '7px',
        height: '7px',
    },
    '&::-webkit-scrollbar-track': {
        background: 'white',
        borderRadius: '10px',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#dbdbdb',
        borderRadius: '10px',
    },
}));
export const CsThemeProvider = ({ children }: Props) => {
    const { borderRadius, fontFamily, navType, outlinedFilled, presetColor } = useConfig();

    const theme: Theme = useMemo<Theme>(() => Palette(navType, presetColor), [navType, presetColor]);

    const themeTypography: TypographyOptions = useMemo<TypographyOptions>(
        () => Typography(theme, borderRadius, fontFamily),
        [theme, borderRadius, fontFamily]
    );

    const themeOptions: ThemeOptions = useMemo(() => ({
        palette: theme.palette,
        typography: themeTypography,
    }), [theme, themeTypography]);

    const themes: Theme = createTheme(themeOptions)

    themes.components = useMemo(() => {
        return componentStyleOverrides(themes, borderRadius, outlinedFilled)
    }, [themes, borderRadius, outlinedFilled]);

    return (
        <CustomScrollBox>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={themes}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </StyledEngineProvider>
        </CustomScrollBox>
    );
}
