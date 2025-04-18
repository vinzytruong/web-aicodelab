import { LinearProgressProps } from '@mui/material/LinearProgress';
import { Suspense } from 'react';
import { CsLoader } from './Loader';

// ==============================|| LOADABLE - LAZY LOADING ||============================== //

interface LoaderProps extends LinearProgressProps { }

export const CsLoadable = (Component: any) => (props: LoaderProps) =>
(
    <Suspense fallback={<CsLoader />}>
        <Component {...props} />
    </Suspense>
);