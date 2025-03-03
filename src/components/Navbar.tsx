import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Link from "next/link";
import logo from "../../public/img/velobid-tranparent.png";

const Navbar = () => {
  return (
    <div className="navbar bg-three text-black shadow-md fixed top-0 z-50 px-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/leaderboard">Leaderboard</Link>
            </li>
          </ul>
        </div>
        <Link href="/" className="text-2xl font-bold">
          <Image src={logo} alt="logo" width={60} height={60} />
        </Link>
        <ul className="menu menu-horizontal px-2 text-lg font-semibold text-gray-50">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/leaderboard">Leaderboard</Link>
          </li>
          <li>
            <Link href="/documentation">Documentation</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-center hidden lg:flex">
        {/* <ul className="menu menu-horizontal px-1">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/leaderboard">Leaderboard</Link>
          </li>
        </ul> */}
      </div>
      <div className="navbar-end">
        {/* <a className="btn">Button</a> */}
        <ConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
