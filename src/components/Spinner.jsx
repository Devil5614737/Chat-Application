import { CircularProgress } from '@mui/material';

export const Spinner=({color,size})=>{
    return (
        <CircularProgress color={color} size={size}/>
    )
}