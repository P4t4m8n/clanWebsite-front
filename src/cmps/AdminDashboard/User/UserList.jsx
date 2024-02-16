import { Link } from "react-router-dom"
import { userService } from "../../../service/user.service"


export function UserList({ users,onRemoveUser }) {
    userService
    return (
        <ul className="users grid">
            <li className="users-head grid">
                <h5>#</h5>
                <h5>Callsign</h5>
                <h5>Full Name</h5>
                <h5>Rank</h5>
            </li>
            {users.map(user =>
                <li key={user._id} className="user grid">
                    <img src={user.imgUrl}></img>
                    <h5>{user.username}</h5>
                    <h5>{user.fullname}</h5>
                    <div className="rank grid">
                        <img src={user.rank.imgUrl}></img>
                        <h5>{user.rank.type}</h5>
                        <p>Time in Rank:{userService.getTimeSince(user.rank.createdAt)}</p>
                    </div>

                    <div className="user-actions">
                        <Link to={`user/edit/${user._id}`}>Edit</Link>
                        <Link to={`user/${user._id}`}>Details</Link>
                        <button onClick={() => onRemoveUser(user._id)}>Remove</button>
                    </div>

                </li>)}
        </ul>
    )
}