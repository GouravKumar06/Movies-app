import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { server } from '../../server'
import { toast } from 'react-toastify'

const AllComments = () => {
    const {movies} = useSelector(state => state.movie)

    const handleDeleteComment = async (movieId, reviewId) => {
        await axios.post(`${server}/movie/delete-comment/`,{
            movieId,
            reviewId
        },{withCredentials:true}).then((res) => {
            console.log(res);
            toast.success(res.data.message);
            window.location.reload();
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
    }
  return (
    <div>
      {movies?.map((movie) => (
        <section key={movie._id} className="flex flex-col justify-center items-center">
          {movie?.reviews.map((review) => (
            <div key={review._id} className="bg-[#1A1A1A] p-4 rounded-lg w-[50%] mt-[2rem]">
              <div className="flex justify-between">
                <strong className="text-[#B0B0B0]">{review.name}</strong>
                <p className="text-[#B0B0B0]">
                  {review.createdAt.substring(0, 10)}
                </p>
              </div>

              <p className="my-4">{review.comment}</p>

              <button className="text-red-500" onClick={() => handleDeleteComment(movie._id, review._id)}>
                Delete
              </button>
            </div>
          ))}
        </section>
      ))}
    </div>
  )
}

export default AllComments