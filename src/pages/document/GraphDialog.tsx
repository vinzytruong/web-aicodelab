import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { GraphicEqSharp } from '@mui/icons-material';
import CustomizedDialogs from '../../components/Dialog';
import GraphDB from './GraphDB';

function GraphDialog() {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = () => {
        setOpen(true);
    };

    return (
        <div>
            <Button variant='contained' sx={{ position: "absolute", bottom: 20, right: 20 }} onClick={toggleDrawer} startIcon={<GraphicEqSharp />}>Minh họa đồ thị</Button>
            <CustomizedDialogs
                body={
                    // <1Box sx={{ width: "600px", height: "600px", background: "grey" }}>
                    <GraphDB />
                    // </Box>
                }
                handleOpen={setOpen}
                title='Minh họa đồ thị'
                open={open}
                size='xl'

            />
        </div>

    );
}

export default GraphDialog;