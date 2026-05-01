const SongCard = ({ song }) => {
  return (
    <div className="border p-4 rounded-lg shadow">
      <h2 className="font-semibold">{song.title}</h2>
      <p className="text-sm text-gray-500">
        {song.artist.username}
      </p>

      <audio controls className="mt-2 w-full">
        <source src={song.audioUrl} type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default SongCard;
