import { uploadService } from "../service/upload.service"
// import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service"

export function useImageUpload() {

    const uploadImg = async (ev) => {
        const file = ev.target.files[0]
        try {
            const imgUrl = await uploadService.uploadImg(file)
            // showSuccessMsg('image saved')
            return imgUrl

        } catch (err) {
            console.log("err:", err)
            // showErrorMsg('Unbale to save image', err)
        }
    }

    return [uploadImg]
}
