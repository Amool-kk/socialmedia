import React from 'react';
import CreatePost from './components/createPost.js/createpost';
import Navbar from './components/navbar/navbar';

const Home = () => {
    return (
        <>
            <Navbar />
            <CreatePost />
        </>
    )
}


export default Home;