import { useEffect, useRef, useState } from "react";
import { userService } from "../../service/user.service";
import { unitService } from "../../service/unit.service";
import { signup } from "../../store/actions/user.actions";
import { useForm } from "../../customHooks/useForm";
import { UploadSvg } from "../../service/icon.service";
import { useImageUpload } from "../../customHooks/useImageUpload";
import { useSelector } from "react-redux";
import { UnitsApplySelectCmp } from "./UnitsApplySelectCmp";

export function ApplyCmp() {

    const [fields, setFields, handleChange] = useForm(userService.getEmptyCredentials())
    const [uploadImg] = useImageUpload()


    async function onSignup(fields) {
        try {
            signup(fields)
        }
        catch (err) { console.log(err) }
    }

    const onUploadImg = async (ev) => {
        const imgUrl = await uploadImg(ev)
        setFields(prevFields => ({ ...prevFields, imgUrl }))

    }
    const { email, fullname, username, imgUrl } = fields
    return (
        <form className="apply" onSubmit={onSignup}>
            <label htmlFor="file-input">
                <input type="file" id="file-input" name="image" onChange={onUploadImg} hidden />
                {imgUrl ? <img src={imgUrl} alt="unit-img"></img> : <UploadSvg></UploadSvg>}
            </label>
            <input
                type="email"
                placeholder="Email"
                name='email'
                value={email}
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Fullname"
                value={fullname}
                name='fullname'
                onChange={handleChange}
            />
            <input
                type="text"
                placeholder="Username"
                value={username}
                name='username'
                onChange={handleChange}
            />
            <UnitsApplySelectCmp handleChange={handleChange} />
        </form>

    )

}