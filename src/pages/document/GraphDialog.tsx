import * as React from 'react';
import Button from '@mui/material/Button';
import { GraphicEqSharp } from '@mui/icons-material';
import CustomizedDialogs from '../../components/Dialog';
import GraphDB from './GraphDB';
import { DocumentType } from '../../types/document';

interface GraphProps {
    documents: DocumentType[]
}
function GraphDialog({ documents }: GraphProps) {
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = () => {
        setOpen(true);
    };

    return (
        <div>
            <Button variant='contained' sx={{ position: "absolute", bottom: 20, right: 20 }} onClick={toggleDrawer} startIcon={<GraphicEqSharp />}>Minh họa đồ thị</Button>
            <CustomizedDialogs
                body={<GraphDB documents={documents} />}
                handleOpen={setOpen}
                title='Minh họa đồ thị'
                open={open}
                size='xl'

            />
        </div>

    );
}

export default GraphDialog;