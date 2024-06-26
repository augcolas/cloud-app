import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import {Container} from "@mui/material";

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Container sx={{backgroundColor:'#ffffff'}}>
            <SwaggerUI spec={spec} />
        </Container>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const spec = createSwaggerSpec({
        openApiVersion: '3.0.0',
        title: 'BrowserStack Demo API',
        version: '1.0.0',
        apiFolder: 'pages/api',
    });

    return {
        props: {
            spec,
        },
    };
};

export default ApiDoc;