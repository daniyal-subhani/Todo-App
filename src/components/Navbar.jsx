import React from "react";

function Navbar() {
  return (
    <nav className="flex justify-around text-white bg-blue-700 mx-auto py-2 px-2">
      <div className="logo">
        <span className="font-bold text-xl mx-8 cursor-pointer">iTask</span>
      </div>
      <ul className="flex gap-9 mx-8">
        <li className="cursor-pointer transition-all hover:font-bold">Home</li>
        <li className="cursor-pointer transition-all hover:font-bold">Your Tasks</li>
      </ul>
    </nav>
  );
}

export default Navbar;
