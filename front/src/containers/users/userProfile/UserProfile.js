import React from "react";
import UserProfile from "../../../components/content/userProfile/UserProfile";
import useAuth from "../hooks/useAuth";
import useRequireAuth from "../hooks/useRequireAuth";

function UserProfileContainer() {

	useRequireAuth(false);
	
	const { user } = useAuth();

	return <UserProfile user={user}/>;
}

export default UserProfileContainer;
