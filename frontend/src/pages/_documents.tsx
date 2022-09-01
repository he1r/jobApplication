import React from "react";
import Document, { Head, Html, Main, NextScript } from "next/document";

class ProjectDocument extends Document {
    render() {
        return (
            <Html>
                <Head>
                    <meta charSet="utf-8" />
                    <meta
                        name="viewport"
                        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

ProjectDocument.getInitialProps = async ctx => {

    const firstRenderPage = ctx.renderPage;
    ctx.renderPage = () =>
        firstRenderPage({
            // eslint-disable-next-line react/display-name
            enhanceApp: App => props => <App {...props} />
        });

    const initialProps = await ProjectDocument.getInitialProps(ctx);

    return {
        ...initialProps,
    };
};

export default ProjectDocument;