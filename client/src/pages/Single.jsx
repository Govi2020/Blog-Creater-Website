import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import { useEffect } from "react";
import moment from "moment";
import { AuthContext } from "../contexts/authContent";
import { useContext } from "react";
import DOMPurify from 'dompurify'

export default function Single() {
    const [post, setPost] = useState({});
    const location = useLocation();
    const { currentUser } = useContext(AuthContext);

    const postid = location.pathname.split("/")[2];
  const getText = (html) =>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/posts/" + postid);
                setPost(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [postid]);

    const handleDelete = async (e) => {
        try {
            const res = await axios.delete("/api/posts/" + post?.id);
            setPost(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="single">
            <div className="content">
                {post?.img && (
                    <img src={`../upload/${post.img}`} alt="No Title Image" />
                )}
                <div className="user">
                    {post?.userImg && <img src={post?.userImg} alt="" />}
                    <div className="info">
                        <span>{post?.username}</span>
                        <p>{moment(post?.date)?.fromNow()}</p>
                    </div>
                    {currentUser?.username === post?.username && (
                        <div className="edit">
                            <Link to={`/write?edit=2`} state={post}>
                                <img alt="🖊" />
                            </Link>
                            <img alt="⛔" onClick={handleDelete} />
                        </div>
                    )}
                </div>
                <h1>{post?.title}</h1>
                <p
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.desc),
                }}
                >
                </p>
            </div>
            <Menu />
        </div>
    );
}
