import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/users");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  console.log(users);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/users/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Users</h1>
      <div className="users">
        {users.map((user) => (
          <div key={user.id} className="user">
            <h2>{user.username}</h2>
            <p>{user.name}</p>
            <span>{user.email}</span>
            <button className="delete" onClick={() => handleDelete(user.id)}>Delete</button>
            <button className="update">
              <Link
                to={`/update/${user.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new user
        </Link>
      </button>
    </div>
  );
};

export default Users;
