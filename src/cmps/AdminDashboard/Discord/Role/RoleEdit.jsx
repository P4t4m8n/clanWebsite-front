
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { roleService } from "../../../../service/discord.role.service";
import { useForm } from "../../../../customHooks/useForm";
import { Link } from "react-router-dom";

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
            navigate('/')
        } catch (err) { console.log(err) }
    }


    if (!fields) return <div>...Loading Role</div>
    const { name, permissions, color, hoist, position } = fields
    const permissionsName = roleService.getPermissionsNames()

    return (
        <section className="role-edit">
            <form onSubmit={saveRole}>
                <input type="text" name="name" value={name} placeholder="enter role name" onChange={handleChange} />
                <input type="color" name="color" value={color} onChange={handleChange} />
                <label htmlFor="hoist">hoist?</label>
                <input type="checkbox" name="hoist" id="hoist" value={hoist} onChange={handleChange} checked={hoist} />
                <input type="number" name="position" value={position} onChange={handleChange} />

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
