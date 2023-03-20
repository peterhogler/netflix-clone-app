import { Space_Grotesk } from "next/font/google";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import requests from "@/requests/requests";
import { Movie } from "@/typings";
import Banner from "./components/Banner";

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

interface DashboardProps {
    netflixOriginals: Movie[];
    trendingNow: Movie[];
    topRated: Movie[];
    actionMovies: Movie[];
    documentaries: Movie[];
}

const Dashboard: React.FC<DashboardProps> = ({
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    documentaries,
}) => {
    return (
        <main className={space_grotesk.className}>
            <Navbar />
            <Hero movies={netflixOriginals} />
            <Banner title="Trending Now" movies={trendingNow} />
            <Banner title="Top Rated" movies={topRated} />
            <Banner title="Action" movies={actionMovies} />
            <Banner title="Documentary" movies={documentaries} />
        </main>
    );
};

export default Dashboard;

export const getServerSideProps = async () => {
    const [netflixOriginals, trendingNow, topRated, actionMovies, documentaries] = await Promise.all([
        fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
        fetch(requests.fetchTrending).then((res) => res.json()),
        fetch(requests.fetchTopRated).then((res) => res.json()),
        fetch(requests.fetchActionMovies).then((res) => res.json()),
        fetch(requests.fetchDocumentaries).then((res) => res.json()),
    ]);

    return {
        props: {
            netflixOriginals: netflixOriginals.results,
            trendingNow: trendingNow.results,
            topRated: topRated.results,
            actionMovies: actionMovies.results,
            documentaries: documentaries.results,
        },
    };
};
