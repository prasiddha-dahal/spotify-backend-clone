import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Home from "./pages/Home"
import ArtistDashboard from "./pages/ArtistDashboard"
import ProtectedRoute from "./components/ProtectedRoute"
function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/artist-dashboard' element={
                    <ProtectedRoute allowedRole="artist">
                        <ArtistDashboard />
                    </ProtectedRoute>
                } />

            </Routes>
        </BrowserRouter>


    )
}

export default App
