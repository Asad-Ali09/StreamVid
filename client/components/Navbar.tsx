"use client";

import { Navlinks } from "@/constants";
import { useAuthContext } from "@/context/AuthProvider";
import { logout } from "@/features/auth";
import logoSrc from "@/public/icons/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { user, setUser } = useAuthContext();

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const closeDropdown = (e: MouseEvent) => {
      if (
        !dropdownRef.current?.contains(e.target as Node) &&
        !btnRef.current?.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener("mousedown", (e: MouseEvent) => {
      closeMenu(e);
      closeDropdown(e);
    });
    return () =>
      removeEventListener("mousedown", (e: MouseEvent) => {
        closeMenu(e);
        closeDropdown(e);
      });
  }, []);

  const handleLogout = async () => {
    setUser({ name: "", email: "", profilePicture: "", isLoggedIn: false });
    await logout();
  };

  return (
    <header className="absolute top-0 z-10 flex nav-p-x nav-p-y w-full items-centers bg-gradient-to-b from-[#00031C] to-90% to-[#00031C00] text-white">
      <div className="mr-4 flex items-center max-md:mr-auto cursor-pointer">
        <Image src={logoSrc} alt="Logo" width={200} height={40} />
      </div>
      <nav className="hidden items-center mr-auto ml-4 md:flex">
        <ul className="flex">
          {Navlinks.map((link) => (
            <li
              key={link.title}
              className="capitalize p-1 mr-2 lg:p-2 lg:mr-4 last:mr-0 font-medium hover:text-primary"
            >
              <Link href={link.href}>{link.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="relative flex items-center gap-4 lg:gap-8">
        {/* Search */}
        <button aria-label="search button">
          <FaSearch className="cursor-pointer text-xl" />
        </button>
        {/* Profile */}
        <button
          ref={btnRef}
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-label="profile button"
        >
          <BsPersonCircle className="cursor-pointer text-2xl" />
          {/* <Image
            src={user.profilePicture || ""}
            alt="profile"
            width={100}
            height={100}
          /> */}
        </button>
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="z-100 absolute top-8 -right-8 pl-4 pr-8 py-4 bg-navBgColor-50 border-primary border-2 rounded-lg "
          >
            {!user.isLoggedIn ? (
              <Link href={"/login"}>
                <button className="drop-down-btn">
                  <BsPersonCircle />
                  <p className="text-nowrap">Login</p>
                </button>
              </Link>
            ) : (
              <>
                <button className="drop-down-btn">
                  <BsPersonCircle />
                  <p className="text-nowrap">My Profile</p>
                </button>
                <button className="drop-down-btn" onClick={handleLogout}>
                  <MdOutlineLogout />
                  <p>Logout</p>
                </button>
              </>
            )}
          </div>
        )}
        <button
          aria-label="hamburger"
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <IoMdClose className="cursor-pointer text-2xl" />
          ) : (
            <GiHamburgerMenu className="cursor-pointer text-2xl" />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      <div
        ref={menuRef}
        className="absolute top-0 left-0 z-20 bg-[rgba(0,0,0,.9)] h-screen md:w-[50%] w-[70%] p-8 md:hidden transition-transform duration-500 ease-in-out"
        style={{ transform: isOpen ? "translateX(0)" : "translateX(-100%)" }}
      >
        <div className="flex items-center cursor-pointer mb-8">
          <Image src={logoSrc} alt="Logo" width={200} height={40} />
        </div>
        <nav className="md:hidden items-center  flex ">
          <ul className="flex flex-col w-full">
            {Navlinks.map((link) => (
              <li
                key={link.title}
                className="capitalize font-medium  hover:text-primary border-b py-2 border-white mb-6 w-full"
              >
                <Link href={link.href}>{link.title}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
