import axios from "axios"
import { useEffect, useState } from "react";
import MyContext from './MyContext';
import Profile from "./Profile";
import Prods from "./Prods";
const App = () => {
    const SRVER = "http://127.0.0.1:8000/"
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [access, setaccess] = useState("")
    const [userName, setuserName] = useState("")
    const [staff, setstaff] = useState(false)
    const [email, setemail] = useState("")
    function parseJwt(token) {
        if (!token) return
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    useEffect(() => {
        if (access.length > 0) {
            setstaff(parseJwt(access).staffff)
            setuserName(parseJwt(access).username)
            console.log(parseJwt(access));
        }
    }, [access])

    const login = () => {
        axios.post(SRVER + "login/", { username, password }).then(res => setaccess(res.data.access))
        localStorage.setItem("access", access)
    }
    const register = () => {
        axios.post(SRVER + "register/", { username, password, email }).then(res => console.log(res.data))
    }

    return (
        <div className="App">
            <MyContext.Provider value={{ userName, setuserName }}>

                {userName && <h1>Welcome Mr.  {userName}</h1>}
                Waga
                User<input onChange={(e) => setusername(e.target.value)} />
                pwd<input onChange={(e) => setpassword(e.target.value)} />
                email<input onChange={(e) => setemail(e.target.value)} />
                <button onClick={() => login()}>Login</button>
                <button onClick={() => register()}>Register</button>
                <br />
                <h1>{access.length > 0 && (staff ? "staff" : "not staff")}</h1>
                <hr/>
                <Profile/>
                <Prods/>
            </MyContext.Provider>
        </div>
    );
}

export default App;
