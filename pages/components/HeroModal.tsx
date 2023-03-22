import { useState, useEffect } from "react";
import { Movie } from "@/typings";
import ReactPlayer from "react-player";
import { HiOutlineThumbUp, HiPlay, HiPlus, HiX } from "react-icons/hi";

interface HeroModalProps {
    movie: Movie | null;
    onModalClose: () => void;
}

const HeroModal: React.FC<HeroModalProps> = ({ movie, onModalClose }) => {
    const [videoUrl, setVideoUrl] = useState<string>("");
    const [mediaPlayingState, setMediaPlayingState] = useState<boolean>(true);
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

    const handlePlayingState = () => {
        setMediaPlayingState(!mediaPlayingState);
    };
    return (
        <div>
            <div className="z-20 grid place-items-start fixed inset-0 bg-black/50">
                <div className="h-full w-[60vw] m-auto border-t-rounded">
                    <div className="h-[65%] relative mt-14">
                        <ReactPlayer
                            url={videoUrl}
                            width="100%"
                            height="100%"
                            playing={mediaPlayingState}
                            muted
                        />
                        <div className="absolute top-5 right-5">
                            <button
                                className="grid place-items-center bg-neutral-900 self-stretch h-10 w-10 rounded-full "
                                onClick={onModalClose}>
                                <HiX size={26} />
                            </button>
                        </div>
                        <div className="flex items-center gap-4 absolute bottom-10 left-14 text-xl">
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroModal;
