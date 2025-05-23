import { PaletteMode } from "@mui/material";

export interface ConfigProps {
    fontFamily: string;
    borderRadius: number;
    outlinedFilled: boolean;
    navType: PaletteMode;
    presetColor: string;
    locale: string;
    rtlLayout: boolean;
    container: boolean;
};
export interface CustomizationProps extends ConfigProps {
    fontFamily: string;
    borderRadius: number;
    outlinedFilled: boolean;
    navType: PaletteMode;
    presetColor: string;
    locale: string;
    rtlLayout: boolean;
    container: boolean;
    onChangeMenuType: (navType: PaletteMode) => void;
    onChangePresetColor: (presetColor: string) => void;
    onChangeLocale: (locale: string) => void;
    onChangeRTL: (rtlLayout: boolean) => void;
    onChangeContainer: () => void;
    onChangeFontFamily: (fontFamily: string) => void;
    onChangeBorderRadius: (event: Event, newValue: number | number[]) => void;
    onChangeOutlinedField: (outlinedFilled: boolean) => void;
};