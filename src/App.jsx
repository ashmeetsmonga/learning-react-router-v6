import {
	Routes,
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans, { loader } from "./pages/Vans/Vans";
import HostVans from "./pages/Hosts/HostVans";
import VanDetails from "./pages/Vans/VanDetails";
import Layout from "./components/Layout";
import Dashboard from "./pages/Hosts/Dashboard";
import Income from "./pages/Hosts/Income";
import Reviews from "./pages/Hosts/Reviews";
import HostLayout from "./pages/Hosts/HostLayout";
import HostVanDetails from "./pages/Hosts/HostVanDetails";
import HostVanInfo from "./pages/Hosts/HostVanInfo";
import HostVanPricing from "./pages/Hosts/HostVanPricing";
import HostVanPhotos from "./pages/Hosts/HostVanPhotos";
import NotFound from "./pages/NotFound";
import Error from "./components/Error";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<Layout />}>
			<Route index element={<Home />} />
			<Route path='about' element={<About />} />
			<Route path='vans' element={<Vans />} loader={loader} errorElement={<Error />} />
			<Route path='vans/:id' element={<VanDetails />} />
			<Route path='host' element={<HostLayout />}>
				<Route index element={<Dashboard />} />
				<Route path='income' element={<Income />} />
				<Route path='vans' element={<HostVans />} />
				<Route path='vans/:id' element={<HostVanDetails />}>
					<Route index element={<HostVanInfo />} />
					<Route path='pricing' element={<HostVanPricing />} />
					<Route path='photos' element={<HostVanPhotos />} />
				</Route>
				<Route path='reviews' element={<Reviews />} />
			</Route>
			<Route path='*' element={<NotFound />} />
		</Route>
	)
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
