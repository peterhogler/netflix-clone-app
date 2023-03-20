import { useRef } from "react";
import { Movie } from "@/typings";
import Image from "next/image";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface BannerProps {
    title: string;
    movies: Movie[];
}

const Banner: React.FC<BannerProps> = ({ title, movies }) => {
    const imageBaseUrl = "https://image.tmdb.org/t/p/original/";
    const containerRef = useRef<HTMLDivElement>(null);

    const handlePrevButton = () => {
        if (containerRef && containerRef.current) {
            const { scrollLeft, clientWidth } = containerRef.current;
            const nextScrollLeft = scrollLeft - clientWidth;
            containerRef.current.scrollTo({
                left: nextScrollLeft,
                behavior: "smooth",
            });
        }
    };

    const handleNextButton = () => {
        if (containerRef && containerRef.current) {
            const { scrollLeft, clientWidth } = containerRef.current;
            const nextScrollLeft = scrollLeft + clientWidth;
            containerRef.current.scrollTo({
                left: nextScrollLeft,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="px-20">
            <div className="group flex items-center gap-8 text-4xl font-bold py-5">
                {title}
                <span className="text-base underline underline-offset-4 opacity-0 duration-300 ease group-hover:opacity-100">
                    Explore more
                </span>
            </div>
            <div className="relative">
                <div className="h-full grid place-items-center bg-gradient-to-l from-transparent to-black/50 absolute top-1/2 transform -translate-y-1/2 left-0 z-10 ">
                    <button onClick={handlePrevButton}>
                        <HiChevronLeft size={50} />
                    </button>
                </div>
                <div className="h-full grid place-items-center bg-gradient-to-r from-transparent to-black/50 absolute top-1/2 transform -translate-y-1/2 right-0 z-10">
                    <button onClick={handleNextButton}>
                        <HiChevronRight size={50} />
                    </button>
                </div>
                <div
                    className="flex gap-4 mb-20 whitespace-nowrap overflow-auto relative scrollbar-hide"
                    ref={containerRef}>
                    {movies.map((movie) => {
                        return (
                            <>
                                <Image
                                    key={movie.id}
                                    className="w-max h-[350px] rounded"
                                    src={`${imageBaseUrl}${movie?.poster_path}`}
                                    alt={movie?.original_title as string}
                                    width={400}
                                    height={400}
                                />
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Banner;
