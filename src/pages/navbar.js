import Link from 'next/link';
import { AppBar, Toolbar, Typography, Button  } from "@mui/material";


function NavBar() {

  return (
    <div>
        <AppBar position="static">
                <Toolbar sx={{backgroundColor: '#008080'}}>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Next.Js App
                    </Typography>
                    <Button color="inherit">
                        <Link href="/" passHref style={{color: 'white'}}>
                            Home
                        </Link>  
                    </Button>
                    <Button color="inherit">
                        <Link href="/dashboard" passHref style={{color: 'white'}}>
                            Dashboard
                        </Link>  
                    </Button>
                </Toolbar>
        </AppBar>
    </div>
  );
}

export default NavBar;
