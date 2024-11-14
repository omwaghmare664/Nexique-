import React, {useState} from "react";
import Form from "../components/Form";
import AllUsers from "../components/AllUsers";

function Home() {
  
  return (
    <div className="home_admin w-full min-h-screen flex">
      <div className="left w-[70%] py-10  bg-[#f1f1f1] border-r-2 border-slate-300">
        <Form />
      </div>
      <div className="right w-[30%] h-full bg-white">
          <AllUsers />
      </div>
    </div>
  );
}

export default Home;
