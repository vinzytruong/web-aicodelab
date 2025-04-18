import { Account } from "@toolpad/core";
import { useConfig } from "../hooks/useConfig";
import { Logout } from "@mui/icons-material";

export function CsAccount() {
    const { borderRadius } = useConfig()
    return (
        <Account
            slotProps={{
                signInButton: {
                    color: 'success',
                },
                signOutButton: {
                    color: 'success',
                    startIcon: <Logout />,
                },
                preview: {
                    variant: 'condensed',
                    slotProps: {
                        avatarIconButton: {
                            sx: {
                                p: 0,
                                width: '100%',
                                margin: '0',
                            },
                        },
                        avatar: {
                            variant: 'rounded',
                            sx: { p: 0, borderRadius: `${borderRadius}px` }
                        },
                    },
                },
            }}
        />
    );
}