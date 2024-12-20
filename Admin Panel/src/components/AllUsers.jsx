import React, { useEffect, useState } from 'react'
import moment from 'moment'; // Ensure to install moment with `npm install moment`

function AllUsers() {
    const BACKEND_PORT = 'http://localhost:5500';
    const [users, setUsers] = useState([]);

    // Fetch users
    useEffect(() => {
        fetch(`${BACKEND_PORT}/auth/users`)
            .then(res => res.json())
            .then(data => setUsers(data.users || []));
    }, []);

    // Check if a user was created within the last 5 days
    const isNewUser = (userCreationDate) => {
        const fiveDaysAgo = moment().subtract(5, 'days');
        return moment(userCreationDate).isAfter(fiveDaysAgo);
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-gray-900">All Users</h1>
            <ul className="space-y-4">
                {users.length > 0 ? (
                    users.map(user => (
                        <li
                            key={user._id}
                            className="flex items-center bg-gray-900 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Profile Picture */}
                            <img
                                src={`${user.profilePicture}`}
                                alt={`${user.name}'s profile`}
                                className="w-12 h-12 rounded-full mr-4 border-2 border-white"
                            />
                            
                            {/* User Details */}
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold text-white">{user.name}</h2>
                                <p className="text-sm text-gray-400">{user.email}</p>
                            </div>

                            {/* New User Badge */}
                            {isNewUser(user.createdAt) && (
                                <span className="ml-4 text-xs bg-green-500 text-white px-2 py-1 rounded-full animate-pulse">
                                    New
                                </span>
                            )}
                        </li>
                    ))
                ) : (
                    <p className="text-gray-400">No users found.</p>
                )}
            </ul>
        </div>
    );
}

export default AllUsers;
