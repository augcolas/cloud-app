import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

// Create a theme instance.
const theme = createTheme({
    palette: {
        highlight: {
            main: '#F5DD90',
        },
        warning: {
            main: '#F68E5F'
        },
        error: {
            main: '#F76C5E',
        },
        common: {
            dark: '#333333',
            grey: '#4F4F4F',
            light_grey: '#828282',
            light: '#F5F5F5',
        }
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    maxWidth: '100%',
                    marginLeft: '0',
                    marginRight: '0',
                },
            },
        },
    },
});

export default theme;