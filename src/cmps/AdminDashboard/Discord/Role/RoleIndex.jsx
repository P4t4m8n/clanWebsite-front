import {  useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { roleService } from "../../../../service/discord.role.service";
import { RoleList } from "./RoleList";

export function RoleIndex() {
    const [roles, setRoles] = useState(null)

    useEffect(() => {
        loadRoles()
    }, [])

    async function loadRoles() {
        try {
            const loadedRoles = await roleService.query()
            setRoles(loadedRoles)
        } catch (err) { console.log(err) }
    }

    const onRemoveRole = async (roleId) => {
        try {
            await roleService.remove(roleId)
            setRoles(prevRoles => {
                const idx = prevRoles.findIndex(role => role.id === roleId)
                return prevRoles.toSpliced(idx, 1)
            })
        } catch (err) { console.log(err) }
    }


    if (!roles) return <div>...Loading Roles</div>

    return (
        <section className="discord-manager">
            <Link to={"role/edit"}>Add role</Link>
            <RoleList roles={roles} onRemoveRole={onRemoveRole} />
            <Outlet />
        </section>
    )
}