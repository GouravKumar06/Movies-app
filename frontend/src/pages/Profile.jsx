import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { server } from "../server";
import { useNavigate } from "react-router";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();


    const submitHandler = async(e) => {
        e.preventDefault();
        
        if(password !== confirmPassword) {
            toast.error("Passwords do not match");
        } else {
            await axios.put(`${server}/user/update-user`, {
                username,
                email,
                password,
            },{withCredentials:true}).then((res) => {
                toast.success(res.data.message);
                navigate("/")
                window.location.reload();
            }).catch((error) => {
                toast.error(error.response.data.message);
            })
        }
    };

  return (
    <div>
      <div className="container mx-[-14rem] p-4 mt-[3rem]">
        <div className="flex justify-center align-center md:flex md:space-x-4">
          <div className="md:w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

            <form onSubmit={submitHandler}>
              <div className="mb-4">
                <label className="block text-white mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="form-input p-4 rounded-sm w-full"
                  value={user?.username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="form-input p-4 rounded-sm w-full"
                  value={user?.email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">Password</label>
                <input
                  type="password"
                  placeholder="Enter password"
                  className="form-input p-4 rounded-sm w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label className="block text-white mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="form-input p-4 rounded-sm w-full"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-teal-500 w-screen mt-[2rem] font-bold text-white py-2 px-4 rounded hover:bg-teal-600"
                >
                  Update
                </button>

              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;