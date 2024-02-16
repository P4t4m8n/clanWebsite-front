import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logout } from "../../store/actions/user.actions";
import { SignIn } from "./SignIn";
import { UserPreview } from "./UserPreview";


export function UserManager() {

    const currUser = useSelector(storeState => storeState.userMoudle.user)
    const navigate = useNavigate()

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