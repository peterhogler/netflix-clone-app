import { useState, useEffect } from "react";
import { NextPage } from "next";
import Image from "next/image";
import { HiSearch, HiOutlineBell, HiChevronDown } from "react-icons/hi";

const Navbar: NextPage = () => {
    const [isScrolled, setIsScrolled] = useState<boolean>(false);
    const [searchFocus, setSearchFocus] = useState<boolean>(false);

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
                className={`flex items-center py-4 px-5 md:px-20 duration-700 ease gap-4 ${
                    isScrolled ? "bg-black/95" : "bg-transparent"
                }`}>
                <div>
                    <Image src="/logo.png" alt="netflix logo" height={80} width={80} />
                </div>
                <ul className="hidden xl:flex gap-6 ml-12 ">
                    <li>Home</li>
                    <li>Series</li>
                    <li>Movies</li>
                    <li>New and popular</li>
                    <li>My list</li>
                </ul>
                <div className="flex items-center gap-4 ml-auto text-2xl">
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
                    <div className="hidden md:inline-flex gap-2">
                        <HiOutlineBell />
                        <span className="text-base">Peter's Netflix</span>
                    </div>
                    <div className="h-full w-[3.1rem] inline-flex items-center gap-1">
                        <Image
                            className="rounded"
                            src="/default-green.png"
                            alt="profile picture"
                            height={16}
                            width={16}
                        />
                        <HiChevronDown />
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
