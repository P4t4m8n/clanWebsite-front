
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { roleService } from "../../../service/discord.role.service";
import { useForm } from "../../../customHooks/useForm";

export function RoleEdit() {

    const [fields, setFields, handleChange] = useForm(roleService.getEmptyrole())
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (params.roleId)
            loadRole(params.roleId)
    }, [params.roleId])


    async function loadRole(roleId) {
        try {
            const loadedRole = await roleService.get(roleId)
            setFields(loadedRole)
        } catch (err) { console.log(err) }
    }

    async function saveRole(ev, roleToSave = fields) {
        console.log("roleToSave:", roleToSave)
        ev.preventDefault()
        try {
            await roleService.save(roleToSave)
            navigate('/discord')
        } catch (err) { console.log(err) }
    }


    if (!fields) return <div>...Loading Role</div>
    const { name, permissions } = fields
    const permissionsName = roleService.getPermissionsNames()
    console.log("fields:", fields)

    return (
        <section className="role-edit">
            <form onSubmit={saveRole}>
                <input type="text" name="name" value={name} placeholder="enter role name" onChange={handleChange} />

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
        </section>
    )

}
