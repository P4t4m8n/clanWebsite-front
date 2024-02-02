import { Link } from "react-router-dom";
import { UnitPreview } from "./UnitPreview";

export function UnitList({ units }) {

    return (
        <ul>
            {units.map(unit =>
                <Link to={unit._id} key={unit._id}>
                    <UnitPreview unit={unit}></UnitPreview>
                </Link>)}
        </ul>
    )
}