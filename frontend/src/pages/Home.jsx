import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/Header';
import { MoviesContainerPage } from './MoviesContainerPage';

const Home = () => {

  const {movies} = useSelector((state) => state.movie);

  return (
    <div className='container mx-auto overflow-hidden w-[85%]' >
        <Header/>
        <section className="mt-[3rem]">
          <MoviesContainerPage />
        </section>
    </div>
  )
}

export default Home