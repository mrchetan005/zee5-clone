
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBackIosRounded } from "@mui/icons-material";
import { IconButton } from '@mui/material';
// import './profile.css';
import Popup from "../utils/Popup";
import { updateInfo } from "../../store/slices/auth";
import Skeleton from "../utils/Skeleton";

const MyProfile = () => {
    const { user, loading, error } = useSelector(state => state.auth);
    const [updateProfile, setUpdateProfile] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const { width } = useSelector(state => state.windowSize);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: user?.name
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateInfo(formData));
        setUpdateProfile(false);
    }

    if (error) {
        setShowPopup(true);
    }

    return (
        <div>
            <div className="flex items-center gap-4 pb-8 mb-9 border-b-[1px] text-xl lg:text-3xl border-b-[hsla(0,0%,48%,.2)]">
                {
                    width < 900 && updateProfile &&
                    <IconButton color="inherit" onClick={() => setUpdateProfile(false)}>
                        <ArrowBackIosRounded />
                    </IconButton>
                }
                <h2 className="pageTitle font-bold">{updateProfile ? 'Edit Profile' : 'My Profile'}</h2>
            </div>
            <div>
                {
                    updateProfile
                        ? <div className="profile">
                            <form onSubmit={handleSubmit} className="form flex flex-col gap-4 ">
                                <TextField
                                    onChange={handleOnChange}
                                    type="text"
                                    name="name"
                                    label="Your Full Name"
                                    variant="outlined"
                                    autoComplete="off"
                                    value={formData?.name}
                                />
                                <TextField
                                    disabled
                                    name="email"
                                    label="Email"
                                    value={user?.email}
                                />
                                <TextField
                                    onChange={handleOnChange}
                                    name="profileImage"
                                    label="Profile Image"
                                    type="file"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <div className="flex gap-4 justify-center lg:justify-start h-12">
                                    {
                                        width >= 900 &&
                                        <Button onClick={() => setUpdateProfile(false)} color="inherit" variant="outlined" className="lg:flex-1">Go Back</Button>
                                    }
                                    <Button type="submit" color="inherit" variant="filled" sx={{ backgroundColor: '#8230c6', transition: 'all 0.3s ease-in-out', '&:hover': { backgroundColor: '#5c1695' } }} className="lg:flex-1">Save Changes</Button>
                                </div>

                            </form>
                        </div>
                        : loading
                            ? <div className="max-h-32 overflow-hidden"><Skeleton /></div>
                            : (<div className="userDetails pt-8 flex">
                                <div className="userImage h-20 w-20 rounded-full overflow-hidden">
                                    {
                                        user.profileImage
                                            ? <img className="w-full h-full object-cover border-2 rounded-full border-[#8230c3]" src="src/assets/hero/hero3.webp" alt="profile" />
                                            : <div className="h-20 w-20 text-3xl flex items-center justify-center font-bold uppercase bg-[#8230c3]">{user?.name?.[0]}</div>
                                    }
                                </div>
                                <div className="userInfo mt-1 ml-4">
                                    <h3 className="userName capitalize text-lg font-bold">{user?.name}</h3>
                                    <p className="text-sm text-[#bdbdbd] ">{user?.email}</p>
                                    <button onClick={() => setUpdateProfile(true)} className="editProfile text-sm text-[#a785ff]">Edit Profile</button>
                                </div>
                            </div>)
                }

                <Popup message={'Something went wrong. Please try again later.'} isOpen={showPopup} onClose={() => setShowPopup(false)} />

            </div>
        </div>
    )
}

export default MyProfile;