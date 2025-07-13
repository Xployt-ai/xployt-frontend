import "./About.css";

const About = () => {
    return (
        <div className="about-container">
            <h1 className="about-title">About Us</h1>
            <div>
                <p className="about-prose">
                    Xployt.ai is a cutting-edge security scanning platform designed to help developers 
                    identify and fix vulnerabilities in their codebase.
                </p>
                <p className="about-prose">
                    Our mission is to make security scanning accessible, efficient, and comprehensive 
                    for development teams of all sizes.
                </p>
            </div>
        </div>
    );
};

export default About; 