import { NavLink } from "react-router-dom";
import { userService } from "../service/user.service";
import { useSelector } from "react-redux";

export function AppHeader() {
    const user = useSelector(storeMoudle => storeMoudle.userMoudle.user)
    console.log("user:", user)
    return (
        <section className="app-header flex">
            <img src="https://res.cloudinary.com/dpnevk8db/image/upload/v1708023551/logo-removebg-preview_1_x3ba0d.png"></img>
            <nav className="flex">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/events">Events</NavLink>
                {(user && user.isAdmin) && <NavLink to="admin">Admin</NavLink>}
                <NavLink to="/units">Units</NavLink>
            </nav>
        </section>
    )
}