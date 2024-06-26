import {Box, Container, Typography } from "@mui/material";
import NavBar from "./navbar";


export default function Home() {

  return (
    <div>
      <NavBar />
        <Box sx={{display: 'flex' , justifyContent: 'center' , alignItems: 'center'}}>
          <Typography variant="h4" component='div' sx={{mt: 4}}>
            Welcome to Hy-Vee
          </Typography>
          </Box>
          <Box sx={{display: 'flex' , justifyContent: 'center' , alignItems: 'center'}}>
          <Typography variant="body1" component='div' sx={{mt: 2}}>
            Click On the Tab from Navigation Bar
          </Typography>
        </Box>  
    </div>
  );
}
