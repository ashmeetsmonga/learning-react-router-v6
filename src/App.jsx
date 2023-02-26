import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Vans from "./pages/Vans";
import VanDetails from "./pages/VanDetails";
import Layout from "./components/Layout";

function App() {
	return (
		<>
			<Routes>
				<Route element={<Layout />}>
					<Route path='/' element={<Home />} />
					<Route path='/about' element={<About />} />
					<Route path='/vans' element={<Vans />} />
					<Route path='/vans/:id' element={<VanDetails />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
