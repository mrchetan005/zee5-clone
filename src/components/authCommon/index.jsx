/* eslint-disable react/prop-types */

import GoogleIcon from "@mui/icons-material/Google";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import { Button, Checkbox, Divider, IconButton, TextField, Typography, } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "../../store/slices/user";
import { isUserLoggedIn, loginUser } from "../../store/slices/auth";

const Sign = ({ details }) => {
    const { title, subtitle, type } = details;

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading: authLoading, authenticated, error } = useSelector(state => state.auth);

    const { loading: userLoading, error: userError } = useSelector(state => state.user);

    const { status } = useSelector(state => state.user);

    const [formData, setFormData] = useState({
        checked: true, name: '', email: '', password: ''
    });

    const [formErrors, setFormErrors] = useState({
        name: '', email: '', password: ''
    });

    const handleOnBlur = (e) => {
        const { name, value } = e.target;
        let msg = value ? '' : `${name} is required`;
        if (!value) {
            msg = `${name} is required`;
        } else if (type === 'register') {
            if (name === 'name') {
                msg = value.length >= 3 ? '' : `${name} should contain atleast 3 letters`;
            } else if (name === 'email') {
                const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                msg = (value.toLowerCase().match(emailRegex)) ? '' : 'enter a valid email';
            } else if (name === 'password') {
                msg = value.length >= 6 ? '' : `password should contain atleast 6 letters`;
            }
        }

        setFormErrors(prev => ({
            ...prev,
            [name]: msg
        }));
    }

    const handleOnChange = (e) => {
        let { name, value } = e.target;
        if (name === 'checked') {
            value = e.target.checked;
        }
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        handleOnBlur(e);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (authLoading || userLoading) return;
        if (type === 'register') {
            if (!formData.checked) return;
            if (Object.keys(formErrors).reduce((accum, curr) => accum + formErrors[curr], '') === '') {
                const { name, email, password } = formData;
                dispatch(signUpUser({ name, email, password, appType: 'ott' }));
            }
        } else if (type === 'signin') {
            if (Object.keys(formErrors).reduce((accum, curr) => accum + formErrors[curr], '') === '') {
                const { email, password } = formData
                dispatch(loginUser({ email, password, appType: 'ott' }));
            }
        }
    };

    useEffect(() => {
        if (type === 'register' && status === 'success') {
            return navigate('/signin');
        }
        dispatch(isUserLoggedIn());
        if (authenticated) {
            return navigate('/');
        }
    }, [authenticated, type, status, navigate, dispatch]);

    return (
        <div className={`bg-black fixed inset-0 z-[1000] flex justify-center items-center h-screen`}>
            <div
                className={`m-auto my-20px w-96 text-center text-black bg-white rounded-2xl  py-5 px-1`}
            >
                <div className="flex flex-col gap-3">
                    <Typography variant="h5" fontFamily={`Noto Sans, sans-serif`} fontWeight={600} color='#333'>{title}</Typography>
                    <p className="text-[#4f4f4f]">{subtitle}</p>
                    <div className="flex gap-4 justify-center items-center">
                        <Link>
                            <IconButton className="shadow-md">
                                <GoogleIcon sx={{ color: "red", fontSize: 36 }} />
                            </IconButton>
                        </Link>
                        <Link>
                            <IconButton className="shadow-md">
                                <FacebookIcon sx={{ color: "blue", fontSize: 36 }} />
                            </IconButton>
                        </Link>
                        <Link>
                            <IconButton className="shadow-md">
                                <TwitterIcon sx={{ color: "deepskyblue", fontSize: 36 }} />
                            </IconButton>
                        </Link>
                        <Link>
                            <IconButton className="shadow-md">
                                <AppleIcon sx={{ color: "black", fontSize: 36 }} />
                            </IconButton>
                        </Link>
                    </div>
                </div>
                <div className="my-5 flex justify-center items-center">
                    <Divider className="w-[45%]"></Divider>
                    <span className="h-10 bg-[#f9f9f9]  flex items-center justify-center w-10 mx-2 px-3 rounded-[50%] border-[#cdcdcd] border-[1px] font-medium ">
                        or
                    </span>
                    <Divider className="w-[45%]"></Divider>
                </div>

                <form className="mx-8 flex flex-col gap-5" onSubmit={handleSubmit}>
                    {
                        type === 'register' &&
                        <>
                            <TextField
                                label="Name"
                                type="text"
                                variant="outlined"
                                fullWidth
                                name="name"
                                required
                                value={formData.name}
                                onBlur={handleOnBlur}
                                onChange={handleOnChange}
                                error={!!formErrors.name}
                                helperText={formErrors.name}
                            />
                        </>
                    }

                    <TextField
                        label="Email"
                        type="email"
                        variant="outlined"
                        fullWidth
                        name="email"
                        required
                        value={formData.email}
                        onBlur={handleOnBlur}
                        onChange={handleOnChange}
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        variant="outlined"
                        fullWidth
                        name="password"
                        required
                        value={formData.password}
                        onBlur={handleOnBlur}
                        onChange={handleOnChange}
                        error={!!formErrors.password}
                        helperText={formErrors.password}
                    />

                    {
                        type === 'signin' &&
                        <div className="flex justify-end">
                            <Typography variant="p" fontFamily={`Noto Sans, sans-serif`} fontWeight={400} color='#333' fontSize={15}>
                                <Link className="ml-2 text-[#a785ff]" to={`/signin`}>forgot password?</Link>
                            </Typography>
                        </div>
                    }


                    {
                        type === 'register' &&
                        <>
                            <div className="flex">
                                <Checkbox
                                    id="checkbox"
                                    name='checked'
                                    label="By proceeding you agree to our Terms of Services & Privacy Policy."
                                    checked={formData.checked}
                                    onChange={handleOnChange}
                                    inputProps={{ "aria-label": "controlled" }}
                                />
                                <label htmlFor="checkbox" className="text-[#4f4f4f] text-sm">By proceeding you agree to our
                                    <Link className="ml-2 text-[#a785ff]" >
                                        Terms of Services
                                    </Link> &
                                    <Link className="ml-2 text-[#a785ff]">
                                        Privacy Policy
                                    </Link>.
                                </label>
                            </div>
                        </>
                    }

                    <Button className={`w-full`} type='submit' sx={{
                        backgroundColor: '#8230c6',
                        fontSize: '12px',
                        fontWeight: 600,
                        borderRadius: '7px',
                        color: 'white',
                        transition: 'all 0.3s ease-in',
                        '&:hover': {
                            backgroundColor: '#5c1695',
                        },
                    }}
                        color="inherit">
                        {
                            authLoading || userLoading
                                ? <>
                                    <div className="loader"></div>
                                </>
                                : <span className="p-1 capitalize text-base">
                                    {type == 'register' ? 'Create account' : 'Login'}
                                </span>
                        }
                    </Button>

                    <Typography variant="p" fontSize={15} fontFamily={`Noto Sans, sans-serif`} fontWeight={500} color='#333'>
                        {type == 'register' ? 'Already registered?' : 'New to ZEE5?'}
                        <Link className="ml-2 text-[#a785ff]" to={`/${type == 'signin' ? 'register' : 'signin'}`}>{type == 'signin' ? 'Register' : 'Login'}</Link>
                    </Typography>
                </form>
                <p className="text-red-600 text-sm pt-4">
                    {
                        type === 'register' ? userError : error
                    }
                </p>
                {
                    type === 'signin' &&
                    <div className="note mx-4 border p-4 border-[hsla(0,0%,100%,.55)] ">
                        <p className="text-base text-[#7aac2a]">Demo Account - test1@test.com </p>
                        <p className="text-base text-[#7aac2a]">Password - 123456</p>
                    </div>
                }


            </div>
        </div>
    );
};

export default Sign;


