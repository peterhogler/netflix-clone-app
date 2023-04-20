import { useEffect, useState } from "react";
import { Space_Grotesk } from "next/font/google";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import requests from "@/requests/requests";
import { Movie } from "@/typings";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { likedMoviesFromReducer } from "./redux/likedMoviesReducer";

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

interface DashboardProps {
    netflixOriginals: Movie[];
    trendingNow: Movie[];
    topRated: Movie[];
    actionMovies: Movie[];
    documentaries: Movie[];
    animated: Movie[];
}

const Dashboard: React.FC<DashboardProps> = ({
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    documentaries,
    animated,
}) => {
    const dispatch = useAppDispatch();
    const likedMovies = useAppSelector(likedMoviesFromReducer);

    useEffect(() => {
        localStorage.setItem("likedMovies", JSON.stringify(likedMovies));
    }, [likedMovies]);
    return (
        <main className={space_grotesk.className} id="main">
            <Navbar />
            <Hero movies={netflixOriginals} />
            {likedMovies.length > 0 && <Banner title="Liked Movies" movies={likedMovies} />}
            <Banner title="Trending Now" movies={trendingNow} />
            <Banner title="Top Rated" movies={topRated} />
            <Banner title="Action" movies={actionMovies} />
            <Banner title="Documentary" movies={documentaries} />
            <Banner title="Animated" movies={animated} />
            <Footer />
        </main>
    );
};

export default Dashboard;

export const getServerSideProps = async () => {
    const [netflixOriginals, trendingNow, topRated, actionMovies, documentaries, animated] =
        await Promise.all([
            fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
            fetch(requests.fetchTrending).then((res) => res.json()),
            fetch(requests.fetchTopRated).then((res) => res.json()),
            fetch(requests.fetchActionMovies).then((res) => res.json()),
            fetch(requests.fetchDocumentaries).then((res) => res.json()),
            fetch(requests.fetchAnimationMovies).then((res) => res.json()),
        ]);

    return {
        props: {
            netflixOriginals: netflixOriginals.results,
            trendingNow: trendingNow.results,
            topRated: topRated.results,
            actionMovies: actionMovies.results,
            documentaries: documentaries.results,
            animated: animated.results,
        },
    };
};
