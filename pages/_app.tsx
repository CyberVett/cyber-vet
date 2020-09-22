import React, { StrictMode } from 'react';
import App from 'next/app';

import { ReactQueryDevtools } from 'react-query-devtools';
import 'normalize.css';

import '../styles/globals.scss'
import Layout from '../src/components/Layout/layout';

class Root extends App<{}, {}> {

  public render() {
    const { Component, pageProps, router } = this.props;

    const layoutProps = pageProps.layout || {};
    layoutProps.showDashboard = router.asPath && router.asPath.includes('/app/');
    return (
      <StrictMode>
        <Layout {...layoutProps}>
          <Component
            {...pageProps}
            key={router.route}
          />
        </Layout>
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen />}
      </StrictMode>
    );
  }
}

Root.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps }
}

export default Root
