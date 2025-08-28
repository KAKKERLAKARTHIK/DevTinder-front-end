import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import UserCard from "../feed/UserCard";
import { useUpdadeProfileMutation } from "../profileApi/profile";
import { loginData } from "../slice/userSlice";
// import { useUpdateProfileMutation } from "../profileApi/profileApi"; // ⬅️ if you have API
// import { updateUser } from "../slice/userSlice"; // ⬅️ redux action

export default function EditProfile() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state?.userProfile?.user);
    const [updateProfile] = useUpdadeProfileMutation();

    const [formData, setFormData] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        // password: user?.password || "",
        age: user?.age || "",
        gender: user?.gender || "",
        about: user?.about || "",
        avatarUrl: user?.avatarUrl || "",
    });
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try { 
            const res = await updateProfile(formData).unwrap();
          
            if(!res)return
           dispatch(loginData(formData));

            toast.success("Profile updated successfully!", { theme: "dark" });
        } catch (error) {
            toast.error(error?.data || "Something went wrong", { theme: "dark" });
        }
    };
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        // password: user?.password || "",
        age: user?.age || "",
        gender: user?.gender || "",
        about: user?.about || "",
        avatarUrl: user?.avatarUrl || "",
      });
    }
  }, [user]);
    return (
        <div className="flex justify-center">

            <form onSubmit={handleSubmit}>
                <div className="flex justify-center mt-10">
                    <div className="card card-border bg-base-100 w-[500px]">
                        <div className="card-body">
                            <h2 className="card-title">Edit Profile</h2>

                            {/* First Name */}
                            <div className="my-2">
                                <label className="label">
                                    <span className="label-text">First Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className="input input-bordered w-full"
                                    placeholder="Enter first name"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Last Name */}
                            <div className="my-2">
                                <label className="label">
                                    <span className="label-text">Last Name</span>
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="input input-bordered w-full"
                                    placeholder="Enter last name"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Password
                            <div className="my-2">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    className="input input-bordered w-full"
                                    placeholder="Enter new password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </div> */}

                            {/* Age */}
                            <div className="my-2">
                                <label className="label">
                                    <span className="label-text">Age</span>
                                </label>
                                <input
                                    type="number"
                                    name="age"
                                    className="input input-bordered w-full"
                                    placeholder="Enter age"
                                    value={formData.age}
                                    onChange={handleChange}
                                />
                            </div>

                            {/* Gender */}
                            <div className="my-2">
                                <label className="label">
                                    <span className="label-text">Gender</span>
                                </label>
                                <select
                                    name="gender"
                                    className="select select-bordered w-full"
                                    value={formData.gender}
                                    onChange={handleChange}
                                >
                                    <option value="" disabled>
                                        Select Gender
                                    </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {/* About */}
                            <div className="my-2">
                                <label className="label">
                                    <span className="label-text">About</span>
                                </label>
                                <textarea
                                    name="about"
                                    className="textarea textarea-bordered w-full"
                                    placeholder="Write something about yourself"
                                    value={formData.about}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            {/* Photo URL */}
                            <div className="my-2">
                                <label className="label">
                                    <span className="label-text">Profile Photo URL</span>
                                </label>
                                <input
                                    type="text"
                                    name="avatarUrl"
                                    className="input input-bordered w-full"
                                    placeholder="Paste profile photo URL"
                                    value={formData.avatarUrl}
                                    onChange={handleChange}
                                />
                              
                            </div>

                            <div className="card-actions justify-end mt-0   ">
                                <button type="submit" onClick={handleSubmit} className="btn btn-primary">
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <UserCard data={formData} style={{marginLeft:"20px"}} />
        </div>
    );
}
