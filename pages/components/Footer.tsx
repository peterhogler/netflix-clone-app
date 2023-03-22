import Image from "next/image";

const Footer = () => {
    return (
        <footer className=" flex items-center  bg-black/90">
            <div className="flex w-full justify-between items-center px-5 md:px-20 py-4">
                <span>
                    Peter's <span className="text-red-600">Netflix</span> - Personal Project
                </span>
                <Image className="h-full w-44" src="/tmdb.svg" alt="tmdb logo" width={20} height={20} />
            </div>
        </footer>
    );
};

export default Footer;
