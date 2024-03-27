
import React, { useState } from 'react'
import GenreForm from '../../components/GenreForm';
import { useSelector } from 'react-redux';
import Modal from '../../components/Modal';
import axios from 'axios';
import { server } from '../../server';
import { toast } from 'react-toastify';

const GenreList = () => {

    const {genres} = useSelector((state) => state.genre);

    const [name, setName] = useState("");
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [updatingName, setUpdatingName] = useState("");
    const [modalVisible, setModalVisible] = useState(false);


    const handleCreateGenre = async (e) => {
        e.preventDefault();
        
        axios.post(`${server}/genre/create-genre`,{name},{withCredentials:true})
        .then((res) => {
            toast.success("Genre created successfully");
            setName("");
            window.location.reload();
        }).catch((error) => {
            toast.error(error.response.data.message);
        })
    }


    const handleUpdateGenre = async (e) => {
        e.preventDefault();

        axios.post(`${server}/genre/update-genre/${selectedGenre._id}`,{name:updatingName},{withCredentials:true})
        .then((res) => {
            toast.success("Genre updated successfully");
            setSelectedGenre(null);
            setUpdatingName("");
            setModalVisible(false);
            window.location.reload();
        })
        .catch((error) => {
            toast.error(error.response.data.message);
        })

    }

    const handleDeleteGenre = async (e) => {
        e.preventDefault();

        axios.delete(`${server}/genre/delete-genre/${selectedGenre._id}`,{withCredentials:true})
        .then((res) => {
            toast.success("Genre deleted successfully");
            setSelectedGenre(null);
            setModalVisible(false);
            window.location.reload();
        })
        .catch((error) => {
            toast.error(error.response.data.message);
        })
    }

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
        <div className="md:w-3/4 p-3">
            <h1 className="h-15 text-2xl font-semibold mb-5">Manage Genres</h1>
            <GenreForm
                value={name}
                setValue={setName}
                handleSubmit={handleCreateGenre}
            />

            <br/>

            <div className="flex flex-wrap">
                {genres?.map((genre) => (
                    <div key={genre._id}>
                        <button
                            className="bg-white border border-teal-500 text-teal-500 py-2 px-4 rounded-lg m-3 hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                            onClick={() => {                            
                                setModalVisible(true);
                                setSelectedGenre(genre);
                                setUpdatingName(genre.name);
                            }}
                        >
                            {genre.name} 
                        </button>
                    </div>
                ))}
            </div>

            <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
                <GenreForm
                    value={updatingName}
                    setValue={(value) => setUpdatingName(value)}
                    handleSubmit={handleUpdateGenre}
                    buttonText="Update"
                    handleDelete={handleDeleteGenre}
                />
            </Modal>

        </div>
    </div>
  )
}

export default GenreList