import InputComponent from "../components/input.component";
import GoogleIcon from "../imgs/google.png";
import { Link, Navigate } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { useContext, useRef } from "react";
import {Toaster, toast} from "react-hot-toast";
import axios from "axios";
import { storeInSession } from "../common/session";
import { UserContext } from "../App";

const UserAuthFormPage = ({type}) => {

  const authForm = useRef();

  let {userAuth: {access_token}, setUserAuth} = useContext(UserContext);

  const userAuthThroughServer = (serverRoute, FormDataObj) => {
    axios.post(import.meta.env.VITE_SERVER_DOMAIN + serverRoute, FormDataObj)
    .then(({data}) => {
      storeInSession("user", JSON.stringify({data}));
      setUserAuth({data});
    })
    .catch(({response}) => {
      toast.error(response.data.error)
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    let serverRoute = type == "signin" ? "/signin" : "/signup";

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
    let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

    let form = new FormData(authForm.current);
    let FormDataObj = {};

    for(let [key,value] of form.entries()){
      FormDataObj[key] = value;
    }

    let {fullname, email, password} = FormDataObj;

    if(fullname){
      if(!fullname || fullname.length < 3){
        return toast.error(
          "Fullname must be atleast 3 letters long"
        )
      }
    }

    if(!email.length){
      return toast.error(
        "Enter Email"
      )
    }

    if(!emailRegex.test(email)){
      return toast.error(
        "Invalid email"
      )
    }

    if(!passwordRegex.test(password)){
      return toast.error(
        "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters"
      )
    }

    userAuthThroughServer(serverRoute, FormDataObj);

  }

  return(
    access_token ? <Navigate to="/" /> :
    <AnimationWrapper key={type}>
       <section className="h-cover flex justify-center items-center">
        <Toaster />
       <form ref={authForm} onSubmit={handleSubmit} className="w-[80%] max-w-400px">
        <h1 className="font-gelasio text-center text-4xl">
          {type == "signin" ? "Welcome Back" : "Join Us Today"}
        </h1>
        {type=="signup" ? <InputComponent name="fullname" type="text" placeholder="Full name" icon="fi-rr-user" /> : ""}
        <InputComponent name="email" type="email" placeholder="Email" icon="fi-rr-envelope" />
        <InputComponent name="password" type="password" placeholder="Password" icon="fi-rr-key" />

        <button className="btn-dark mt-14 center" type="submit">{type}</button>

        <div className="relative w-full flex items-center gap-2 my-10 opacity-10 uppercase text-black font-bold">
          <hr className="w-1/2 border-black" />
          <p>Or</p>
          <hr className="w-1/2 border-black" />
        </div>

        <button className="btn-dark flex items-center w-[50%] gap-4 center">
          <img src={GoogleIcon} className="w-5" />
          Continue with Google
        </button>

        {type=="signin" ? <p className="mt-6 text-dark-grey text-center text-xl">Don't have an account
        <Link to="/signup" className="underline text-black text-xl ml-1">Join Us Today</Link></p> : 
        <p className="mt-6 text-dark-grey text-center text-xl">Already a member?
        <Link to="/signin" className="underline text-black text-xl ml-1">Sign In Here</Link></p>}
      </form>
      </section>
    </AnimationWrapper>
  )
}

export default UserAuthFormPage;