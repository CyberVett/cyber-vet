import React, { StrictMode } from "react";
import App from "next/app";
import Router from "next/router";

import { ReactQueryDevtools } from "react-query-devtools";
import "normalize.css";
import "react-day-picker/lib/style.css";
import 'react-html5-camera-photo/build/css/index.css';

import "../styles/globals.scss";
import "../styles/checkin.scss";
import Layout from "../src/components/Layout/layout";
import config from "config";
import { AuthContext } from "contexts/auth";

interface IAppState {
  loggedIn: boolean;
  user: any | null;
}

class Root extends App<{}, IAppState> {
  state = {
    accessToken: "",
    hospital: null,
    loggedIn: false,
    role: "",
    staff: null,
    user: null,
  };

  public componentDidMount() {
    const storedKey = localStorage.getItem(config.storageKeys.auth);

    if (storedKey) {
      this.setState({
        accessToken: JSON.parse(storedKey).accessToken,
        hospital: JSON.parse(storedKey).info.hospital,
        loggedIn: true,
        role: JSON.parse(storedKey).role,
        staff: JSON.parse(storedKey).info.staff,
        user: JSON.parse(storedKey),
      });
    } else {
      // If the user is not logged in and is in a dashboard page, redirect the user to login
      const { pathname } = window.location;
      if (pathname.startsWith("/app")) {
        Router.push(`/auth/login?to=${encodeURIComponent(pathname)}`);
      }
    }
  }

  /**
   * logoutUser
   */
  public logoutUser() {
    if (!this.state.loggedIn) return;

    this.setState(
      {
        accessToken: "",
        hospital: null,
        loggedIn: false,
        role: "",
        staff: null,
        user: null,
      },
      () => this.postLogoutAction()
    );
  }

  public postLogoutAction() {
    const storedKey = localStorage.getItem(config.storageKeys.auth);

    if (storedKey) {
      localStorage.removeItem(config.storageKeys.auth);
    }
    Router.push("/auth/login");
  }

  /**
   * updateUser
   */
  public updateUser(userData: any) {
    const loggedIn = Object.keys(userData).length > 0;
    this.setState(
      {
        accessToken: userData.accessToken,
        hospital: userData.info.hospital,
        loggedIn,
        role: userData.role,
        staff: userData.info.staff,
        user: {
          ...userData,
        },
      },
      () => {
        if (this.state.loggedIn) {
          localStorage.setItem(
            config.storageKeys.auth,
            JSON.stringify(this.state.user)
          );
        } else {
          this.postLogoutAction();
        }
      }
    );
  }

  public render() {
    const { Component, pageProps, router } = this.props;

    const layoutProps = pageProps.layout || {};
    layoutProps.showDashboard =
      router.asPath && router.asPath.includes("/app/");
    return (
      <StrictMode>
        <AuthContext.Provider
          value={{
            accessToken: this.state.accessToken,
            hospital: this.state.hospital,
            loggedIn: this.state.loggedIn,
            logoutUser: () => this.logoutUser(),
            role: this.state.role,
            staff: this.state.staff,
            updateUser: (userDetails: any) => this.updateUser(userDetails),
            user: this.state.user,
          }}
        >
          <Layout {...layoutProps}>
            <Component {...pageProps} key={router.route} />
          </Layout>
        </AuthContext.Provider>
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools initialIsOpen />
        )}
      </StrictMode>
    );
  }
}

Root.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default Root;
