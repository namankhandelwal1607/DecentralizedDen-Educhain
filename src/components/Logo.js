import React from "react";
import { Link } from "react-router-dom";
import logo from '../assets/Decentralized_Den-removebg-preview.png'

const Logo = () => {
  return (
    <Link
      to="/"
      className="
     absolute top-[1.5rem] left-[1.5rem] [text-decoration:none]
text-lg text-cyan flex items-center
     "
    >
      <img src={logo} alt="CryptoBucks" className="w-40 h-40 -m-16" />
      <i><span className="ml-6 text-xl font-serif">Decentralized Den</span></i>
    </Link>
  );
};

export default Logo;
