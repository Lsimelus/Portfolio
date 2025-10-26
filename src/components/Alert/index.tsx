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
  export type alertType = "success" | "warning" | "error";
  
  export interface AlertDivProps {
    severity: alertType,
    alertText: string,
    openAlert: boolean,
    parentCallback: Function
  }
  
  export const AlertDiv = (props: AlertDivProps) => {
    const {severity, alertText, parentCallback, openAlert } = props;
    const [open, setOpen] = React.useState(openAlert);
  
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      parentCallback(false)
      if (reason === 'clickaway') {
        return;
      }
      setOpen(false);
    };
  
    React.useEffect(() => {
      setOpen(openAlert)
    }, [openAlert])
  
  
    return (
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{
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