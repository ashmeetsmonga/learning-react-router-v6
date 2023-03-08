import {
	Routes,
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans, { loader as vansLoader } from "./pages/Vans/Vans";
import HostVans, { loader as hostVansLoader } from "./pages/Hosts/HostVans";
import VanDetails, { loader as vanDetailsLoader } from "./pages/Vans/VanDetails";
import Layout from "./components/Layout";
import Dashboard, { loader as dashboardLoader } from "./pages/Hosts/Dashboard";
import Income from "./pages/Hosts/Income";
import Reviews from "./pages/Hosts/Reviews";
import HostLayout from "./pages/Hosts/HostLayout";
import HostVanDetails, { loader as hostVanDetailsLoader } from "./pages/Hosts/HostVanDetails";
import HostVanInfo from "./pages/Hosts/HostVanInfo";
import HostVanPricing from "./pages/Hosts/HostVanPricing";
import HostVanPhotos from "./pages/Hosts/HostVanPhotos";
import NotFound from "./pages/NotFound";
import Error from "./components/Error";
import AuthRequired from "./components/AuthRequired";
import Login, { action as loginAction } from "./pages/Login";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path='/' element={<Layout />}>
			<Route index element={<Home />} />
			<Route path='about' element={<About />} />
			<Route path='login' element={<Login />} action={loginAction} />
			<Route path='vans' element={<Vans />} loader={vansLoader} errorElement={<Error />} />
			<Route
				path='vans/:id'
				element={<VanDetails />}
				loader={vanDetailsLoader}
				errorElement={<Error />}
			/>
			<Route element={<AuthRequired />}>
				<Route path='host' element={<HostLayout />}>
					<Route index element={<Dashboard />} loader={dashboardLoader} />
					<Route path='income' element={<Income />} />
					<Route
						path='vans'
						element={<HostVans />}
						loader={hostVansLoader}
						errorElement={<Error />}
					/>
					<Route
						path='vans/:id'
						element={<HostVanDetails />}
						loader={hostVanDetailsLoader}
						errorElement={<Error />}
					>
						<Route index element={<HostVanInfo />} />
						<Route path='pricing' element={<HostVanPricing />} />
						<Route path='photos' element={<HostVanPhotos />} />
					</Route>
					<Route path='reviews' element={<Reviews />} />
				</Route>
			</Route>
			<Route path='*' element={<NotFound />} />
		</Route>
	)
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
