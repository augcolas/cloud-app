import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { AppCacheProvider } from '@mui/material-nextjs/v14-pagesRouter';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '/src/theme/theme';
import {AuthProvider} from '/src/contexts/auth.context';
import {Container} from "@mui/material";
export default function MyApp(props) {
    const { Component, pageProps } = props;
    return (
        <AuthProvider>
                <AppCacheProvider {...props}>
                    <Head>
                        <meta name="viewport" content="initial-scale=1, width=device-width" />
                    </Head>
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Container disableGutters style={{
                            display:'flex', justifyContent:'center',
                            minHeight:'100vh', maxWidth:'100vw'
                        }}>
                            <Container disableGutters style={{
                                minHeight:'100vh', width:'100vw'
                            }}>
                                <Component {...pageProps}/>
                            </Container>
                        </Container>
                    </ThemeProvider>
                </AppCacheProvider>
        </AuthProvider>
    );
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
};
