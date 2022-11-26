import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
    const [posts, setPosts] = useState();
    const cat = useLocation().search;
    const navigate = useNavigate();

    console.log(cat);

    useEffect(() => {
        console.log(cat);
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/posts/" + cat);
                setPosts(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [cat]);

    const handleRead = (post) => {
        navigate(`/post/${post?.id}`);
    };

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
    };

    return (
        <div className="home">
            <div className="posts">
                {posts?.map((post) => (
                    <div className="post" key={post.id}>
                        <div className="img">
                            <img src={`../upload/${post.img}`} alt="" />
                        </div>
                        <div className="content">
                            <Link className="link" to={`/post/${post.id}`}>
                                <h1>{post.title}</h1>
                            </Link>
                            <p>{getText(post.desc)}</p>
                            <button onClick={() => handleRead(post)}>
                                Read More
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
