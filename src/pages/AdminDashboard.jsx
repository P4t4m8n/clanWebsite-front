import { useState } from "react";

import { RoleIndex } from "../cmps/AdminDashboard/Discord/Role/RoleIndex";
import { UserIndex } from "../cmps/AdminDashboard/User/UserIndex";

const DISCORD_ROLES = 'DISCORD_ROLES'
const USERS = 'USERS'



export function AdminDashboard() {
    const [cmp, setCmp] = useState(null)


    return (
        <section className="admin-dashboard">
            <nav>
                <button onClick={() => setCmp(DISCORD_ROLES)}>Discord Roles</button>
                <button onClick={() => setCmp(USERS)}>Members</button>
            </nav>
            <DynmicCmp cmp={cmp} />
        </section>
    )
}

function DynmicCmp(props) {
    switch (props.cmp) {
        case DISCORD_ROLES:
            return <RoleIndex {...props} />
        case USERS:
            return <UserIndex {...props} />

        default:
            break
    }
}