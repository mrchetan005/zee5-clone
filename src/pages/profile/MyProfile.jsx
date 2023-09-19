
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import './profile.css';
import Popup from "../../components/utils/Popup";

const MyProfile = () => {
    const { user } = useSelector(state => state.auth);
    const [updateProfile, setUpdateProfile] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [formData, setFormData] = useState({
        email: user?.email, name: user?.name
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
        setFormData({
            email: user?.email, name: user?.name
        });
        setShowPopup(true);
    }

    return (
        <div>
            <h2 className="pageTitle font-bold pb-8 mb-9 border-b-[1px] text-3xl border-b-[hsla(0,0%,48%,.2)]">{updateProfile ? 'Edit Profile' : 'My Profile'}</h2>
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
                                    value={formData?.name}
                                />
                                <TextField
                                    disabled
                                    name="email"
                                    label="Email"
                                    value={formData?.email}
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
                                <div className="flex gap-4 justify-center w-full h-12">
                                    <Button onClick={() => setUpdateProfile(false)} color="inherit" variant="outlined" className="flex-1"> Go Back</Button>
                                    <Button type="submit" color="inherit" variant="filled" sx={{ backgroundColor: '#8230c6', transition: 'all 0.3s ease-in-out', '&:hover': { backgroundColor: '#5c1695' } }} className="flex-1">Save Changes</Button>
                                </div>

                            </form>
                        </div>
                        : <div className="userDetails pt-8 flex ">
                            <div className="userImage h-20 w-20 rounded-full overflow-hidden">
                                {
                                    user.profileImage
                                        ? <img className="w-full h-full object-cover border-2 rounded-full border-[#8230c3]" src="src/assets/hero/hero3.webp" alt="profile" />
                                        : <div className="h-20 w-20 text-3xl flex items-center justify-center font-bold uppercase bg-[#8230c3]">GU</div>
                                }
                            </div>
                            <div className="userInfo mt-1 ml-4">
                                <h3 className="userName capitalize text-lg font-bold">{user?.name}</h3>
                                <p className="text-sm text-[#bdbdbd] ">{user?.email}</p>
                                <button onClick={() => setUpdateProfile(true)} className="editProfile text-sm text-[#a785ff]">Edit Profile</button>
                            </div>
                        </div>
                }

                <Popup message={'Something went wrong. Please try again later.'} isOpen={showPopup} onClose={() => setShowPopup(false)} />

            </div>
        </div>
    )
}

export default MyProfile;