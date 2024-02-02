

export function Home() {

    return (
        <section className="home">
            <section className="hero">
                <h2>Welcome to the Battlefield</h2>
                <p>Join us in our quest for dominance across multiple gaming platforms.</p>
            </section>

            <section  className="about">
                <h2>About Us</h2>
                <p>The Art of Warfare (TAW) is a global gaming community that has been thriving since 2001. We are open to gamers of all skill levels and backgrounds.</p>
            </section>

            <section  className="featuredGames">
                <h2>Featured Games</h2>
                <div className="gameList flex">
                    <div className="game">
                        <h3>Valorant</h3>
                        <p>Join our tactical squads and climb the ranks in Valorant.</p>
                    </div>
                    <div className="game">
                        <h3>Call of Duty</h3>
                        <p>Experience warfare like never before in our Call of Duty teams.</p>
                    </div>
                </div>
            </section>
        </section>
    )
}