import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import { getToken } from "../API/spotifyAuth.js";
import AlbumTable from "./AlbumTable.js";

export default function AlbumSearch() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [artistID, setArtistID] = useState("");
  const [albumData, setAlbumData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Calls the fetchToken function once when the component is initially rendered
  useEffect(() => {
    fetchToken();
  }, []);

  // Fetches an access token to Spotify to be able to make API requests
  const fetchToken = async () => {
    try {
      let token = await getToken(); // Wait for the Promise to resolve
      setAccessToken(token); // Set the access token
      // console.log(token); // Log the full token object
      // console.log(`Token: ${token}`); // Log the access token
      console.log("Token set");
    } catch (error) {
      console.error("Error fetching token:", error);
    }
  };

  // Handles user changes to the search input field
  const handleChange = (e) => {
    setSearchInput(e.target.value);
    // console.log(`searchInput: ${searchInput}`);
  };

  // Handles the form search event
  async function search(e) {
    e.preventDefault();

    //Render the loading spinner
    setLoading(true);

    try {
      console.log(`Search function: ${searchInput}`);

      // Search parameters to be passed into fetch requests
      const searchParameters = {
        method: `GET`,
        headers: {
          "Content-Type": `application/json`,
          Authorization: `Bearer ${accessToken}`,
        },
      };

      // Fetch Artist ID from the Spotify API
      const retrievedArtist = await fetch(
        `https://api.spotify.com/v1/search?q=${searchInput}&type=artist&limit=1`,
        searchParameters
      );
      const retrievedArtistData = await retrievedArtist.json();

      // Transform and set the artist ID in a useState
      const fetchedArtistId = retrievedArtistData.artists.items[0].id;
      setArtistID(fetchedArtistId); // Update state for later use
      console.log(`Fetched Artist ID: ${fetchedArtistId}`);

      // Fetch Album data from the Spotify API
      const retrievedAlbums = await fetch(
        `https://api.spotify.com/v1/artists/${fetchedArtistId}/albums?limit=20`,
        searchParameters
      );
      const retrievedAlbumData = await retrievedAlbums.json();

      // Update albumData state
      setAlbumData(retrievedAlbumData.items); // Update albumData state
      console.log("Album Data:", retrievedAlbumData.items);
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      //Remove loading spinner
      setLoading(false);
    }
  }

  return (
    <>
      {loading ? (
        <div className="h-12">
          <svg
            className="w-12 h-12 animate-spin flex align-middle justify-center mx-auto text-indigo-400 filter drop-shadow-[0_0_10px_rgba(99,102,241,0.8)]"
            fill="#6366F1"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 16 3 C 14.34375 3 13 4.34375 13 6 C 13 7.65625 14.34375 9 16 9 C 17.65625 9 19 7.65625 19 6 C 19 4.34375 17.65625 3 16 3 Z M 8.9375 6.4375 C 7.558594 6.4375 6.4375 7.558594 6.4375 8.9375 C 6.4375 10.316406 7.558594 11.4375 8.9375 11.4375 C 10.316406 11.4375 11.4375 10.316406 11.4375 8.9375 C 11.4375 7.558594 10.316406 6.4375 8.9375 6.4375 Z M 23.0625 7.9375 C 22.511719 7.9375 22.0625 8.386719 22.0625 8.9375 C 22.0625 9.488281 22.511719 9.9375 23.0625 9.9375 C 23.613281 9.9375 24.0625 9.488281 24.0625 8.9375 C 24.0625 8.386719 23.613281 7.9375 23.0625 7.9375 Z M 6 13.75 C 4.757813 13.75 3.75 14.757813 3.75 16 C 3.75 17.242188 4.757813 18.25 6 18.25 C 7.242188 18.25 8.25 17.242188 8.25 16 C 8.25 14.757813 7.242188 13.75 6 13.75 Z M 26 14.75 C 25.308594 14.75 24.75 15.308594 24.75 16 C 24.75 16.691406 25.308594 17.25 26 17.25 C 26.691406 17.25 27.25 16.691406 27.25 16 C 27.25 15.308594 26.691406 14.75 26 14.75 Z M 8.9375 21.0625 C 7.832031 21.0625 6.9375 21.957031 6.9375 23.0625 C 6.9375 24.167969 7.832031 25.0625 8.9375 25.0625 C 10.042969 25.0625 10.9375 24.167969 10.9375 23.0625 C 10.9375 21.957031 10.042969 21.0625 8.9375 21.0625 Z M 23.0625 21.5625 C 22.234375 21.5625 21.5625 22.234375 21.5625 23.0625 C 21.5625 23.890625 22.234375 24.5625 23.0625 24.5625 C 23.890625 24.5625 24.5625 23.890625 24.5625 23.0625 C 24.5625 22.234375 23.890625 21.5625 23.0625 21.5625 Z M 16 24.25 C 15.035156 24.25 14.25 25.035156 14.25 26 C 14.25 26.964844 15.035156 27.75 16 27.75 C 16.964844 27.75 17.75 26.964844 17.75 26 C 17.75 25.035156 16.964844 24.25 16 24.25 Z" />
          </svg>
        </div>
      ) : (
        <div className="h-12"></div>
      )}

      <form onSubmit={search} className="max-w-lg w-full mx-auto p-6">
        <label
          htmlFor="searchInput"
          className="block text-sm/6 font-medium text-white text-center py-3"
        >
          Search by artist
        </label>

        <div className="mt-2 grid grid-cols-1">
          <input
            id="searchInput"
            name="searchInput"
            type="text"
            placeholder=""
            className="col-start-1 row-start-1 block w-full rounded-lg bg-white py-2 pl-10 pr-3 text-base text-gray-900 placeholder:text-gray-400 outline-none border border-gray-300 focus:border-indigo-900 focus:ring-0 focus:shadow-[0_0_25px_rgba(99,102,241,0.9)] sm:pl-9 sm:text-sm"
            onChange={handleChange}
          />
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
            style={{ color: "grey" }}
          />
        </div>
        <button
          type="submit"
          className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          style={{
            margin: "20px auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Search
        </button>
      </form>

      <AlbumTable albumData={albumData} />
    </>
  );
}
