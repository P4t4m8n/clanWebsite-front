import { useEffect } from "react"
import { useState } from "react"
import { userService } from "../../../service/user.service"
import { UserList } from "./UserList"
import { Outlet } from "react-router"



export function UserIndex() {

    const [users, setUsers] = useState(null)

    useEffect(() => {
        loadUsers()
    }, [])

    async function loadUsers() {
        try {
            const loadedUsers = await userService.query()
            setUsers(loadedUsers)
        } catch (err) { console.log(err) }
    }



    const onRemoveUser = async (userId) => {
        try {
            await userService.remove(userId)
            loadUsers()
        } catch (err) { console.log(err) }
    }

    if (!users) return <div>...Loading users</div>
    console.log("users:", users)
    return (
        <section className="user-index">
            <UserList users={users} onRemoveUser={onRemoveUser} />
            <Outlet />
        </section>
    )


}
