import Navbar from "./components/navbar.component";
import { Routes, Route } from "react-router-dom";
import UserAuthFormPage from "./pages/userAuthForm.page";
import { createContext, useEffect, useState } from "react";
import { lookInSession } from "./common/session";

export const UserContext = createContext({});

const App = () => {

    const [userAuth, setUserAuth] = useState({});

    useEffect(() => {
        let userInSession = lookInSession("user");
        userInSession ? setUserAuth(JSON.parse(userInSession)) : setUserAuth({access_token: null});
    },[])

    return (
        <UserContext.Provider value={{userAuth, setUserAuth}}>
            <Routes>
              <Route path="/" element={<Navbar />}>
                <Route path="signin" element={<UserAuthFormPage type="signin" />} />
                <Route path="signup" element={<UserAuthFormPage type="signup" />}/>
              </Route>
            </Routes>
        </UserContext.Provider>
    )
}

export default App;