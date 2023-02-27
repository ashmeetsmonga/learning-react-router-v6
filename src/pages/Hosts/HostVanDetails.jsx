import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const HostVanDetails = () => {
	return (
		<div>
			<div>UI Portion</div>
			<nav className='host-nav'>
				<NavLink style={({ isActive }) => (isActive ? activeStyles : null)} end to='/host/vans/:id'>
					Details
				</NavLink>
				<NavLink
					style={({ isActive }) => (isActive ? activeStyles : null)}
					to='/host/vans/:id/pricing'
				>
					Pricing
				</NavLink>
				<NavLink
					style={({ isActive }) => (isActive ? activeStyles : null)}
					to='/host/vans/:id/photos'
				>
					Photos
				</NavLink>
			</nav>
			<Outlet />
		</div>
	);
};

export default HostVanDetails;
