import { Movie } from "@/typings";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiPlay, HiOutlineInformationCircle } from "react-icons/hi";
import DetailsModal from "./DetailsModal";

interface HeroProps {
    movies: Movie[];
}

const Hero: React.FC<HeroProps> = ({ movies }) => {
    const [movie, setMovie] = useState<Movie | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);
    const imageBaseUrl = "https://image.tmdb.org/t/p/original/";

    const generateRandomMovie = () => {
        // const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        const selectedMovie = movies[3];
        // return randomMovie;
        return selectedMovie;
    };

    const handleModalState = () => {
        setShowModal(!showModal);
    };

    useEffect(() => {
        setMovie(generateRandomMovie);
    }, [movies]);

    return (
        <>
            <div
                className={`flex items-center h-[84dvh] md:h-[75dvh] relative bg-gradient-to-t from-neutral-900 to-transparent/20 
            `}>
                <div className="h-full w-full absolute -z-10 object-cover brightness-75">
                    <Image
                        className="h-full w-full object-cover "
                        src={`${imageBaseUrl}${movie?.backdrop_path}`}
                        alt={movie?.original_title as string}
                        fill
                    />
                </div>
                <div className="px-5 md:px-20 max-w-[1200px]">
                    <h1 className="text-lg md:text-6xl font-bold">{movie?.original_title}</h1>
                    <div className="text-2xl mt-4 inline-flex items-center gap-4">
                        <div className="flex flex-col  items-center px-3 py-1 text-md bg-red-800 rounded leading-none font-bold">
                            <span className="uppercase">Top</span>
                            <span>10</span>
                        </div>
                        <span className="font-medium"># 3 By Movies Today</span>
                    </div>
                    <p className="my-8 md:text-2xl">{movie?.overview}</p>
                    <div className="inline-flex gap-3 md:text-xl">
                        <button className="button-primary" onClick={handleModalState}>
                            <HiPlay size={30} />
                            Play
                        </button>
                        <button className="button-outline" onClick={handleModalState}>
                            <HiOutlineInformationCircle size={30} />
                            View Details
                        </button>
                    </div>
                </div>
            </div>
            {showModal ? <DetailsModal movie={movie} onModalClose={handleModalState} /> : null}
        </>
    );
};

export default Hero;
