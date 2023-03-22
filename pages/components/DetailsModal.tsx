import { useState, useEffect } from "react";
import { Movie } from "@/typings";
import ReactPlayer from "react-player";
import {
    HiOutlineThumbUp,
    HiOutlineVolumeOff,
    HiOutlineVolumeUp,
    HiPlay,
    HiPlus,
    HiX,
} from "react-icons/hi";

interface HeroModalProps {
    movie: Movie | null;
    onModalClose: () => void;
}

const HeroModal: React.FC<HeroModalProps> = ({ movie, onModalClose }) => {
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [mediaPlayingState, setMediaPlayingState] = useState<boolean>(true);
    const [mediaVolumeMuted, setMediaVolumeMuted] = useState<boolean>(true);

    useEffect(() => {
        const getTrailerUrl = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${movie?.id}/videos?api_key=${
                        process.env.NEXT_PUBLIC_TMDB_KEY as string
                    }&language=en-US`
                );
                const data = await response.json();
                const movieTrailer = data.results.filter((video: any) => video.type === "Trailer")[0];
                const movieTrailerUrl = `https://www.youtube.com/watch?v=${movieTrailer.key}`;
                if (movieTrailer) setVideoUrl(movieTrailerUrl);
            } catch (error) {
                console.error(error);
            }
        };
        getTrailerUrl();
    }, [movie]);

    useEffect(() => {
        const main = document.querySelector("#main");
        main?.classList.add("overflow-hidden");

        return () => {
            main?.classList.remove("overflow-hidden");
        };
    }, []);

    const handlePlayingState = () => {
        setMediaPlayingState(!mediaPlayingState);
    };

    const handleMediaMute = () => {
        setMediaVolumeMuted(!mediaVolumeMuted);
    };

    return (
        <div className="z-20 grid place-items-start fixed inset-0 bg-black/50">
            <div className="h-full xl:w-[60dvw] m-auto scrollbar-hide">
                <div className="h-[100dvh] lg:h-[65dvh] relative xl:mt-14">
                    <ReactPlayer
                        url={videoUrl}
                        width="100%"
                        height="100%"
                        playing={mediaPlayingState}
                        muted={mediaVolumeMuted}
                    />
                    <div className="absolute top-5 right-5">
                        <button
                            className="grid place-items-center bg-neutral-900 self-stretch h-10 w-10 rounded-full "
                            onClick={onModalClose}>
                            <HiX size={26} />
                        </button>
                    </div>
                    <div className="flex items-center gap-4 absolute bottom-10 left-5 md:left-14 text-xl">
                        <button className="button-primary" onClick={handlePlayingState}>
                            <HiPlay size={30} />
                            {mediaPlayingState ? "Pause" : "Play Now"}
                        </button>
                        <div className="flex gap-3">
                            <button className="grid place-items-center bg-neutral-800 self-stretch h-10 w-10 rounded-full ring-2 ring-neutral-300">
                                <HiPlus size={27} />
                            </button>
                            <button className="grid place-items-center bg-neutral-800 self-stretch h-10 w-10 rounded-full ring-2 ring-neutral-300">
                                <HiOutlineThumbUp size={27} />
                            </button>
                        </div>
                    </div>
                    <div className="absolute right-5 md:right-14 bottom-10">
                        <button
                            className="grid place-items-center bg-neutral-900 self-stretch h-10 w-10 rounded-full ring-2 ring-neutral-400 text-neutral-400"
                            onClick={handleMediaMute}>
                            {mediaVolumeMuted ? (
                                <HiOutlineVolumeOff size={27} />
                            ) : (
                                <HiOutlineVolumeUp size={27} />
                            )}
                        </button>
                    </div>
                </div>
                <div className="md:h-max bg-gradient-to-b from-black to-neutral-900">
                    <div className="px-5 md:px-14">
                        <h1 className="text-2xl md:text-4xl font-bold py-4">{movie?.original_title}</h1>
                        <p>
                            <span className="font-semibold text-green-400">75% Match </span>- Movie
                        </p>
                    </div>
                    <div className="px-5 md:px-14 flex flex-col lg:flex-row gap-10 pt-5 pb-10">
                        <div className="basis-4/6 whitespace-pre-wrap">
                            <p className="md:text-lg">{movie?.overview}</p>
                        </div>
                        <div className="w-max basis-2/6">
                            <ul className="flex flex-col gap-1 ">
                                <li>
                                    <span className="text-neutral-500">Release Date:</span>{" "}
                                    {movie?.release_date}
                                </li>
                                <li>
                                    <span className="text-neutral-500">Vote Average:</span>{" "}
                                    {movie?.vote_average}
                                </li>
                                <li>
                                    <span className="text-neutral-500">Language:</span>{" "}
                                    {movie?.original_language.toUpperCase()}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroModal;
