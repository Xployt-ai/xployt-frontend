import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button.tsx";

const Home = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState(0);

    return (
        <>
        {/* ...existing hero section... */}
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
        {/* Features Section */}
        <section className="features-section">
          <div className="features-label">FEATURES</div>
          <h2 className="features-title">Key Service Features<br/>Protecting You</h2>
          <div className="features-carousel-wrapper">
            <div className="features-carousel" style={{ transform: `translateX(-${active * 100}%)` }}>
              {features.map((f, i) => (
                <div key={f.title} className={`feature-card${i === active ? " active" : ""}`}>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="features-dots">
            {features.map((_, i) => (
              <button
                key={i}
                className={`dot${i === active ? " active" : ""}`}
                onClick={() => setActive(i)}
                aria-label={`Go to feature ${i + 1}`}
              />
            ))}
          </div>
        </section>
        </>
    );
}

export default Home;