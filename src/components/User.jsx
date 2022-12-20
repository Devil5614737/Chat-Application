import { Avatar, Box, Typography } from "@mui/material"

export const User=({user,handleSelectUser})=>{
    return (
        <Box
         onClick={()=>handleSelectUser(user._id)} sx={{ display: "flex", gap: "0 12px",alignItems:"center",cursor:'pointer',marginBottom:3,
         padding:2,
         ":hover":{
          background:"#F3F3F3"
        }}}>
        <Avatar
          sx={{ width: 50, height: 50 }}
          alt="Remy Sharp"
          src={user?.pic}
        />
        <Box flex={1}>
          <Typography fontWeight={600} component="p">
            {user?.name}
          </Typography>
        </Box>
      </Box>
    )
}