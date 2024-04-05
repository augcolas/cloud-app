import Head from 'next/head';

import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';
import {white} from "next/dist/lib/picocolors";
import {Container} from "@mui/material";

const Swagger = () => {

    return (
        <Container style={{backgroundColor:"#ffffff"}}>
            <Head>
                <title>BrowserStack Demo API</title>
                <meta name="description" content="BrowserStack Demo API Swagger" />
                <link rel="icon" href="../public/favicon.ico" />
            </Head>
            <SwaggerUI url="/api/doc" />
        </Container>
    );
};

export default Swagger;