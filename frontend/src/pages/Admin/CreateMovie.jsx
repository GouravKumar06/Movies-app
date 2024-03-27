import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import {RxAvatar} from 'react-icons/rx';
import axios from 'axios';
import { server } from '../../server';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

const CreateMovie = () => {

    const {genres} = useSelector((state) => state.genre);
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [year, setYear] = useState('');
    const [genre, setGenre] = useState('');
    const [detail, setDetail] = useState('');
    const [cast, setCast] = useState([]);
    const [image, setImage] = useState(null);

    const handleCreateMovie = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append("name", name);
        formData.append("year", year);
        formData.append("genre", genre);
        formData.append("detail", detail);
        formData.append("cast", cast);  
        formData.append("image", image);
        axios.post(`${server}/movie/create-movie`, formData,{withCredentials:true}).then((res) => {
            toast.success(res.data.message);
            setName('');
            setYear('');
            setGenre('');
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

  return (
    <div className="container flex ml-10 items-center mt-4">
        <form>
            <p className="text-green-200 w-[38rem] text-2xl mb-4">Create Movie</p>

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
                    ></textarea>
                </label>
            </div>

            <div className="mb-4">
                <label className="block">
                    Cast:
                    <input
                    type="text"
                    name="cast"
                    value={cast}
                    onChange={(e) => setCast(e.target.value.split(", "))}
                    className="border px-2 py-1 w-full"
                    />
                </label>
            </div>

            <div className="mb-4">
                <label className="block">
                    Genre:                
                    <select name="genre" className="border px-2 py-1 w-full text-black"
                        value={genre} onChange={(e) => setGenre(e.target.value)}
                    >
                        <option value="" disabled>Select a Genre</option>
                        {
                            genres?.map( (data) => {
                                return <option key={data._id} value={data.name} >
                                    {data.name}
                                </option>
                            })
                        }
                    </select>
                </label>
            </div>

            <div className="mb-4">
              <label htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              ></label>
              <div className="mt-2 flex items-center">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                   {
                    image ? (
                      <img src={URL.createObjectURL(image)} alt="avatar" className="h-full w-full rounded-full object-cover"/>
                    ) : (
                      <RxAvatar className="h-8 w-8" />
                    )
                   }
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                <span className='mr-2 font-bold'>upload a Image</span>
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
                onClick={handleCreateMovie}
                className="bg-teal-500 text-white px-4 py-2 rounded"
                >
                Create Movie
            </button>
        </form>
    </div>

  )
}

export default CreateMovie