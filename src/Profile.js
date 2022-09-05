import { Avatar, Box, Button, Card, CardActionArea, CardContent, CardMedia, Link, Modal, TextField, Typography } from '@material-ui/core';
import { Add, Edit } from '@material-ui/icons';
import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUser } from './features/userSlice';

export default function Profile() {
    const user = useSelector(selectUser);

    const dispatch = useDispatch();
    const [userData, setUserData] = useState(user)

    const [userInfo, setUserInfo] = useState({
        ...user,
        education: [
        ],
        certifications: [
        ],
    });



    // edit user 
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const userDataChange = (e) => {
        const { name, value } = e.target;
        let newData = { ...userData };
        newData[name] = value;
        setUserData(newData);
    }


    // edit about
    const [aboutOpen, setAboutOpen] = React.useState(false);
    const handleAboutOpen = () => setAboutOpen(true);
    const handleAboutClose = () => setAboutOpen(false);
    const handleAboutSave = () => {
        handleAboutClose()
    }

    // more data handle
    const [openModal, setOpenModal] = React.useState(false);
    const [moreFormData, setMoreFormData] = React.useState({});
    const [addNewData, setAddNewData] = React.useState({
        title: "",
        company: "",
        time: ""
    })
    const handleModalOpen = (type, index, data) => {
        setAddNewData({ ...addNewData, type: type })
        if (data) {
            const newData = { ...moreFormData };
            newData.type = type;
            newData.index = index;
            newData.data = data;
            setMoreFormData(newData);
        } else {
            setMoreFormData({
                type: type,
                index: "",
                data: {
                    title: "",
                    company: "",
                    time: ""
                }
            })
        }
        setOpenModal(true);
    }
    const handleModalClose = () => setOpenModal(false);


    const handleChangeMoreData = (e) => {
        const { name, value } = e.target;
        const { type, index, } = moreFormData;
        console.log(user, type, addNewData);
        let newData = { ...user };
        if (index === "") {
            let newInfo = { ...addNewData };
            setAddNewData({ ...addNewData, [name]: value })
            newInfo[name] = value;
            newData[type] = [...newData[type], addNewData];
        } else {
            console.log(type, index, name, value);
            // newData = { ...user };
            newData[type][index][name] = value;
        }
        setUserData(newData);
    }


    const handleDeleteMoreData = (type, index) => {
        const newData = { ...user };
        console.log(newData);
        console.log('type', type, index);
        newData[type].splice(index, 1);

        //  dispatch(updateUser(newData));
        //handleModalClose()
    }


    const handleSave = () => {
        console.log(userData);
        dispatch(updateUser(userData))
        handleClose()
    }

    const handleSaveMoreData = () => {
        console.log('userData', userData);
        dispatch(updateUser(userData))
        handleModalClose()
        handleClose()
    }




    return (
        <div>
            <Box sx={{ mx: 25, backgroundColor: "white", borderRadius: "5px" }}>
                <Box sx={{ position: 'relative', paddingBottom: '25px', mb: 3 }}>

                    <Box sx={{ position: 'relative', }}>
                        <img src="https://www.klaviyo.com/wp-content/uploads/2016/09/abstract-background-1024x273.jpg" width="100%" />
                        <Avatar
                            src={user?.photoURL}
                            style={{ width: 150, height: 150, marginTop: "-70px", marginLeft: "15px" }}
                        >
                            {user?.photoURL}
                        </Avatar>
                        <Button
                            onClick={handleOpen}
                            variant="outlined"
                            style={{
                                position: 'absolute',
                                right: 100,
                                marginTop: 5,
                                textTransform: "capitalize"

                            }}
                        >
                            Edit Profile

                        </Button>

                    </Box>
                    <Box p={3}>
                        <Typography variant='h5'> {user.displayName} </Typography>
                        <Typography >{user.job}</Typography>
                        <Box display="flex" mt={4} alignItems="center">
                            <Typography
                                color="textSecondary"
                                variant="h6"
                                fontWeight="400"
                                style={{
                                    marginRight: '3px',
                                }}
                            >
                                {user.address}
                            </Typography>

                        </Box>

                    </Box>




                </Box>


                {/* about  */}

                {
                    user.about && <Box sx={{ position: 'relative', paddingBottom: '25px', mb: 3, border: '1px solid #E1E1E1' }}>
                        <Box p={2} display='flex' justifyContent={"space-between"}>
                            <Typography variant='h5' fontWeight={'700'}>About</Typography>
                        </Box>
                        <Box p={2}>
                            <Typography>{user?.about}</Typography>
                        </Box>
                        <Modal
                            open={aboutOpen}
                            onClose={handleAboutClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 400,
                                bgcolor: 'background.paper',
                                boxShadow: 24,
                                p: 4,
                            }}>
                                <Box
                                    sx={{
                                        mt: 4,
                                    }}
                                >

                                    <TextField style={{ marginBottom: 5, width: '100%' }} id="outlined-basic" onChange={userDataChange} name='about' label="about" variant="outlined" sx={{ pb: 4 }} />

                                    <Button
                                        color="primary"
                                        variant="contained"
                                        size="large"
                                        fullWidth
                                        onClick={handleAboutSave}
                                        sx={{
                                            mt: '10px',
                                            pt: '10px',
                                            pb: '10px',
                                        }}
                                    >
                                        save
                                    </Button>
                                </Box>
                            </Box>
                        </Modal>
                    </Box>
                }


                {/* experience  */}
                {
                    user.experience?.length > 0 && <Box sx={{ position: 'relative', paddingBottom: '25px', mb: 3, border: '1px solid #E1E1E1' }}>
                        <Box p={2} display='flex' justifyContent={"space-between"}>
                            <Typography variant='h6' fontWeight={'900'}>Experience</Typography>

                        </Box>
                        {
                            user?.experience?.length > 0 &&
                            user.experience.map((data, index) => (
                                <Box key={index} px={2} py={1} display="flex" alignItems="center" justifyContent={'space-between'}>
                                    <Box style={{ marginLeft: 10 }} display="flex" alignItems="center">

                                        <Box
                                            style={{
                                                ml: 2,
                                                "& a": {
                                                    background: 'green'
                                                }
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                style={{
                                                    lineHeight: '1.235',
                                                    fontWeight: '600'
                                                }}
                                            >

                                                {data.title}
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                style={{
                                                    lineHeight: '1.235',
                                                }}
                                            >

                                                {data.company}
                                            </Typography>
                                            <Typography color="textSecondary" variant="h6" fontWeight="400">
                                                {data.time}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            ))
                        }

                    </Box>
                }

                {/* education  */}
                {
                    user?.education.length > 0 && <Box sx={{ position: 'relative', paddingBottom: '25px', mb: 3, border: '1px solid #E1E1E1' }}>
                        <Box p={2} display='flex' justifyContent={"space-between"}>
                            <Typography variant='h5' fontWeight={'700'}>Education</Typography>

                        </Box>
                        {
                            user?.education?.length > 0 &&
                            user.education.map((data, index) => (
                                <Box key={index} px={2} py={1} display="flex" alignItems="center" justifyContent={'space-between'}>
                                    <Box style={{ marginLeft: 10 }} display="flex" alignItems="center">

                                        <Box
                                            style={{
                                                ml: 2,
                                                "& a": {
                                                    background: 'green'
                                                }
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                style={{
                                                    lineHeight: '1.235',
                                                    fontWeight: '600'
                                                }}
                                            >

                                                {data.title}
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                style={{
                                                    lineHeight: '1.235',
                                                }}
                                            >

                                                {data.company}
                                            </Typography>
                                            <Typography color="textSecondary" variant="h6" fontWeight="400">
                                                {data.time}
                                            </Typography>

                                        </Box>
                                    </Box>
                                </Box>
                            ))
                        }

                    </Box>
                }


                {/* certifications  */}
                {
                    user.certifications?.length > 0 && <Box sx={{ position: 'relative', paddingBottom: '25px', mb: 3, border: '1px solid #E1E1E1' }}>
                        <Box p={2} display='flex' justifyContent={"space-between"}>
                            <Typography variant='h5' fontWeight={'700'}>Licenses & Certifications</Typography>
                        </Box>
                        {
                            user?.certifications?.length > 0 &&
                            user.certifications.map((data, index) => (
                                <Box key={index} px={2} py={1} display="flex" alignItems="center" justifyContent={'space-between'}>
                                    <Box style={{ marginLeft: 10 }} display="flex" alignItems="center">
                                        <Box
                                            style={{
                                                ml: 2,
                                                "& a": {
                                                    background: 'green'
                                                }
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                style={{
                                                    lineHeight: '1.235',
                                                    fontWeight: '600'
                                                }}
                                            >

                                                {data.title}
                                            </Typography>
                                            <Typography
                                                variant="h6"
                                                style={{
                                                    lineHeight: '1.235',
                                                }}
                                            >

                                                {data.company}
                                            </Typography>
                                            <Typography color="textSecondary" variant="h6" fontWeight="400">
                                                {data.time}
                                            </Typography>

                                        </Box>
                                    </Box>
                                </Box>
                            ))
                        }

                    </Box>
                }


                {/* edit form  */}

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <Box
                            sx={{
                                mt: 4,
                            }}
                        >

                            <TextField style={{ marginBottom: 10, width: '100%' }} id="outlined-basic" onChange={userDataChange} name='name' label="Name" variant="outlined" sx={{ pb: 4 }} />
                            <TextField style={{ marginBottom: 10, width: '100%' }} id="outlined-basic" onChange={userDataChange} name='job' label="Job" variant="outlined" />
                            <TextField style={{ marginBottom: 10, width: '100%' }} id="outlined-basic" onChange={userDataChange} name='address' label="Address" variant="outlined" />
                            <TextField style={{ marginBottom: 10, width: '100%' }} id="outlined-basic" onChange={userDataChange} name='about' label="About" variant="outlined" />
                            <Box p={2} display='flex' justifyContent={"space-between"}>
                                <Typography variant='div' fontWeight={'700'}> Add Experience</Typography>
                                <Box>
                                    <Button
                                        onClick={() => handleModalOpen('experience')}
                                        color="secondary"
                                        variant="contained"
                                        size="small"
                                        style={{
                                            width: '30px',
                                            minWidth: '30px',
                                            height: '30px',
                                            borderRadius: '50%',
                                        }}
                                    >
                                        <Add />
                                    </Button>
                                </Box>
                            </Box>
                            <Box p={2} display='flex' justifyContent={"space-between"}>
                                <Typography variant='div' fontWeight={'700'}> Add Education</Typography>
                                <Box>
                                    <Button
                                        onClick={() => handleModalOpen('education')}
                                        color="secondary"
                                        variant="contained"
                                        size="small"
                                        style={{
                                            width: '30px',
                                            minWidth: '30px',
                                            height: '30px',
                                            borderRadius: '50%',
                                        }}
                                    >
                                        <Add />
                                    </Button>
                                </Box>
                            </Box>
                            <Box p={2} display='flex' justifyContent={"space-between"}>
                                <Typography variant='div' fontWeight={'700'}> Add Licenses & Certifications</Typography>
                                <Box>
                                    <Button
                                        onClick={() => handleModalOpen('certifications')}
                                        color="secondary"
                                        variant="contained"
                                        size="small"
                                        style={{
                                            width: '30px',
                                            minWidth: '30px',
                                            height: '30px',
                                            borderRadius: '50%',
                                        }}
                                    >
                                        <Add />
                                    </Button>
                                </Box>
                            </Box>
                            <Button
                                color="primary"
                                variant="contained"
                                size="large"
                                fullWidth
                                onClick={handleSave}
                                sx={{
                                    pt: '10px',
                                    pb: '10px',
                                }}
                            >
                                save
                            </Button>




                        </Box>
                    </Box>
                </Modal>

                {/* More data modal */}

                <Modal
                    open={openModal}
                    onClose={handleModalClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >

                    <Box sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                    }}>
                        <Box
                            sx={{
                                mt: 4,
                            }}
                        >

                            <TextField style={{ marginBottom: 10, width: '100%' }} onChange={handleChangeMoreData} label='Title' name='title' defaultValue={moreFormData?.data?.title} id="title" variant="outlined" fullWidth />
                            <TextField style={{ marginBottom: 10, width: '100%' }} onChange={handleChangeMoreData} label='Organization' name='company' defaultValue={moreFormData?.data?.company} id="company" variant="outlined" fullWidth />
                            <TextField style={{ marginBottom: 10, width: '100%' }} onChange={handleChangeMoreData} label="Duration" name='time' defaultValue={moreFormData?.data?.time} id="time" variant="outlined" fullWidth />

                            <Button
                                color="primary"
                                variant="contained"
                                size="large"
                                fullWidth
                                onClick={handleSaveMoreData}
                                sx={{
                                    pt: '10px',
                                    pb: '10px',
                                }}
                            >
                                save
                            </Button>

                            {
                                moreFormData?.data?.time && <Button
                                    color="secondary"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    onClick={() => handleDeleteMoreData(moreFormData.type, moreFormData.index)}
                                    sx={{
                                        pt: '10px',
                                        pb: '10px',
                                        mt: '10px'
                                    }}
                                >
                                    Delete {moreFormData.type}
                                </Button>
                            }



                        </Box>
                    </Box>
                </Modal>
            </Box>
        </div>
    )
}
