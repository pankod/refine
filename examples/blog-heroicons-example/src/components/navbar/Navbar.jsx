import React, { useState } from "react";
import TailzupLogo from "../icons/TailzupLogo";
import { Avatar } from "../icons/Avatar";
import { HamburgerIcon } from "../icons/HamburgerIcon";
import { SearchIcon } from "../icons/SearchIcon";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuHidden = !isMobileMenuOpen ? "hidden md:block" : "";
  return (
    <nav className="navbar">
      <div className="brand-wrapper">
        <a className="brand" href="/">
          <TailzupLogo color="orange" />
        </a>
      </div>
      <div
        className={`${menuHidden} border-t border-slate-500 text-amber-50 transition-all duration-1000 ease-in-out md:border-none`}
      >
        <div id="items" className="items-strip">
          <div id="left" className="items-left">
            <input
              className="text-input"
              type="email"
              placeholder="Find donald trump or something..."
            />
            <SearchIcon />
          </div>
          <div id="right">
            <ul className="items-list">
              <li className="nav-item md:order-last">
                <a href="/">
                  <Avatar />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Friends
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Messages
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className={
          "absolute right-4 top-3 rounded border border-orange-400 p-1 text-slate-500 hover:bg-orange-200 hover:text-slate-300 md:hidden"
        }
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <a href="/">
          <HamburgerIcon />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
