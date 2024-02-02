import { NavLink } from "react-router-dom";

export function AppHeader() {
    return (
        <section className="app-hedaer">
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/events">Events</NavLink>
                <NavLink to="/units">Units</NavLink>
                <NavLink to="/Calender">Calender</NavLink>
            </nav>
        </section>
    )
}