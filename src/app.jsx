import React, { useState, useEffect } from 'react'
import api from './api'
import Users from './components/users'

const App = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data))
    }, [users])

    const usersCount = users.length

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user !== userId))
    }

    const handleToggleBookMark = (userId) => {
        const updatedState = [...users]
        const userFoundById = updatedState.find((user) => user._id === userId)
        userFoundById.bookmark = !userFoundById.bookmark
        setUsers(updatedState)
    }

    if (usersCount === 0) {
        return (
            <span className="badge bg-danger p-2 m-2 fs-5">
                Никто с тобой не тусанет :(
            </span>
        )
    }

    return (
        <>
            {users && (
                <Users
                    users={users}
                    onDelete={handleDelete}
                    onToggleBookMark={handleToggleBookMark}
                />
            )}
        </>
    )
}

export default App
