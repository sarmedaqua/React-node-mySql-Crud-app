import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Update = () => {
  const [user, setUser] = useState({
    username: "",
    name: "",
    email: "",
  });
  const [error,setError] = useState(false)

  const location = useLocation();
  const navigate = useNavigate();

  const userId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/users/${userId}`, user);
      navigate("/");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <div className="form">
      <h1>Update the User</h1>
      <input
        type="text"
        placeholder="User username"
        name="username"
        onChange={handleChange}
      />
      <input
        type="text"
        placeholder="User name"
        name="name"
        onChange={handleChange}
      />
    
      <input
        type="email"
        placeholder="User email"
        name="email"
        onChange={handleChange}
      />
      <button onClick={handleClick}>Update</button>
      {error && "Something went wrong!"}
      <Link to="/">See all users</Link>
    </div>
  );
};

export default Update;
