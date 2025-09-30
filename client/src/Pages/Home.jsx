import React from 'react'
import Header from '../components/Header'
import Bloglist from '../components/Bloglist'
import Navbar from "../components/Navbar";
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div >
        <Navbar/>
        <Header/>
        <Bloglist/>
        <Newsletter/>
        <Footer/>
    </div>
  )
}

export default Home