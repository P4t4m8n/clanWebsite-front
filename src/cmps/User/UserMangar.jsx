import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { logout } from "../../store/actions/user.actions";
import { SignIn } from "./SignIn";
import { UserPreview } from "./UserPreview";


export function userManager() {


    const currUser = useSelector(storeState => storeState.userMoudle.user)

    async function onLogout(ev) {
        ev.preventDefault()
        try {
            await logout()
            navigate('/')
        }
        catch (err) {
            console.log(err)
        }
    }
    return (

        <section className="user">
            {!currUser && <SignIn></SignIn>}
            {currUser && <UserPreview currUser={currUser}></UserPreview>}
        </section>
    )
}