import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { roleService } from "../../../../service/discord.role.service";


export function RoleDetails() {

    const [role, setRole] = useState(null)
    const params = useParams()
    console.log("params:", params)

    useEffect(() => {
        if (params.roleId)
            loadRole(params.roleId)
    }, [params.roleId])

    async function loadRole(roleId) {
        try {
            const loadedRole = await roleService.get(roleId)
            setRole(loadedRole)
        } catch (err) { console.log(err) }
    }


    if (!role) return <div>...Loading Role</div>
    const { name } = role
    console.log("role:", role)

    return (
        <section className="role-details">
            <h1>{name}</h1>
        </section>
    )

}