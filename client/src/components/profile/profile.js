import React, { useCallback, useEffect, useState } from "react";
import './profile.css'
import Navbar from "../navbar/navbar";
import { useNavigate, useParams } from "react-router-dom";



const Profile = () => {

    const navigate = useNavigate()

    const { username } = useParams()
    const [postdata, setPostData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [state, setState] = useState(false)
    const [followed, setfollow] = useState(false)

    const getData = useCallback(async () => {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/profile`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                username
            })
        })

        const result = await res.json()
        if (res.status === 200) {
            setPostData(result.message[0])
            setUserData(result.message[1])

            for (let i = 0; i < result.message[1][0].followers.length; i++) {
                const element = result.message[1][0].followers[i];
                if (element === localStorage.getItem('username')) {
                    setfollow(true)
                } else {
                    setfollow(false)
                }
            }
        }
    }, [setPostData, username, setfollow])

    useEffect(() => {
        getData()
        // console.log(username.split(':')[1])
        if (username.split(':')[1] === localStorage.getItem('username')) {
            setState(false)
        } else {
            setState(true)
        }
    }, [getData, username, setState, followed])

    const follow = async (data) => {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/follow`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                data
            })
        })

        // const result = await res.json();
        if (res.status === 200) {
            getData()
        }
    }

    const unfollow = async (data) => {
        const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/unfollow`, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                data
            })
        })

        // const result = await res.json();
        if (res.status === 200) {
            getData()
            for (let i = 0; i < userData[0].followers.length; i++) {
                const element = userData[0].followers[i];
                if (element === localStorage.getItem('username')) {
                    setfollow(true)
                } else {
                    setfollow(false)
                }
            }
        }
    }

    return (
        <>
            <Navbar />
            <div className="profile">
                {userData.map((item, i) => (
                    <div className="wrapper" key={i}>
                        <div className="profile-card js-profile-card">
                            <div className="profile-card__img">
                                <div style={{ textTransform: 'capitalize', backgroundColor: "black", color: 'white', display: 'flex', justifyContent: 'center', alignItems: "center", borderRadius: '50%', fontWeight: '600', height: '100%', fontSize: '100px' }}>{item.username[0]}</div>
                            </div>

                            <div className="profile-card__cnt js-profile-cnt">
                                <div className="profile-card__name" style={{ textTransform: 'capitalize' }}>{item.username}</div>

                                <div className="profile-card-inf">
                                    <div className="profile-card-inf__item">
                                        <div className="profile-card-inf__title">{item.followers.length}</div>
                                        <div className="profile-card-inf__txt">Followers</div>
                                    </div>

                                    <div className="profile-card-inf__item">
                                        <div className="profile-card-inf__title">{item.follwing.length}</div>
                                        <div className="profile-card-inf__txt">Following</div>
                                    </div>

                                    <div className="profile-card-inf__item">
                                        <div className="profile-card-inf__title">{postdata.length}</div>
                                        <div className="profile-card-inf__txt">Posts</div>
                                    </div>

                                </div>

                                {/* <button className="profile-card__button button--blue js-message-btn">Message</button> */}
                                {state ? (<div className="profile-card-ctr">
                                    {
                                        followed ? (<button className="profile-card__button button--orange" onClick={(e) => { unfollow(item.username) }}>Unfollow</button>) : (
                                            <button className="profile-card__button button--orange" onClick={(e) => { follow(item.username) }}>Follow</button>)
                                    }
                                </div>) : (null)}
                            </div>

                            <div className="profile-card-message js-message">
                                <form className="profile-card-form">
                                    <div className="profile-card-form__container">
                                        <textarea placeholder="Say something..."></textarea>
                                    </div>

                                    <div className="profile-card-form__bottom">
                                        <button className="profile-card__button button--blue js-message-close">
                                            Send
                                        </button>

                                        <button className="profile-card__button button--gray js-message-close">
                                            Cancel
                                        </button>
                                    </div>
                                </form>

                                <div className="profile-card__overlay js-message-close"></div>
                            </div>

                        </div>

                    </div>
                ))}


            </div>
            <div className="postdisplay">
                {postdata.map((item, i) => (
                    <div className="card" key={i} style={{ marginTop: '20px' }}>
                        <div className="f-card">
                            <div className="header">
                                <div className="options"><i className="fa fa-chevron-down"></i></div>
                                {/* <img className="co-logo" src="http://placehold.it/40x40" /> */}
                                <div className="co-logo" style={{ textTransform: 'capitalize', backgroundColor: "black", color: 'white', display: 'flex', justifyContent: 'center', alignItems: "center", borderRadius: '50%', fontWeight: '600' }}>{item.username[0]}</div>
                                <div className="co-name"><div style={{ textTransform: 'capitalize', cursor: "pointer" }} onClick={(e) => { navigate(`/profile:${item.username}`) }}>{item.username}</div></div>
                                <div className="time"><a href="/">{new Date(item.date).toDateString()}</a> · <i className="fa fa-globe"></i></div>
                            </div>
                            <div className="content">
                                <p>{item.text} </p>
                            </div>
                            <div className="social">
                                <div className="social-content"></div>
                                <div className="social-buttons">
                                    <span><i className="fa fa-thumbs-up"></i>Like</span>
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

export default Profile;