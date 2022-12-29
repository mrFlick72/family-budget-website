import React from "react"
import {AppBar, Box, Button, Drawer, IconButton, List, Toolbar, Typography, useTheme} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';


const Menu = ({links, messages, children}) => {
    console.log(children)
    let theme = useTheme()
    const [openDrawer, setOpenDrawer] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpenDrawer(open)
    };

    return <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
            <Toolbar>
                <IconButton
                    onClick={() => setOpenDrawer(!openDrawer)}
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{mr: 2}}>
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    <a href={links.home} style={{
                        "text-decoration": "none",
                        "color": theme.palette.primary.contrastText
                    }}>{messages.title}</a>
                </Typography>

                {children &&
                    <Drawer
                        open={openDrawer}
                        onClose={toggleDrawer(false)}>
                        <Box
                            role="presentation"
                            onClick={toggleDrawer(false)}
                            onKeyDown={toggleDrawer(false)}>
                            <List>
                                {children}
                            </List>
                        </Box>
                    </Drawer>
                }
                <form action={links.logOut} method="GET">
                    <Button color="inherit" type="submit">
                        {messages.logOutLabel} <LogoutIcon/>
                    </Button>
                </form>
            </Toolbar>
        </AppBar>
    </Box>


}

export default Menu