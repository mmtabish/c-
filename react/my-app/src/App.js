import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';

const BASE_URL = 'https://jsonplaceholder.typicode.com'; 

function App() {
  const [posts, setPosts] = useState([]); // No type annotation in JavaScript
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/posts`);
                const postsData = await response.json(); // No type assertion
                setPosts(postsData);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Api Flow</h1>
            <ul>
                {posts.map(post => (
                    <li key={post.id}>{post.title}</li> // Assuming post has an id and title
                ))}
            </ul>
        </div>
    )
}

export default App;
