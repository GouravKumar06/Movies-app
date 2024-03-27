import React from 'react'
import { Link } from 'react-router-dom'
import { backend_url } from '../server'

const MovieCard = ({movie}) => {
  return (
    <div key={movie._id} className="relative group m-[1rem]">
      <Link to={`/movies/${movie._id}`}>
        <img
          src={`${backend_url}${movie.image}`}
          alt={movie.name}
          className="w-[15rem] h-[15rem]  rounded transition duration-300 ease-in-out transform group-hover:opacity-50 object-cover"
        />
      </Link>

      <p className="absolute top-[85%] left-[2rem] right-0 bottom-0 opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
        {movie.name}
      </p>
    </div>
  )
}

export default MovieCard