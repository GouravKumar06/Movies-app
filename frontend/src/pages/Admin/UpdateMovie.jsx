import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router';
import { backend_url, server } from '../../server';
import axios from 'axios';
import { toast } from 'react-toastify';

const UpdateMovie = () => {
    const {id} = useParams();
    const {movies} = useSelector((state) => state.movie);

    const specificMovie = movies.find((movie) => movie._id === id);
    const navigate = useNavigate();

    const [image, setImage] = useState(specificMovie.image);
    const [name, setName] = useState(specificMovie.name);
    const [year, setYear] = useState(specificMovie.year);
    const [detail, setDetail] = useState(specificMovie.detail);
    const [cast, setCast] = useState(specificMovie.cast);

    const handleUpdateMovie = async (e) => {
        e.preventDefault();  
        
        const formData = new FormData();
        formData.append("name",name);
        formData.append("image",image);
        formData.append("year",year);
        formData.append("detail",detail);
        formData.append("cast",cast);
        axios.put(`${server}/movie/update-movie/${id}`,formData).then((res) => {            
            toast.success(res.data.message);
            setName('');
            setYear('');
            setDetail('');
            setCast([]);
            setImage(null);
            navigate("/admin/movies-list");
            window.location.reload();
        }).catch((error) => {
            toast.error(error.response.data.message);
            console.log(error);
        })
    }

    const handleDeleteMovie = async (e) => {
        e.preventDefault();
        axios.delete(`${server}/movie/delete-movie/${id}`,{withCredentials:true}).then((res) => {
            toast.success(res.data.message);
            navigate("/");
            window.location.reload();
        }).catch((error) => {
            toast.error(error.response.data.message)
        })
    }
  return (
    <div className="container flex justify-center items-center mt-4">
        <form>
            <p className="text-green-200 w-[50rem] text-2xl mb-4">Update Movie</p>
            <div className="mb-4">
                <label className="block">
                    Name:
                    <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border px-2 py-1 w-full"
                    />
                </label>
            </div>

            <div className="mb-4">
                <label className="block">
                    Year:
                    <input
                    type="number"
                    name="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="border px-2 py-1 w-full"
                    />
                </label>
            </div>

            <div className="mb-4">
                <label className="block">
                    Detail:
                    <textarea
                        name="detail"
                        value={detail}
                        onChange={(e) => setDetail(e.target.value)}
                        className="border px-2 py-1 w-full"
                    />
                </label>
            </div>

            <div className="mb-4">
                <label className="block">
                    Cast (comma separated):
                    <input
                    type="text"
                    name="cast"
                    value={cast}
                    onChange={(e) => setCast(e.target.value)}
                    className="border px-2 py-1 w-full"
                    />
                </label>
            </div>

            <div className="mb-4">
              <label htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                   {
                    typeof image === "string" ? (
                      <img src={`${backend_url}${image}`} alt="avatar" className="h-full w-full rounded-full object-cover"/>
                    ) : (
                        <img src={URL.createObjectURL(image)} alt="avatar" className="h-full w-full rounded-full object-cover"/>
                    )
                   }
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                <span className='mr-2 font-bold'>Update The Image</span>
                <input 
                    type="file" 
                    name="image" 
                    accept=".jpg,.jpeg,.png" 
                    onChange={(e) => setImage(e.target.files[0])} 
                    className="border px-2 py-1 w-[30rem]"
                />
                </label>
              </div>
            </div>

            <button
                type="button"
                onClick={handleUpdateMovie}
                className="bg-teal-500 text-white px-4 py-2 rounded"
            >
                Update Movie
            </button>

            <button
                type="button"
                onClick={handleDeleteMovie}
                className="bg-red-500 text-white px-4 py-2 rounded ml-2"
            >
                Delete Movie
            </button>
        </form>
    </div>
  )
}

export default UpdateMovie