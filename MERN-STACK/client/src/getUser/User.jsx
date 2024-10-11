import React, { useEffect, useState } from 'react';
import './user.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const User = () => {

    const [users, setUsers] = useState([])
    useEffect(() => {
        const fetchData = async()=> {
            try {
                const response = await axios.get("http://localhost:8000/api/users");
                setUsers(response.data);
            } catch (error) {
                console.log("Error while fetching data", error)
            }
        };
        fetchData();
    }, []);

  return (
    <div className="userTable">
        <Link to="/add" type="button" class="btn btn-primary">
            Add User <i class="fa-solid fa-user-plus"></i>
        </Link>
        <table className="table table-bordered bg-dark text-bg-dark">
            <thead>
                <tr>
                    <th scope="col">Se.No</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => {
                    return (
                        <tr>
                        <td>{index+1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.address}</td>
                        <td className="actionButton">
                            <Link to={`/update/` + user._id} type="button" class="btn btn-info">
                                    <i class="fa-solid fa-pen-to-square"></i> 
                            </Link>
                            <button type="button" class="btn btn-danger">
                                  <i class="fa-solid fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                    )
                })}
               
            </tbody>
        </table>
    </div>
  )
}

export default User