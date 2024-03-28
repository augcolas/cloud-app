import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';


const BurgerMenu = (props) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const theme = useTheme();
    const { user, logout } = props;
    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setIsDrawerOpen(open);
    };

    const list = () => (
        <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Typography sx={{ flexGrow: 1, textAlign: 'center', margin: 2 }}>
               Welcome {user ? user.firstName : "firstName" } !
            </Typography>
            <List>
                <ListItem button onClick={logout}>
                    <ListItemText primary="Log out" />
                </ListItem>
            </List>
            <Divider />
        </div>
    );

    return (
        <div style={{height:64}}>
            <AppBar style={{backgroundColor:theme.palette.common.dark}}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1}} color={"white"}>
                        CloudMovies
                    </Typography>
                    <IconButton
                        edge="end"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        style={{color: theme.palette.common.light}}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </div>
    );
}

export default BurgerMenu;
