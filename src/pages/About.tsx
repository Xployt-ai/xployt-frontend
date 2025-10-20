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
                        We know how it feels when security vulnerabilities slip into production. That sleepless night, 
                        the emergency hotfix, the worried conversations with your team. We've been there too.
                    </p>
                    <p className="about-prose">
                        Xployt.ai was built by developers who got tired of expensive security tools that were either 
                        too complex to use or too simple to be effective. We wanted something different - a platform 
                        that catches real vulnerabilities before they become real problems, without breaking your 
                        development flow or your budget.
                    </p>
                    <p className="about-prose">
                        Today, we help developers like you scan GitHub repositories, catch security issues early, 
                        and ship with confidence. No security degree required. Just connect your repo and let our 
                        AI-powered engine do the heavy lifting while you focus on building great products.
                    </p>
                    <p className="about-prose">
                        Because at the end of the day, security isn't just about protecting code - it's about 
                        protecting the trust your users place in you.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default About;