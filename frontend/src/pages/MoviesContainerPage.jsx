import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import SliderUtil from '../components/SliderUtil';


export const MoviesContainerPage = () => {
    const {genres} = useSelector((state) => state.genre);
    const {newMovies} = useSelector((state) => state.movie);
    const {topMovies} = useSelector((state) => state.movie);
    const {randomMovies} = useSelector((state) => state.movie);
    // const [newMovies, setNewMovies] = useState([]);
    // const [topMovies, setTopMovies] = useState([]);
    // const [randomMovies, setRandomMovies] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);

    const handleGenreClick = (genreId) => {
        setSelectedGenre(genreId);
    };

    
  return (
     <div className="flex flex-col mt-[2rem] ml-[2rem] md:flex-row justify-between items-center md:items-start">
        <nav className=" ml-[1rem] flex flex-row xl:flex-col lg:flex-col md:flex-row sm:flex-row">
            {genres?.map((g) => (
                <button
                    key={g._id}
                    className={`transition duration-300 ease-in-out hover:bg-gray-200 block p-2 rounded mb-[1rem] text-lg ${
                    selectedGenre === g._id ? "bg-gray-200" : ""
                    }`}
                    onClick={() => handleGenreClick(g._id)}
                >
                    {g.name}
                </button>
            ))}
        </nav>

        <section className="flex flex-col justify-center items-center w-full lg:w-auto ml-12">
            <div className="w-full lg:w-[85rem] mb-8 ml-5 ">
                <h1 className="mb-5">Choose For You</h1>
                <SliderUtil data={randomMovies} />
            </div>

            <div className="w-full lg:w-[85rem] mb-8 ml-5">
                <h1 className="mb-5">Top Movies</h1>
                <SliderUtil data={topMovies} />
            </div>

            <div className="w-full lg:w-[85rem] mb-8 ml-5">
                <h1 className="mb-5">Choose Movie</h1>
                <SliderUtil data={newMovies} />
            </div>
        </section>
    </div>
  )
}
