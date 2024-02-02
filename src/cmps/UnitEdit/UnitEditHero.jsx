

export function UnitEditHero({ props }) {

    const { handleChange, unitsToAdd, adminUnits, unitTypes, onSaveUnit, onUploadImg, imgUrl, name, type, description } = props
    return (
        <form onSubmit={(ev) => onSaveUnit(ev)}>
            <label htmlFor="file-input">
                <input type="file" id="file-input" name="image" onChange={onUploadImg} hidden />
                <img src={imgUrl || '/src/styles/img/upload.png'}></img>

            </label>
            <input type="text" name="name" value={name} placeholder="Unit Name" onChange={handleChange} />
            <input type="color" id="style" name="style" onChange={handleChange} />
            <textarea name="description" rows="4" cols="50" value={description} onChange={handleChange}></textarea>
            <label htmlFor="type">{type}</label>
            <select onChange={handleChange} name="type">
                <option value="gaming">Gaming</option>
                <option value="support">Support</option>
                <option value="operation">Operation</option>
            </select>
            <button>Save</button>
        </form>
    )
}