import Header from "../components/AlbumHeader";
import AlbumSearch from "../components/AlbumSearch";

export default function AlbumSearchPage() {
  return (
    <>
      <div className="flex flex-col h-screen bg-gray-900">
        <Header />
        <AlbumSearch />
      </div>
    </>
  );
}
