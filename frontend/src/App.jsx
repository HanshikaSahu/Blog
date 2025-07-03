import Navbar from "./components/navbar.component";
import { Routes, Route } from "react-router-dom";
import UserAuthFormPage from "./pages/userAuthForm.page";

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Navbar />}>
              <Route path="signin" element={<UserAuthFormPage type="signin" />} />
              <Route path="signup" element={<UserAuthFormPage type="signup" />}/>
            </Route>
        </Routes>
    )
}

export default App;