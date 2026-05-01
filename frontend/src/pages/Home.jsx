import { useEffect, useState } from "react";
import API from "../services/api";
import SongCard from "../components/SongCard";

const Home = () => {
    const [songs, setSongs] = useState([]);
    const [query, setQuery] = useState("");

    const fetchSongs = async () => {
        try {
            const res = await API.get("/songs");
            setSongs(res.data.songs);
        } catch (error) {
            console.log(error.message);
        }

    };

    const handleSearch = async (e) => {
        const value = e.target.value;
        setQuery(value);

        try {
            if (value.trim() === "") {
                fetchSongs();
                return;
            }
            const res = await API.get(`/songs/search?q=${value}`);
            setSongs(res.data.songs);
            console.log(res.data.songs)
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchSongs();
    }, []);

    return (
        <div className="p-5">
            <h1 className="text-3xl font-bold mb-4">Songs</h1>

            <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search songs..."
                className="border p-2 w-full mb-6 rounded"
            />


            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {songs.length > 0 ? (
                    songs.map((song) => (
                        <SongCard key={song._id} song={song} />
                    ))
                ) : (
                    <p className="text-gray-500">No songs found</p>
                )}
            </div>
        </div>
    );
};

export default Home;
