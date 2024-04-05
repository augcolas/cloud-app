import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const highlight = '#F5DD90';
const warning = '#F68E5F';
const error = '#F76C5E';
const dark = '#333333';
const grey = '#4F4F4F';
const light_grey = '#828282';
const light = '#F5F5F5';


// Create a theme instance.
const theme = createTheme({
    palette: {
        highlight: {
            main: highlight,
        },
        warning: {
            main: warning
        },
        error: {
            main: error,
        },
        common: {
            dark: dark,
            grey: grey,
            light_grey: light_grey,
            light: light,
        }
    },
    typography: {
        fontFamily: roboto.style.fontFamily,
    },
    components: {
        MuiContainer: {
            styleOverrides: {
                root: {
                    backgroundColor: dark,
                    maxWidth: '100%',
                    marginLeft: '0',
                    marginRight: '0',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    backgroundColor: dark,
                },
            },
        },
    },
});

export default theme;