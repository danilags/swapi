import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import HomePage from './HomePage';
import PageDetails from './PageDetails';

const routes = [
  {
    exact:true,
    path:'/',
    component: HomePage
  },
  {
    exact:true,
    path:'/myhero/:id',
    component: PageDetails
  },
];

const AppRoute = () => (
  <Router>
    <div>
			{routes.map((route, i) => (
				<Route key={i} {...route}/>
			))}
		</div>
  </Router>
);


export default AppRoute;
