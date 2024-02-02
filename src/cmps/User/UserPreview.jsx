

export function UserPreview({ currUser }) {

    const { username, units, createdAt, rank, madels, msgs } = currUser

    return (
        <section className="user-preview">
            <div >
                <h4>Member</h4>
                <h3>P4t4m8n</h3>
                <h4>Days in service: 666</h4>
            </div>
            <div>
                <h5>Patamon division</h5>
                <h5>sergent</h5>
                <p>999+ massages</p>
            </div>
        </section>
    )
}