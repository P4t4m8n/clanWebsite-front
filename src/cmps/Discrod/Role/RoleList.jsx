import { Link } from "react-router-dom";


export function RoleList({ roles, onRemoveRole }) {
    return (
        <ul className="roles">
            {roles.map((role) =>
                <li className="role" key={role.id}>
                    {role.name}
                    <Link to={`role/edit/${role.id}`}>Edit</Link>
                    <Link to={`role/${role.id}`}>Details</Link>
                    <button onClick={() => onRemoveRole(role.id)}>Remove</button>
                </li>
            )}
        </ul>
    )
}