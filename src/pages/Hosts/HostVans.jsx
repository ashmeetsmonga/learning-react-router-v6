import React, { Suspense } from "react";
import { Link, defer, useLoaderData, Await } from "react-router-dom";
import { getHostVans } from "../../api";

export async function loader() {
	return defer({ hostVans: getHostVans() });
}

export default function HostVans() {
	const loaderPromise = useLoaderData();

	return (
		<Suspense fallback={<h2>Loading...</h2>}>
			<Await resolve={loaderPromise.hostVans}>
				{(vans) => {
					const hostVansEls = vans.map((van) => (
						<Link to={`${van.id}`} key={van.id} className='host-van-link-wrapper'>
							<div className='host-van-single' key={van.id}>
								<img src={van.imageUrl} alt={`Photo of ${van.name}`} />
								<div className='host-van-info'>
									<h3>{van.name}</h3>
									<p>${van.price}/day</p>
								</div>
							</div>
						</Link>
					));

					return (
						<section>
							<h1 className='host-vans-title'>Your listed vans</h1>
							<div className='host-vans-list'>
								{vans.length > 0 ? <section>{hostVansEls}</section> : <h2>Loading...</h2>}
							</div>
						</section>
					);
				}}
			</Await>
		</Suspense>
	);
}
