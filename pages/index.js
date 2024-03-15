import * as React from 'react';
import { AppBar, Toolbar, Typography, Container, Grid, Card, CardActionArea, CardMedia, CardContent } from '@mui/material';
import BurgerMenu from '../src/components/burger.menu.component';

import { useAuth } from '../src/contexts/auth.context';

export default function Index() {

    const { user, logout } = useAuth();

    return (
        <div>
                <BurgerMenu user={user} logout={logout}/>
                <Container>

                </Container>
        </div>
    );
}