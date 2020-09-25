import React, { StrictMode } from 'react';
import App from 'next/app';
import Router from 'next/router';

import { ReactQueryDevtools } from 'react-query-devtools';
import 'normalize.css';

import '../styles/globals.scss'
import Layout from '../src/components/Layout/layout';
import config from 'config';
import { AuthContext } from 'contexts/auth';
import { userInfo } from 'os';

interface IAppState {
  loggedIn: boolean;
  user: any | null;
}

class Root extends App<{}, IAppState> {

  state = {
    loggedIn: false,
    user: null,
    accessToken: '',
  }

  public componentDidMount() {
    const storedKey = localStorage.getItem(config.storageKeys.auth);
    
    if (storedKey) {
      this.setState({
        loggedIn: true,
        user: JSON.parse(storedKey),
        accessToken: JSON.parse(storedKey).accessToken,
      });
    } else {
      // If the user is not logged in and is in a dashboard page, redirect the user to login
      const { pathname } = window.location;
      if (pathname.startsWith('/app')) {
        Router.push(`/auth/login?to=${encodeURIComponent(pathname)}`);
      }
    };
  };

    /**
   * logoutUser
   */
  public logoutUser() {
    if (!this.state.loggedIn) return;

    this.setState({
      loggedIn: false,
      user: null,
      accessToken: '',
    }, () => this.postLogoutAction());
  };

  public postLogoutAction() {
    const storedKey = localStorage.getItem(config.storageKeys.auth);

    if (storedKey) {
      localStorage.removeItem(config.storageKeys.auth);
    }
    Router.push('/auth/login');
  };

  /**
   * updateUser
   */
  public updateUser(userData: any) {
    const loggedIn = Object.keys(userData).length > 0;    
    this.setState({
      loggedIn,
      user: {
        ...userData,
      },
      accessToken: userData.accessToken
    }, () => {      
      if (this.state.loggedIn) {
        localStorage.setItem(config.storageKeys.auth, JSON.stringify(this.state.user));
      } else {
        this.postLogoutAction();
      }
    });
  }


  public render() {
    const { Component, pageProps, router } = this.props;

    const layoutProps = pageProps.layout || {};
    layoutProps.showDashboard = router.asPath && router.asPath.includes('/app/');
    return (
      <StrictMode>
          <AuthContext.Provider value={{
          loggedIn: this.state.loggedIn,
          logoutUser: () => this.logoutUser(),
          updateUser: (userDetails: any) => this.updateUser(userDetails),
          user: this.state.user,
          accessToken: this.state.accessToken,
        }}
        >
        <Layout {...layoutProps}>
          <Component
            {...pageProps}
            key={router.route}
          />
        </Layout>
        </AuthContext.Provider>
        {/* {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen />} */}
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
