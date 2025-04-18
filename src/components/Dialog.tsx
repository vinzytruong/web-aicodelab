import * as React from 'react';
import { Slide } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import { Close } from '@mui/icons-material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

interface DialogProps {
  title: string,
  open: boolean,
  handleOpen: (e: any) => void,
  body: any,
  actions?: any,
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs',
  fullscreen?: boolean
}
export default function CustomizedDialogs({ size, title, open, handleOpen, body, actions, fullscreen }: DialogProps) {

  return (
    <React.Fragment>
      <BootstrapDialog
        fullScreen={fullscreen}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth={size}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => handleOpen(false)}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
        <DialogContent>
          {body}
        </DialogContent>
        <DialogActions>
          {actions}
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
