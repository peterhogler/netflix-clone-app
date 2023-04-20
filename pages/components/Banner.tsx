import { useRef, useState } from "react";
import { Movie } from "@/typings";
import Image from "next/image";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import DetailsModal from "./DetailsModal";

interface BannerProps {
    title: string;
    movies: Movie[] | [];
}

const Banner: React.FC<BannerProps> = ({ title, movies = [] }) => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

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

    const handleModalState = (movieId: number) => {
        setSelectedMovieId(movieId);
        setShowModal(true);
    };

    return (
        <div className="px-5 md:px-20 mb-7 md:mb-14">
            <div className="group flex items-center gap-8 text-xl md:text-4xl font-bold py-5">
                {title}
                <span className="text-base underline underline-offset-4 opacity-0 duration-300 ease group-hover:opacity-100">
                    Explore more
                </span>
            </div>
            <div className="relative">
                <div className="h-full grid place-items-center bg-gradient-to-l from-transparent to-black/75 absolute top-1/2 transform -translate-y-1/2 left-0 z-10 ">
                    <button onClick={handlePrevButton}>
                        <HiChevronLeft size={50} />
                    </button>
                </div>
                <div className="h-full grid place-items-center bg-gradient-to-r from-transparent to-black/75 absolute top-1/2 transform -translate-y-1/2 right-0 z-10 py-2">
                    <button onClick={handleNextButton}>
                        <HiChevronRight size={50} />
                    </button>
                </div>
                <div
                    className="flex gap-4 overflow-auto relative scrollbar-hide touch-pan-x py-2"
                    ref={containerRef}>
                    {movies.map((movie) => {
                        return (
                            <>
                                <Image
                                    key={movie.id}
                                    className="w-max h-[250px] md:h-[350px] rounded cursor-pointer duration-200 border border-transparent  hover:border-white shadow"
                                    src={`${imageBaseUrl}${movie?.poster_path}`}
                                    alt={movie?.original_title as string}
                                    width={400}
                                    height={400}
                                    onClick={() => handleModalState(movie.id)}
                                    loading="lazy"
                                />
                                {showModal && selectedMovieId === movie.id ? (
                                    <DetailsModal
                                        movie={movie}
                                        onModalClose={() => setShowModal(false)}
                                    />
                                ) : null}
                            </>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Banner;
