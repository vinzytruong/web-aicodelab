import { AppProvider, Navigation, type Session } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { useDemoRouter } from '@toolpad/core/internal';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { CsAccount } from './Account';
import CsSidebarFooter from './SlidebarFooter';
import { CsToolbarActions } from './ToolbarAction';
import { SLIDEBAR_WIDTH } from '../contants';

interface DemoProps {
    window?: () => Window;
    navigation: Navigation
}

export function CsDashboardLayout(props: DemoProps) {
    const { window } = props;
    const theme = useTheme();
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const [session, setSession] = useState<Session | null>({
        user: {
            name: 'Truong Phuc Vinh',
            email: 'vinhtruong.dev@gmail.com',
            image: 'https://avatars.githubusercontent.com/u/19550456',
        },
    });

    const authentication = useMemo(() => {
        return {
            signIn: () => {
                setSession({
                    user: {
                        name: 'Truong Phuc Vinh',
                        email: 'vinhtruong.dev@gmail.com',
                        image: 'https://avatars.githubusercontent.com/u/19550456',
                    },
                });
            },
            signOut: () => {
                setSession(null);
            },
        };
    }, []);

    const router = useDemoRouter('/dashboard');

    const demoWindow = window !== undefined ? window() : undefined;
    useEffect(() => {
        navigate(router.pathname)
    }, [router.pathname]);

    return (
        <AppProvider
            session={session}
            authentication={authentication}
            navigation={props?.navigation}
            router={router}
            theme={theme}
            window={demoWindow}
            branding={{
                logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
                title: 'MUI',
                homeUrl: '/toolpad/core/introduction',
            }}
        >
            <DashboardLayout
                // hideNavigation={pathname == "/dashboard"} 
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
                    background: theme.palette.background.default
                }}
                >
                    <Outlet />
                </Box>
            </DashboardLayout>
        </AppProvider>
    );
}

export const CsBlankLayout = () => (
    <Outlet />
);