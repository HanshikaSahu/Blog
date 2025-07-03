import InputComponent from "../components/input.component";
import GoogleIcon from "../imgs/google.png";
import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";

const UserAuthFormPage = ({type}) => {
  return(
    <AnimationWrapper key={type}>
       <section className="h-cover flex justify-center items-center">
       <form className="w-[80%] max-w-400px">
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