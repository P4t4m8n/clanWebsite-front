import { useNavigate, useParams } from "react-router"
import { useForm } from "../../../customHooks/useForm"
import { userService } from "../../../service/user.service"
import { useEffect } from "react"

export function UserEdit() {



    const [fields, setFields, handleChange] = useForm(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (params.userId)
            loadUser(params.userId)
    }, [params.userId])


    async function loadUser(userId) {
        try {
            const loadeduser = await userService.getById(userId)
            setFields(loadeduser)
        } catch (err) { console.log(err) }
    }

    async function saveUser(ev, userToSave = fields) {
        ev.preventDefault()
        try {
            await userService.update(userToSave)
            // navigate('/discord')
        } catch (err) { console.log(err) }
    }


    if (!fields) return <div>...Loading user</div>
    const { fullname, username, email, rank, medals, units, officerNots, position } = fields
    console.log("fields:", fields)

    return (
        <section className="user-edit">
            <form onSubmit={saveUser}>
                <input type="text" name="username" value={fullname} onChange={handleChange} />
                <input type="text" name="fullnam" value={username} onChange={handleChange} />
                <input type="email" name="email" value={email} onChange={handleChange} />

                <select multiple value={permissions} name="permissions" onChange={handleChange}>
                    <option value="">All</option>
                    <>
                        {permissionsName.map((permission, idx) => (
                            <option key={idx} value={permission}>{permission}</option>
                        ))}
                    </>
                </select>

                <button>Save</button>
            </form>
            <Link to={`/admin`}>Cancel</Link>
        </section>
    )

}