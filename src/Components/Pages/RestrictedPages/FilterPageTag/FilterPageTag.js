import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import Header from "../Header"

const FilterPageTag = () => {
    const { tag } = useParams();
    const [posts, setPosts] = useState();

    const authToken = JSON.parse(localStorage.getItem("authToken"));
    const tokenPart = authToken.split(".");
    const encodedPayload = tokenPart[1];
    const rawPayload = atob(encodedPayload);
    const userToken = JSON.parse(rawPayload);

    const getPostsByTag = async() => {
        const response = await fetch(`http://localhost:5000/posts/${tag}`, { headers: { Authorization: "Bearer " + authToken}});
        const posts = await response.json();
        setPosts(posts.data);
    }

    useEffect(() => {
        getPostsByTag();
    }, [tag])

    return (
        <>
            <Header />
            <h1>Posts contenant le tag {tag}</h1>
        </>
    )
}

export default FilterPageTag
