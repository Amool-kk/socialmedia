import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import './createpost.css'



const CreatePost = () => {

    const [selectedImage, setSelectedImage] = useState(null);
    const [message, setMessage] = useState(null);
    const [video,addVideo] = useState(null);
    const [data, setData] = useState([])
    // const [classs, setClasss] = useState();
    const navigate = useNavigate();

    const getAllpost = useCallback(async () => {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/getallpost`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        })

        const result = await res.json()
        // console.log(result)
        if (res.status === 200) {
            const temp = result.message;
            temp.reverse()
            setData(temp)
            console.log(temp)
        }
    }, [setData])


    useEffect(() => {
        getAllpost()
    }, [getAllpost])


    const auto_grow = (element) => {
        setMessage(element.target.value)
        element.target.style.height = "5px";
        element.target.style.height = (element.target.scrollHeight) + "px";
    }

    const postMessage = async (e) => {
        e.preventDefault()
        if (!message) {
            window.alert("Write something for post")
            return 0;
        }
        console.log(selectedImage)

        const formData = new FormData();
        formData.append('text',message);
        formData.append('image',selectedImage);
        formData.append('video',video);

        const res = fetch(`${process.env.REACT_APP_SERVER_URL}/createpost`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                text: message,
                image: selectedImage,
                video : video
            })
        })
        // const result = (await res).json
        if ((await res).status === 200) {
            getAllpost()
        }

    }

    const like = async (e)=>{
        console.log(e.target.className)
        const postID = data[e.target.className].postID;

        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/like`,{
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            credentials : "include",
            body: JSON.stringify({
                postID
            })
        })

        if((res).status === 200){
            getAllpost()
        }
    }

    return (
        <>
            <div className="Post">
                <form encType="multipart/form-data">
                    <div className="items" style={{ width: "100%" }}>
                        <textarea type="text" placeholder="Write something here..." onInput={e => auto_grow(e)}></textarea>
                    </div>
                    <div className="items">
                        {selectedImage && (
                            <>
                                <div style={{ margin: "auto", position: "relative" }}>
                                    <img alt="not fount" style={{ margin: "auto", display: "block" }} width={"50%"} src={URL.createObjectURL(selectedImage)} />
                                    <br />
                                    <button style={{ position: "absolute", top: "10px", right: "24%", transform: "translate(-70%,0%)", padding: "4px 6px", borderRadius: "50%", backgroundColor: "white", cursor: "pointer", border: "none", fontWeight: "900" }} onClick={() => {
                                        setSelectedImage(null)
                                        // setClasss("")
                                    }}>X</button>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="items">
                        <div className={`upload-btn-wrapper`}>
                            <button className="btns" >Upload a Photos</button>
                            <input type="file" id="finput" name="postfile" onChange={(event) => {
                                // setClasss("none")
                                console.log(event.target.files[0]);
                                setSelectedImage(event.target.files[0]);
                            }} />
                        </div>
                    </div>
                    <div className="items">
                        <button className="btn third" style={{ display: "unset" }} onClick={(e) => postMessage(e)}>Post</button>
                    </div>
                </form>
            </div>
            <div className="postdisplay">
                {data.map((item, i) => (
                    <div className="card" key={i} style={{ marginTop: '20px' }}>
                        <div className="f-card">
                            <div className="header">
                                <div className="options"><i className="fa fa-chevron-down"></i></div>
                                {/* <img className="co-logo" src="http://placehold.it/40x40" /> */}
                                <div className="co-logo" style={{ textTransform: 'capitalize', backgroundColor: "black", color: 'white', display: 'flex', justifyContent: 'center', alignItems: "center", borderRadius: '50%', fontWeight: '600' }}>{item.username[0]}</div>

                                <div className="co-name"><div  style={{ textTransform: 'capitalize',cursor:"pointer" }} onClick={(e)=>{navigate(`/profile:${item.username}`)}}>{item.username}</div></div>
                                
                                <div className="time"><a href="/">{new Date(item.date).toDateString()}</a> · <i className="fa fa-globe"></i></div>
                            </div>
                            <div className="content">
                                <p>{item.text} </p>
                            </div>
                            <div className="social">
                                <div className="social-content"></div>
                                <div className="social-buttons">
                                    <span onClick={(e)=>like(e)} className={i} ><ThumbUpIcon style={{fontSize:"17px",marginRight: "4px"}} />Like {item.like.length}</span>
                                    <span><i className="fa fa-comment"></i>Comment</span>
                                    {/* <span><i className="fa fa-share"></i>Share</span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default CreatePost;