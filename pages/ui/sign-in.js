import * as React from 'react';
import { useState } from 'react';
import {
    Avatar, Button, TextField, FormControlLabel,
    Checkbox, Link, Grid, Box,
    Typography, Container, Snackbar
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useRouter } from "next/router";
import { useAuth } from '/src/contexts/auth.context';


export default function SignIn() {
    const { login } = useAuth();
    const router = useRouter();

    const [error, setError] = useState({open: false, message: ''});

    const handleClose = (event, reason = null) => {
        if (reason === 'clickaway') {
            return;
        }
        setError({open: false, message: ''});
    }

    const handleSubmit = async (event) => {

        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        try {
            try {
                setError({open: false, message: ''})
                await login({
                    email: formData.get('email'),
                    password: formData.get('password')
                });
            }catch (error){
                console.error(error);
                setError({open: true, message: error.message});
                return;
            }

            await router.push('/');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/ui/sign-up" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                    <Snackbar
                        open={error.open}
                        autoHideDuration={6000}
                        onClose={handleClose}
                        message={error.message}
                    />
                </Box>
            </Box>
        </Container>
    );
}