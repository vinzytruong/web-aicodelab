import { AppProvider, type Session } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import { CsAccount } from './Account';
import CsSidebarFooter from './SlidebarFooter';
import { CsToolbarActions } from './ToolbarAction';
import { SLIDEBAR_WIDTH } from '../contants';
import { useKeycloak } from '@react-keycloak/web';

interface DemoProps {
    //   window?: () => Window;
    navigation: any;
}
interface MyTokenParsed {
    name?: string;
    email?: string;
    picture?: string;
}
export function DemoPageContent() {
    const location = useLocation();

    return (

        <Outlet key={location.pathname} />

    );
}
export function CsDashboardLayout(props: DemoProps) {
    const { keycloak } = useKeycloak();
    const theme = useTheme();
    const navigate = useNavigate();
    const router = useDemoRouter('/dashboard');

    const [session, setSession] = useState<Session | null>({
        user: {
            name: (keycloak.tokenParsed as MyTokenParsed)?.name ?? 'Guest',
            email: (keycloak.tokenParsed as MyTokenParsed)?.email ?? '',
            image: (keycloak.tokenParsed as MyTokenParsed)?.picture ?? '',
        }
    });

    useEffect(() => {
        const parsed = keycloak.tokenParsed as MyTokenParsed | undefined;

        setSession({
            user: {
                name: parsed?.name ?? 'Guest',
                email: parsed?.email ?? '',
                image: parsed?.picture ?? '',
            },
        });
    }, [keycloak.tokenParsed]);

    const authentication = useMemo(() => ({
        signIn: () => {
            const parsed = keycloak.tokenParsed as MyTokenParsed | undefined;

            setSession({
                user: {
                    name: parsed?.name ?? 'Guest',
                    email: parsed?.email ?? '',
                    image: parsed?.picture ?? '',
                },
            });
        },
        signOut: () => {
            keycloak.logout();
            setSession(null);
        },
    }), [keycloak, setSession]);

    // Đồng bộ pathname từ toolpad router → react-router
    useEffect(() => {
        if (router.pathname !== window?.location.pathname) {
            navigate(router.pathname);
        }
    }, [router.pathname, navigate]);

    return (
        <AppProvider
            session={session}
            authentication={authentication}
            navigation={props.navigation}
            router={router}
            theme={theme}
            //   window={demoWindow}
            branding={{
                logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
                title: 'MUI',
                homeUrl: '/toolpad/core/introduction',
            }}
        >
            <DashboardLayout
                sidebarExpandedWidth={SLIDEBAR_WIDTH}
                slots={{
                    toolbarAccount: CsAccount,
                    sidebarFooter: CsSidebarFooter,
                    toolbarActions: CsToolbarActions,
                }}
            >
                <Box sx={{
                    p: 2,
                    flex: 1,
                    background: theme.palette.background.default,
                }}>
                    <Outlet />
                </Box>
            </DashboardLayout>
        </AppProvider>
    );
}

export const CsBlankLayout = () => <Outlet />;
