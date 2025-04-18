import { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Tooltip, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../hooks/useConfig';


export const CsLocale = () => {
    const { t } = useTranslation();
    const { locale, onChangeLocale } = useConfig();

    const anchorRef = useRef<any>(null);

    const [language, setLanguage] = useState<string>(locale);

    const handleToggle = () => {
        const lng = language === "en" ? "vn" : "en";
        setLanguage(lng);
        onChangeLocale(lng);
    };

    useEffect(() => {
        setLanguage(locale);
    }, [locale]);

    return (
        <>
            <Box>
                <Tooltip title={t("Ngôn ngữ")}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            cursor: "pointer",
                            background: "transparent",
                            transition: 'all .2s ease-in-out',
                            padding: '6px'
                        }}
                        ref={anchorRef}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        color="inherit"
                    >
                        {language === 'en' ?
                            <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-gb" viewBox="0 0 640 480">
                                <path fill="#012169" d="M0 0h640v480H0z" />
                                <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z" />
                                <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z" />
                                <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z" />
                                <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z" />
                            </svg>

                            :
                            <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-vn" viewBox="0 0 640 480">
                                <defs>
                                    <clipPath id="vn-a">
                                        <path fill-opacity=".7" d="M-85.3 0h682.6v512H-85.3z" />
                                    </clipPath>
                                </defs>
                                <g fill-rule="evenodd" clip-path="url(#vn-a)" transform="translate(80)scale(.9375)">
                                    <path fill="#da251d" d="M-128 0h768v512h-768z" />
                                    <path fill="#ff0" d="M349.6 381 260 314.3l-89 67.3L204 272l-89-67.7 110.1-1 34.2-109.4L294 203l110.1.1-88.5 68.4 33.9 109.6z" />
                                </g>
                            </svg>
                        }
                    </Avatar>
                </Tooltip>
            </Box>
        </>
    );
};

export const CsLocaleV2 = () => {
    const { t } = useTranslation();
    const { locale, onChangeLocale, borderRadius } = useConfig();
    const theme = useTheme()

    const anchorRef = useRef<any>(null);

    const [language, setLanguage] = useState<string>(locale);

    const handleToggle = () => {
        const lng = language === "en" ? "vn" : "en";
        setLanguage(lng);
        onChangeLocale(lng);
    };

    useEffect(() => {
        setLanguage(locale);
    }, [locale]);

    return (
        <>
            <Box>
                <Tooltip title={t("Ngôn ngữ")}>
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
                            },
                            padding: '6px'
                        }}
                        ref={anchorRef}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        color="inherit"
                    >
                        {language === 'en' ?
                            <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-gb" viewBox="0 0 640 480">
                                <path fill="#012169" d="M0 0h640v480H0z" />
                                <path fill="#FFF" d="m75 0 244 181L562 0h78v62L400 241l240 178v61h-80L320 301 81 480H0v-60l239-178L0 64V0z" />
                                <path fill="#C8102E" d="m424 281 216 159v40L369 281zm-184 20 6 35L54 480H0zM640 0v3L391 191l2-44L590 0zM0 0l239 176h-60L0 42z" />
                                <path fill="#FFF" d="M241 0v480h160V0zM0 160v160h640V160z" />
                                <path fill="#C8102E" d="M0 193v96h640v-96zM273 0v480h96V0z" />
                            </svg>

                            :
                            <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-vn" viewBox="0 0 640 480">
                                <defs>
                                    <clipPath id="vn-a">
                                        <path fill-opacity=".7" d="M-85.3 0h682.6v512H-85.3z" />
                                    </clipPath>
                                </defs>
                                <g fill-rule="evenodd" clip-path="url(#vn-a)" transform="translate(80)scale(.9375)">
                                    <path fill="#da251d" d="M-128 0h768v512h-768z" />
                                    <path fill="#ff0" d="M349.6 381 260 314.3l-89 67.3L204 272l-89-67.7 110.1-1 34.2-109.4L294 203l110.1.1-88.5 68.4 33.9 109.6z" />
                                </g>
                            </svg>
                        }
                    </Avatar>
                </Tooltip>
            </Box>
        </>
    );
};
