import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import HomePage from './HomePage';
import DetailsPage from './DetailsPage';

const routes = [
  {
    exact:true,
    path:'/',
    component: HomePage
  },
  {
    exact:true,
    path:'/myhero/:id',
    component: DetailsPage  
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
