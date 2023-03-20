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
                className={`flex items-center py-4 px-20 duration-700 ease ${
                    isScrolled ? "bg-black/95" : "bg-transparent"
                }`}>
                <div>
                    <Image src="/logo.png" alt="netflix logo" height={85} width={85} />
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
                        className={`group flex gap-2 items-center px-2  ${
                            searchFocus ? "bg-black border border-white" : ""
                        }`}>
                        <input
                            className={`py-1 text-sm  bg-transparent focus:outline-none duration-700 ease-in-out ${
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
                    <HiOutlineBell />
                    <span className="text-base">Guest</span>
                    <div className="inline-flex items-center gap-1">
                        <Image
                            className="rounded"
                            src="/default-green.png"
                            alt="profile picture"
                            height={25}
                            width={25}
                        />
                        <HiChevronDown />
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
