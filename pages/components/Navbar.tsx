import { useState, useEffect } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { HiSearch, HiOutlineBell, HiChevronDown, HiMenu } from "react-icons/hi";

const Navbar: NextPage = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [searchFocus, setSearchFocus] = useState<boolean>(false);
    const [menuIsActive, setMenuIsActive] = useState<boolean>(false);

    const handleMenuToggle = () => {
        setMenuIsActive(!menuIsActive);
    };

    useEffect(() => {
        const handleWindowScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleWindowScroll);

        return () => {
            window.removeEventListener("scroll", handleWindowScroll);
        };
    }, []);
    return (
        <header className={`fixed w-full z-20 `}>
            <nav
                className={`flex items-center py-10 md:py-5 px-5 md:px-20 duration-700 ease gap-4 xl:hover:bg-black/95 ${
                    isScrolled ? "bg-black/95" : "bg-transparent"
                }`}>
                <div>
                    <Image src="/logo.png" alt="netflix logo" height={80} width={80} />
                </div>
                <ul
                    className={`absolute top-20 right-4 md:right-20 bg-black  p-4  xl:border-none  text-right overflow-hidden xl:static xl:hidden   duration-300 ${
                        menuIsActive ? "h-[180%] md:h-[290%] p-4" : "p-0 h-[0%]"
                    }`}>
                    <li className="border-b xl:border-b-0 border-b-neutral-500 py-1">Home</li>
                    <li className="border-b xl:border-b-0 border-b-neutral-500 py-1">Series</li>
                    <li className="border-b xl:border-b-0 border-b-neutral-500 py-1">Movies</li>
                    <li className="border-b xl:border-b-0 border-b-neutral-500 py-1">New and popular</li>
                    <li className="border-b xl:border-b-0 border-b-neutral-500 py-1">My list</li>
                </ul>
                <ul className="hidden xl:flex gap-6 ml-12 ">
                    <li>Home</li>
                    <li>Series</li>
                    <li>Movies</li>
                    <li>New and popular</li>
                    <li>My list</li>
                </ul>
                <div className="flex items-center gap-2 ml-auto text-2xl">
                    <div
                        className={`group flex gap-2 border items-center px-2  ${
                            searchFocus ? "bg-black  border-white" : "border-transparent"
                        }`}>
                        <input
                            className={`py-1 text-sm  bg-transparent outline-none duration-700 ease-in-out ${
                                searchFocus ? "visible indent-2 bg-black w-[100%]" : "invisible w-[0%]"
                            }`}
                            type="text"
                            placeholder="Enter movie"
                        />

                        <HiSearch
                            className="ml-auto cursor-pointer"
                            onClick={() => setSearchFocus(!searchFocus)}
                        />
                    </div>

                    <div className="hidden md:inline-flex items-center gap-4">
                        <HiOutlineBell />
                        <span className="text-base">Peter's Netflix</span>
                        <div className="hidden h-full  md:inline-flex items-center gap-1">
                            <Image
                                className="rounded"
                                src="/default-green.png"
                                alt="profile picture"
                                height={16}
                                width={16}
                            />
                            <HiChevronDown size={30} />
                        </div>
                    </div>
                    <button className="xl:hidden order-1">
                        <HiMenu size={30} onClick={handleMenuToggle} />
                    </button>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
