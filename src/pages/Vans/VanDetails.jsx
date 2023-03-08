import React, { Suspense } from "react";
import { useParams, Link, useLocation, defer, Await, useLoaderData } from "react-router-dom";
import { getVans } from "../../api";

export const loader = ({ params }) => {
	const id = params.id;
	return defer({ vanDetails: getVans(id) });
};

export default function VanDetail() {
	const loaderPromise = useLoaderData();
	const params = useParams();
	const location = useLocation();
	const [van, setVan] = React.useState(null);

	const search = location.state?.search || "";
	const vansType = location.state?.type || "all";
	return (
		<div className='van-detail-container'>
			<Link to={`..${search}`} relative='path' className='back-button'>
				&larr; <span>Back to {vansType} vans</span>
			</Link>
			<Suspense fallback={<h2>Loading...</h2>}>
				<Await resolve={loaderPromise.vanDetails}>
					{(van) => {
						console.log(van);
						return (
							<div className='van-detail'>
								<img src={van.imageUrl} />
								<i className={`van-type ${van.type} selected`}>{van.type}</i>
								<h2>{van.name}</h2>
								<p className='van-price'>
									<span>${van.price}</span>/day
								</p>
								<p>{van.description}</p>
								<button className='link-button'>Rent this van</button>
							</div>
						);
					}}
				</Await>
			</Suspense>
		</div>
	);
}
