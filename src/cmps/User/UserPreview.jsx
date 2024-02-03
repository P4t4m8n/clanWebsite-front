import { EventCalender } from "../../pages/EventCalender"
import { RecruitSvg } from "../../servies/icon.service"
import { unitService } from "../../servies/unit.service"
import { userService } from "../../servies/user.service"


export function UserPreview({ currUser, onLogout }) {


    const {
        username,
        position,
        imgUrl,
        rank,
        medals,
        msgs,
        units,
        createdAt,
    } = currUser

    const unitObj = unitService.getAvailableJoinUnits().find(unit => unit.name === units[0].name)
    const timeInTaw = userService.daysSince(createdAt)
    const timeInRank = userService.daysSince(rank.createdAt)
    return (
        <section className="user-panel flex">
            <div className="user-info grid" >
                <img src={imgUrl}></img>
                <h2>{username}</h2>
                <DynmicRankImgCmp type={rank.type}></DynmicRankImgCmp>
                <h3>days in Rank: {timeInRank}</h3>
                <h4>Days in service: {timeInTaw}</h4>
            </div>
            <div className="user-unit-info grid">
                <img src={unitObj.imgUrl}></img>
                <h4>{units[0].name}</h4>
                <h5>{position}</h5>
                {medals.length > 0 &&
                    <ul className="medals">
                        {medals.map((medal, idx) =>
                            <li key={idx}>
                                <img src={medal.imgUrl}></img>
                            </li>
                        )}
                    </ul>
                }
                <p>msgs: {msgs.length}</p>
            </div>
            <EventCalender />
            <button onClick={onLogout}>logout</button>
        </section>
    )
}

function DynmicRankImgCmp({ type }) {

    switch (type) {
        case 'recruit':
            return <RecruitSvg></RecruitSvg>
        default:
            break;
    }
}