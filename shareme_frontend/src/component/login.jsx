import React from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
} from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import sharevvideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import jwt_decode from "jwt-decode";
import {client} from "../client"

const Login = () => {
  const navigate = useNavigate();

  const responseError= (error)=>{
    // console.log(error);
    return <h1>error accured : {error.message}</h1>
  }
  const responseGoogle= (response)=>{
    const credential= jwt_decode(response.credential)
    localStorage.setItem('user',JSON.stringify(credential))
    // console.log(credential)
    const {name, aud ,picture} = credential;
    // console.log(name);
    // console.log(aud);
    // console.log(picture)

    const doc = {
      _id: aud,
      _type: 'user',
      userName:name,
      image: picture
    }

    client.createIfNotExists(doc)
    .then(()=>{
      navigate('/',{replace:true})
    })
  }
  return (
    <div className="flex justify-start item-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={sharevvideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 left-0 right-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleOAuthProvider
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
            >
              <GoogleLogin
                 onSuccess={responseGoogle}
                 onError={responseError}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
