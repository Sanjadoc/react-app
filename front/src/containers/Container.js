import "./Container.scss";

import React, { useCallback, useEffect } from "react";

import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Content from "../components/content/Content";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Typography from "@material-ui/core/Typography";
import useAuth from "./users/hooks/useAuth";

function Container() {
  	const { user, refreshToken, refresh } = useAuth();

	const { logout } = useAuth();
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

	if (!user && refreshToken) {
		return (
			<div className="re-login">
				<Card variant="outlined">
					<CardContent>
						<Typography color="textPrimary" gutterBottom>
							<b>Please re-login</b>
						</Typography>
					</CardContent>
					<CardActions className="re-login__btn">
						<Button
							variant="contained"
							color="primary"
							size="large"
							onClick={handleLogout}
						>
							Re-login
						</Button>
					</CardActions>
				</Card>
			</div>
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
