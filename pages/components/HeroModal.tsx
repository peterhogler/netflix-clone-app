import { useState, useEffect } from "react";
import { Movie } from "@/typings";
import ReactPlayer from "react-player";

interface HeroModalProps {
    movie: Movie | null;
}

const HeroModal: React.FC<HeroModalProps> = ({ movie }) => {
    const [videoUrl, setVideoUrl] = useState<string>("");
    useEffect(() => {
        const getTrailerUrl = async () => {
            try {
                const response = await fetch(
                    `https://api.themoviedb.org/3/movie/${movie?.id}/videos?api_key=${
                        process.env.NEXT_PUBLIC_TMDB_KEY as string
                    }&language=en-US`
                );
                const data = await response.json();
                const urlData = data.results[0];
                const movieTrailer = data.results.filter((video: any) => video.type === "Trailer")[0];
                const movieTrailerUrl = `https://www.youtube.com/watch?v=${movieTrailer.key}`;
                if (movieTrailer) setVideoUrl(movieTrailerUrl);
            } catch (error) {
                console.error(error);
            }
        };
        getTrailerUrl();
    }, [movie]);
    return (
        <div className="z-20 absolute inset-0 bg-black/50">
            <div className="z-20 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 h-[100dvh] w-[50dvw] bg-neutral-900 overflow-auto">
                <div className="h-3/5">
                    <ReactPlayer url={videoUrl} width="100%" height="100%" controls={true} />
                </div>
            </div>
        </div>
    );
};

export default HeroModal;
