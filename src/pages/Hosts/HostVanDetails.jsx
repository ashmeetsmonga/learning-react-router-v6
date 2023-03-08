import React, { Suspense } from "react";
import { useParams, Link, Outlet, NavLink, defer, useLoaderData, Await } from "react-router-dom";
import { getHostVans } from "../../api";

const activeStyles = {
	fontWeight: "bold",
	textDecoration: "underline",
	color: "#161616",
};

export const loader = ({ params }) => {
	const id = params.id;
	return defer({ hostVanDetails: getHostVans(id) });
};

export default function HostVanDetail() {
	const { id } = useParams();
	const [currentVan, setCurrentVan] = React.useState(null);

	const loaderPromise = useLoaderData();

	return (
		<section>
			<Link to='..' relative='path' className='back-button'>
				&larr; <span>Back to all vans</span>
			</Link>
			<Suspense fallback={<h2>Loading...</h2>}>
				<Await resolve={loaderPromise.hostVanDetails}>
					{(currentVan) => (
						<div className='host-van-detail-layout-container'>
							<div className='host-van-detail'>
								<img src={currentVan.imageUrl} />
								<div className='host-van-detail-info-text'>
									<i className={`van-type van-type-${currentVan.type}`}>{currentVan.type}</i>
									<h3>{currentVan.name}</h3>
									<h4>${currentVan.price}/day</h4>
								</div>
							</div>

							<nav className='host-van-detail-nav'>
								<NavLink style={({ isActive }) => (isActive ? activeStyles : null)} end to='.'>
									Details
								</NavLink>
								<NavLink style={({ isActive }) => (isActive ? activeStyles : null)} to='pricing'>
									Pricing
								</NavLink>
								<NavLink style={({ isActive }) => (isActive ? activeStyles : null)} to='photos'>
									Photos
								</NavLink>
							</nav>

							<Outlet context={{ currentVan }} />
						</div>
					)}
				</Await>
			</Suspense>
		</section>
	);
}
