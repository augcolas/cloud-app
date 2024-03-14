import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ProTip from '/src/theme/mui-base-theme/ProTip';
import Link from '/src/theme/mui-base-theme/Link';
import Copyright from '/src/theme/mui-base-theme/Copyright';

export default function About() {
    return (
        <Container maxWidth="sm">
            <Box sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
                    Material UI - Next.js example
                </Typography>
                <Button variant="contained" component={Link} noLinkStyle href="/">
                    Go to the main page
                </Button>
                <ProTip />
                <Copyright />
            </Box>
        </Container>
    );
}