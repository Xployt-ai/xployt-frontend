import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button.tsx";
import "./Home.css";

const Home = () => {
    const navigate = useNavigate();

    return (
        <section className="home-hero">
            {/* Decorative lines bottom left */}
            <img 
                src="/Vector.png" 
                alt="Decorative lines" 
                className="decorative-lines"
            />
            <div className="hero-content">
                {/* Left: Text content */}
                <div className="hero-left">
                    <h1 className="hero-title">Build Fast. Stay Secure</h1>
                    <p className="hero-desc">Our AI-powered platform analyzes your MERN stack applications for security vulnerabilities providing actionable insights and automated fixes.</p>
                    <button
                        className="hero-btn"
                        onClick={() => navigate("/login")}
                    >
                        Start Free Scan
                    </button>
                </div>
                {/* Right: Shield image */}
                <div className="hero-right">
                    <img 
                        src="/shield.png" 
                        alt="Security Shield" 
                        className="shield-img" 
                    />
                </div>
            </div>
        </section>
    );
}

export default Home;