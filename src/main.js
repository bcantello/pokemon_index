import React from "react";
import {Route, Switch, Redirect} from 'react-router';
import Home from "./Pages/home";

export default function Main() {
	return (
		<Switch>
			<Route exact path={'/'} component={Home}/>
		</Switch>
	);
};
