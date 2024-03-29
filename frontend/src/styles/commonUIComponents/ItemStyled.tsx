import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    borderRadius: '5px',
    margin: "5px",
    color: theme.palette.text.secondary,
    position: "relative",
    hidden: "hidden",
    display:'flex', justiyContent:'space-between', flexDirection:'column',
  }));
  
  