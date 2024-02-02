import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { logout } from "../../store/actions/user.actions";
import { SignIn } from "./SignIn";
import { UserPreview } from "./UserPreview";


export function UserManager() {

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

        <>
            {!currUser && <SignIn></SignIn>}
            {currUser && <UserPreview currUser={currUser} onLogout={onLogout}></UserPreview>}
        </>

    )
}