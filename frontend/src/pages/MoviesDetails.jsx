import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { backend_url, server } from '../server';
import { loadAllMovies } from '../redux/actions/movies';
import axios from 'axios';
import MovieTabs from './MovieTabs';
import { toast } from 'react-toastify';

const MoviesDetails = () => {

    const {movies} = useSelector((state) => state.movie);
    const {user} = useSelector((state) => state.user);
    const {id } = useParams();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
  
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        if(movies)
        {
            const selectedMovie = movies.find((movie) => movie._id === id);
            setMovie(selectedMovie);
        }
    }, [movies, id]);

    useEffect(()=>{
        const reviews = async () => {
            await axios.get(`${server}/movie/get-all-reviews/${id}`,{withCredentials:true})
            .then((res) => {
                setReviews(res.data.reviews);
            })
            .catch((error)=>{
                toast.error(error.response.data.message);
            })
        }
        reviews();
    },[id])


    const submitHandler = async (e) => {
        e.preventDefault();
        await axios.post(`${server}/movie/get-all-movies/${id}/reviews`, {
            rating,
            comment,
        },{withCredentials:true})
        .then((res) => {
            toast.success("Review added successfully");
            window.location.reload();
        }).catch((error) => {
            console.log(error)
            toast.error(error.response.data.message);
        })

    };

  return (
    <div className='overflow-hidden'>
        <div className='mt-5'>
            <Link to="/" className="  text-white font-semibold hover:underline ml-[20rem] mt-5">
                Go Back
            </Link>
        </div>

        <div className="mt-[2rem]">
            <div className="flex justify-center items-center">
                <img src={`${backend_url}${movie?.image}`} alt={movie?.name} className="w-[50%] h-[25rem] object-cover rounded"/>
            </div>
        

            <div className="container  flex justify-between  mt-[3rem] overflow-hidden ">
                <section>
                    <h2 className="text-4xl ml-[22rem] my-4 font-bold">{movie?.name}</h2>
                    <p className="my-4 ml-[22rem] xl:w-[25rem] lg:w-[20rem] md:w-[15rem] text-[#B0B0B0]">
                        {movie?.detail}
                    </p>
                </section>
                <div className="mr-[15rem]">
                    <p className="text-2xl font-semibold">
                        Releasing Year: {movie?.year}
                    </p>
                    <div>
                        {movie?.cast.map((c) => (
                            <ul key={c._id}>
                                <li className="mt-[1rem]">{c}</li>
                            </ul>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container ml-[20rem]">
                <MovieTabs
                    loadingMovieReview={reviews}
                    userInfo={user}
                    submitHandler={submitHandler}
                    rating={rating}
                    setRating={setRating}
                    comment={comment}
                    setComment={setComment}
                    movie={movie}
                />
            </div>
        </div>

    </div>
  )
}

export default MoviesDetails