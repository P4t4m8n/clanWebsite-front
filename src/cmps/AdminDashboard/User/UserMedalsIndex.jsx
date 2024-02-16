

export function UserMedalsIndex({ medals }) {
    if (!medals) return <div>No Medals</div>
    return (
        <ul className="user-medals">
            {medals.map((medal, idx) =>
                <li key={idx}>
                    <h1>{medal.name}</h1>
                </li>
            )}
        </ul>
    )
}