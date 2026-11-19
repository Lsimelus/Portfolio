import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  export type alertType = "success" | "info" | "warning" | "error";
  
  export interface AlertDivProps {
    severity: alertType,
    alertText: string,
    openAlert: boolean,
    parentCallback: (open: boolean) => void
  }
  
  export const AlertDiv = (props: AlertDivProps) => {
    const {severity, alertText, parentCallback, openAlert } = props;

    // The parent owns whether it's open; closing (timeout, ×, or a click elsewhere) tells it.
    const handleClose = () => parentCallback(false);
  
  
    return (
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={openAlert} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{
          vertical: "top",
          horizontal: "right"
        }}>
          <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
            {alertText}
          </Alert>
        </Snackbar>
      </Stack>
    );
  }