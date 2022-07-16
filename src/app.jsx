import React, {useState} from "react"
import api from "./api"
import Users from "./components/users"
import SearchStatus from "./components/searchStatus"

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll())

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user !== userId))
    }

    const handleToggleBookMark = (userId) => {
        const updatedState = [...users]
        const userFoundById = updatedState.find(user => user._id === userId)
        userFoundById.bookmark = !userFoundById.bookmark
        setUsers(updatedState)
    }

    if(users.length === 0) {
        return (
            <span className="badge bg-danger p-2 m-2 fs-5">Никто с тобой не тусанет :(</span>
        )
    }

    return (
        <>
            <SearchStatus length={users.length}/>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Оценка</th>
                    <th scope="col">Избранное</th>
                    <th />
                </tr>
                </thead>
                <tbody>
                <Users users={users} onDelete={handleDelete} onToggleBookMark={handleToggleBookMark}/>
                </tbody>
            </table>
        </>
    )
}

export default App