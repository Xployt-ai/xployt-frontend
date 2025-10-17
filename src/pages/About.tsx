import "./About.css";

const About = () => {
    return (
        <section className="about-container">
            <div className="about-card">
                <div className="about-image">
                    <img src="/map.png" alt="Team working" />
                </div>
                <div className="about-content">
                    <div className="about-label">ABOUT US</div>
                    <h1 className="about-title">At Xployt.ai, we're on a mission to make modern web development secure</h1>
                    <p className="about-prose">
                        Xployt.ai is a cutting-edge security scanning platform designed to help developers
                        identify and fix vulnerabilities in their codebase. We combine static analysis,
                        AI-driven heuristics, and developer-friendly reporting to make security work for teams.
                    </p>
                    <p className="about-prose">
                        Whether you're a solo developer or part of a large engineering org, our goal is to
                        make app security accessible, actionable, and integrated into your workflow.
                    </p>
                    <div className="about-actions">
                        <button className="about-btn">Read More</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;