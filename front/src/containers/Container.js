import "./Container.scss";

import { CircularProgress, Grid } from "@material-ui/core";
import React, { useCallback, useEffect } from "react";

import Content from "../components/content/Content";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { Redirect } from "react-router";
import useAuth from "../hooks/useAuth";

function Container() {
  	const { user, refreshToken, refresh, logout } = useAuth();

	const handleLogout = useCallback(
		(event) => {
			event.preventDefault();
			logout();
		},
		[logout]
	);

	useEffect(() => {
		if (!user && refreshToken) {
			refresh();
		}
	}, [user, refreshToken]);

	//loader
	if (!user && refreshToken) {
		return (
			<div className="loader">
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="center"
					>
					<p>Please wait. Loading data</p>
					<CircularProgress disableShrink />
				</Grid>
			</div>
		);
	}
	
	//re-login
	if (!user && refreshToken) {
		return (
			<Redirect to="/login" />
		);
	}

  return (
    <div className="container">
      <Header user={user} handleLogout={handleLogout} />
      <Content />
      <Footer />
    </div>
  );
}

export default Container;
