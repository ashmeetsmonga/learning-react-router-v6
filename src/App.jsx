import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans from "./pages/Vans/Vans";
import VanDetails from "./pages/Vans/VanDetails";
import Layout from "./components/Layout";
import Dashboard from "./pages/Hosts/Dashboard";
import Income from "./pages/Hosts/Income";
import Reviews from "./pages/Hosts/Reviews";

function App() {
	return (
		<>
			<Routes>
				<Route element={<Layout />}>
					<Route path='/' element={<Home />} />
					<Route path='/about' element={<About />} />
					<Route path='/vans' element={<Vans />} />
					<Route path='/vans/:id' element={<VanDetails />} />
					<Route path='/host' element={<Dashboard />} />
					<Route path='/host/income' element={<Income />} />
					<Route path='/host/reviews' element={<Reviews />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
