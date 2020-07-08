import React from "react";
import {Route, Switch, Redirect} from 'react-router';
import Home from "./Pages/home/home";

export default function Main() {
	return (
		<Switch>
			<Route exact path={'/'} component={Home}/>
			<Redirect to={'/'}/>
		</Switch>
	);
};
