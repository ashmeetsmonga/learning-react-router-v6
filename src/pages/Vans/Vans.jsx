import React, { useState, Suspense } from "react";
import { Link, useSearchParams, useLoaderData, defer, Await } from "react-router-dom";
import { getVans } from "../../api";

export async function loader() {
	const getVansPromise = getVans();
	return defer({ vans: getVansPromise });
}

const Vans = () => {
	const dataPromise = useLoaderData();

	const [searchParams, setSearchParams] = useSearchParams();
	const typeFilter = searchParams.get("type");

	return (
		<div className='van-list-container'>
			<h1>Explore our van options</h1>
			<div className='van-list-filter-buttons'>
				<button
					onClick={() => setSearchParams({ type: "simple" })}
					className={`van-type simple ${typeFilter === "simple" && "selected"}`}
				>
					Simple
				</button>
				<button
					onClick={() => setSearchParams({ type: "luxury" })}
					className={`van-type luxury ${typeFilter === "luxury" && "selected"}`}
				>
					Luxury
				</button>
				<button
					onClick={() => setSearchParams({ type: "rugged" })}
					className={`van-type rugged ${typeFilter === "rugged" && "selected"}`}
				>
					Rugged
				</button>
				{typeFilter !== null && (
					<button onClick={() => setSearchParams({})} className='van-type clear-filters'>
						Clear filter
					</button>
				)}
			</div>
			<Suspense fallback={<h2>Loading...</h2>}>
				<Await resolve={dataPromise.vans}>
					{(vansData) => {
						console.log(vansData);
						const displayVans = typeFilter
							? vansData.filter((van) => van.type === typeFilter)
							: vansData;

						const vanElements = displayVans.map((van) => (
							<div key={van.id} className='van-tile'>
								<Link
									to={van.id}
									state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
								>
									<img src={van.imageUrl} />
									<div className='van-info'>
										<h3>{van.name}</h3>
										<p>
											${van.price}
											<span>/day</span>
										</p>
									</div>
									<i className={`van-type ${van.type} selected`}>{van.type}</i>
								</Link>
							</div>
						));
						return <div className='van-list'>{vanElements}</div>;
					}}
				</Await>
			</Suspense>
		</div>
	);
};

export default Vans;
