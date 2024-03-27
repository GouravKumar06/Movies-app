import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import banner from "../assets/banner.jpg";
import MovieCard from '../components/MovieCard';

const AllMovies = () => {


    const {movies} = useSelector((state) => state.movie);
    const {genres} = useSelector((state) => state.genre);
    const {newMovies} = useSelector((state) => state.movie);
    const {topMovies} = useSelector((state) => state.movie);
    const {randomMovies} = useSelector((state) => state.movie);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const movieYears = movies?.map((movie) => movie.year);

    const uniqueYears = Array.from(new Set(movieYears));
    const handleGenreClick = (genre) => {
        const filterByGenre = movies.filter((movie) => movie.genre === genre);
        setFilteredMovies(filterByGenre);
    };

    const handleYearChange = (year) => {
        const filterByYear = movies.filter((movie) => movie.year === +year);
        setFilteredMovies(filterByYear);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);

        const searchMovies = movies.filter((movie) =>
            movie.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredMovies(searchMovies);
    };
   

    const handleSortChange = (sortOption) => {
        switch (sortOption) {
        case "new":
            setFilteredMovies(newMovies);
            break;
        case "top":
            setFilteredMovies(topMovies);
            break;
        case "random":
            setFilteredMovies(randomMovies);
            break;

        default:
            setFilteredMovies([]);
            break;
        } 
    }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 -translate-y-[5rem] overflow-hidden">
        <>
            <section>
                <div className="relative h-[50rem] w-screen mb-10 flex items-center justify-center bg-cover" style={{ backgroundImage: `url(${banner})` }}>
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-black opacity-60"></div>
                    <div className="relative z-10 text-center text-white mt-[10rem]">
                        <h1 className="text-8xl font-bold mb-4">The Movies Hub</h1>
                        <p className="text-2xl">
                            Cinematic Odyssey: Unveiling the Magic of Movies
                        </p>
                    </div>
                    <section className="absolute -bottom-[5rem]">
                        <input
                            type="text"
                            className="w-[100%] h-[5rem] border px-10 outline-none rounded"
                            placeholder="Search Movie"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                        <section className="sorts-container mt-[2rem] ml-[10rem]  w-[30rem]">
                            <select className="border p-2 rounded text-black ml-2" value={selectedGenre}
                                onChange={(e) => handleGenreClick(e.target.value)}
                            >
                                <option value="">Genres</option>
                                {genres?.map((genre) => (
                                    <option key={genre._id} value={genre.name}>
                                        {genre.name}
                                    </option>
                                ))}
                            </select>

                            <select className="border p-2 rounded text-black ml-2" value={selectedYear}
                                onChange={(e) => handleYearChange(e.target.value)}
                            >
                                <option value="">Year</option>
                                {uniqueYears?.map((year) => (
                                    <option key={year._id} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>

                            <select
                                className="border p-2 rounded ml-4 text-black"
                                onChange={(e) => handleSortChange(e.target.value)}
                            >
                                <option value="">Sort By</option>
                                <option value="new">New Movies</option>
                                <option value="top">Top Movies</option>
                                <option value="random">Random Movies</option>
                            </select>
                        </section>
                    </section>
                </div>

                <section className="mt-[10rem] w-screen flex justify-center items-center flex-wrap">
                    {filteredMovies?.map((movie) => (
                    <MovieCard key={movie._id} movie={movie} />
                    ))}
                </section>
            </section>
        </>
    </div>
  )
}

export default AllMovies