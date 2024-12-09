import { useState, useEffect } from "react";

export default function AlbumTable({ albumData }) {
  const [people, setPeople] = useState([]);

  // Update people when albumData changes
  useEffect(() => {
    if (Array.isArray(albumData) && albumData.length > 0) {
      const updatedPeople = albumData.map((album) => ({
        key: album.id,
        name: album.name,
        release_date: album.release_date,
        type: album.type,
        img: album.images[0]?.url || "", // Ensure a fallback if no image is present
        url: album.external_urls.spotify,
      }));
      setPeople(updatedPeople);
    }
  }, [albumData]);

  return (
    <>
      {people.length === 0 ? (
        <div className="bg-gray-900 text-white text-center flex items-center justify-center h-64">
          {""}
        </div>
      ) : (
        <div className="relative mx-4 max-h-[600px] overflow-x-auto overflow-y-auto sm:mx-6 lg:mx-8 scrollbar-thin scrollbar-thumb-indigo-400 scrollbar-track-indigo-900 scrollbar-thumb-rounded-full">
          {/* Scrollable Table */}
          <div className="inline-block min-w-full py-2 px-4 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0"
                  >
                    {""}
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-white"
                  >
                    Album
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-center text-sm font-semibold text-white"
                  >
                    Release Date
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-right text-sm font-semibold text-white"
                  >
                    Add to favourites
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {people.map((element) => (
                  <tr key={element.key}>
                    <td className="flex justify-center items-center whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                      {element.img ? (
                        <img
                          alt={element.name}
                          src={element.img}
                          className="w-11 h-11 rounded-full"
                        />
                      ) : (
                        <span>{""}</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                      <a
                        href={element.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-indigo-400 hover:text-indigo-300"
                      >
                        {element.name}
                      </a>
                    </td>
                    <td className="whitespace-nowrap text-center px-3 py-4 text-sm text-gray-300">
                      {element.release_date}
                    </td>
                    <td className="relative whitespace-nowrap px-3 py-3.5 text-right text-sm font-medium">
                      <a
                        href="#"
                        className="text-indigo-400 hover:text-indigo-300"
                      >
                        Add
                        <span className="sr-only">, {element.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}
