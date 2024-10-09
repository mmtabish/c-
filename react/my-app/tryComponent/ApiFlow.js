import React from 'react';
import {useState, useEffect} from 'react';

const BASE_URl = 'https//jsonpLaceholder.typicode.com';

interface Post {
    id: Number;
    title:String;
}

export default function Demo (){

    const [post, setPost] = useState<Post>([]); 

    useEffect(() => {
        const fetchPost = async () => {
            SetIsLoading(true);
           try{
            const response = await fetch(`&{BASE_URL}/posts`);
            const posts = (await response.json()) as Post[] ;
            setPost{posts};
           } catch (e  ){
            setError(e); 
           }
            setIsLoading(false);

        }
        fetchPost();
    },[]);

    if(isLoading){
        return <div>Loading</div>;
    }

  return (
    <div>ApiFlow</div>
  )
}

