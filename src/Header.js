import React from 'react'
import Headeroptions from './Headeroptions';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import MessageIcon from '@material-ui/icons/Message';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Avatar, Button, Menu, MenuItem } from "@material-ui/core"
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import "./css/header.css"
import firebase from "firebase"



function Header() {
    const navigate = useNavigate();
    const user = useSelector(selectUser);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleClose()
        firebase.auth().signOut()
    }
    const handleMyProfile = () => {
        handleClose();
        navigate('/profile')
    }
    return (
        <div className="header">
            <div className="header__left">
                <Link to='/'>
                    <div className="header__logo">
                        <img src="https://www.seekpng.com/png/detail/371-3715298_advertise-on-linkedin-linkedin-logo-no-background.png" />
                    </div>
                </Link>
            </div>

            <div className="header__right">
                <Headeroptions link={'/'} Icon={HomeIcon} title="Home" />
                <Headeroptions Icon={PeopleIcon} title="My Network" />
                <Headeroptions Icon={BusinessCenterIcon} title="Jobs" />
                <Headeroptions Icon={MessageIcon} title="Messaging" />
                <Headeroptions Icon={NotificationsIcon} title="Notification" />
                <Button
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    style={{padding:"0px",margin:"0px"}}
                >
                    <div className="header__options">
                        <Avatar name={Avatar} src={user.photoURL} />
                        <span>{user.displayName}</span>
                    </div>
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={handleMyProfile}>My Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
            </div>
        </div>
    )
}

export default Header

