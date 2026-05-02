import { useEffect, useState } from "react";
import API from "../services/api";
import Logout from "../components/Logout";

const ArtistDashboard = () => {
    const [songs, setSongs] = useState([]);
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);

    const fetchSongs = async () => {
        const res = await API.get("/songs/my-songs");
        setSongs(res.data.songs);
    };

    useEffect(() => {
        fetchSongs();
    }, []);

    const handleUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", title);
        formData.append("audio", file);

        await API.post("/songs/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        setTitle("");
        setFile(null);
        fetchSongs();
    };
    const handleDelete = async (id) => {
        try {
            await API.delete(`/songs/${id}`);
            fetchSongs();
        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    };
    return (
        <div className="p-5">

            {/* UPLOAD FORM */}
            <h1 className="text-2xl text-center font-bold mb-4"> Artist Dashboard</h1>

            <form onSubmit={handleUpload} className="border p-4 mb-6">
                <input
                    type="text"
                    placeholder="Song title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 w-full mb-2"
                />

                <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="mb-2"
                />

                <button className="bg-black text-white px-4 py-2 rounded-lg">
                    Upload Song
                </button>
            </form>

            {/* SONG LIST */}
            <h2 className="text-xl font-semibold mb-2">Your Songs</h2>

            <div className="grid gap-3">
                {songs.map((song) => (
                    <div key={song._id} className="border p-3 flex justify-between">
                        <div>
                            <p className="font-bold">{song.title}</p>
                            <audio controls src={song.audioUrl}></audio>
                        </div>

                        <button
                            onClick={() => handleDelete(song._id)}
                            className="bg-red-500 text-white px-3 py-1"
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
            <Logout />
        </div>
    );
};

export default ArtistDashboard;
