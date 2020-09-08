import React from 'react'
import Document, { Html, Head, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document'

class AppDocument extends Document {
  public static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  public render(): JSX.Element {
    return (
      <Html lang='en'>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default AppDocument
