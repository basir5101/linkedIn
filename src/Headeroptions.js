import React from 'react'
import "./css/header.css"
import { Avatar } from "@material-ui/core"
import { useSelector } from 'react-redux'
import { selectUser } from './features/userSlice'
import firebase from "firebase"
import { Link } from 'react-router-dom'
function Headeroptions({ Icon, title, avatar, link }) {

    const user = useSelector(selectUser)
    return (
        <div className="header__options">
            <Link className='className="header__options"' to={link || '#'}>
                {
                    Icon && <Icon></Icon>
                }
                {

                    avatar && <Avatar name={avatar} src={user.photoURL} onClick={e => firebase.auth().signOut()} />
                }
                <span>{title}</span>
            </Link>
        </div>
    )
}

export default Headeroptions
