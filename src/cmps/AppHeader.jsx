import { NavLink } from "react-router-dom";

export function AppHeader() {
    return (
        <section className="app-header grid">
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/events">Events</NavLink>
                <NavLink to="/units">Units</NavLink>
                <NavLink to="/calender">Calender</NavLink>
            </nav>
        </section>
    )
}