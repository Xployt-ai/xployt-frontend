import { useNavigate } from "react-router-dom";
import "./Home.css";
import { useState } from "react";
import FeatureCard from "@/components/FeatureCard.tsx";
import PricingCard from "@/components/PricingCard.tsx";

// Feature list
const features = [
  {
    title: "AI-Powered Vulnerability Detection",
    desc: "Uses large language models to understand your code and detect complex security flaws automatically"
  },
  {
    title: "Secret & Credential Leak Detection",
    desc: "Finds hardcoded API keys, tokens, and secrets before they get exploited"
  },
  {
    title: "OWASP Top 10 Coverage",
    desc: "Scans and flags vulnerabilities like XSS, SQL Injection, Broken Auth, and more"
  },
  {
    title: "Dependency Vulnerability Detection",
    desc: "Detects vulnerable packages and suggests secure alternatives"
  },
  // Dummy features for demonstration
  {
    title: "Automated Code Review",
    desc: "Instantly reviews your code for best practices and security compliance."
  },
  {
    title: "Real-Time Alerts",
    desc: "Get notified immediately when a new vulnerability is detected."
  },
  {
    title: "Seamless CI/CD Integration",
    desc: "Integrate security scans into your deployment pipeline effortlessly."
  },
  {
    title: "Comprehensive Reporting",
    desc: "Generate detailed reports for compliance and audit purposes."
  },
  {
    title: "Custom Rule Engine",
    desc: "Define your own security rules to tailor scans to your needs."
  },
  {
    title: "Multi-Language Support",
    desc: "Scan projects written in JavaScript, Python, Go, and more."
  }
];

const DOT_COUNT = 4; // Number of dots to show

const Home = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(0);

  const getDotActive = (dotIdx: number) => {
    // Map dot index to feature index
    const start = active - (active % DOT_COUNT);
    return active === (start + dotIdx);
  };
  // TODO: delete if not needed
  const handleNext = () => {
    setActive((prev) => (prev + 1) % features.length);
  };
  const handlePrev = () => {
    setActive((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <>
      {/* ...existing hero section... */}

      <section className="home-hero">

        {/* <div className="vector-bg">
    <img src="/Vector.png" alt="Decorative background" />
  </div> */}
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

        {/* <div className="vector1-bg">
    <img src="/Vector.png" alt="Decorative background" />
  </div> */}
        <div className="features-label">FEATURES</div>
        <h2 className="features-title">Key Service Features<br/>Protecting You</h2>
        <div className="features-carousel-wrapper">
          <div className="features-carousel" style={{ transform: `translateX(-${active * 100}%)` }}>
            {features.map((f, i) => (
              <FeatureCard
                key={f.title}
                title={f.title}
                desc={f.desc}
                active={i === active}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </div>
        <div className="features-dots">
          {Array.from({ length: DOT_COUNT }).map((_, i) => (
            <button
              key={i}
              className={`dot${getDotActive(i) ? " active" : ""}`}
              onClick={() => setActive((active - (active % DOT_COUNT)) + i)}
              aria-label={`Go to feature ${(active - (active % DOT_COUNT)) + i + 1}`}
            />
          ))}
        </div>
      </section>
      {/* About Us Section */}
      <section className="about-section" id="about">
        <div className="about-image">
          <img
            src="/map.png"
            alt="Hacker with graph"
          />
        </div>
        <div className="about-content">
          <div className="about-label">ABOUT US</div>
          <h2 className="about-title">
            At Xployt.ai, We're on a mission to make modern web development secure
          </h2>
          <p className="about-desc">
            Built for modern stacks like MERN, Xployt.ai uses AI-powered code analysis, static scanning, and runtime simulation to detect security risks early. Just connect your GitHub repo and let Xployt.ai uncover vulnerabilities, explain the risks, and guide you to fix them.
          </p>
          <p className="about-desc">
            Whether you're a solo developer or building your next startup, we make app security simple, smart, and seamless.
          </p>
          <button className="about-btn">
            Read More
          </button>
        </div>
      </section>
      {/* How It Works Section */}
      <section className="howit-section" id="documentation">
        <div className="howit-header">
          <div className="howit-label">DOCUMENTATION</div>
          <h2 className="howit-title">How It Works</h2>
        </div>
        <div className="howit-steps">
          {/*TODO: add images of the mentioned logos*/}
          <div
            className="howit-card"
            role="button"
            tabIndex={0}
            onClick={() => navigate('/documentation')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate('/documentation'); }}
          >
            <img src="/github.png" alt="GitHub" className="howit-icon" />
            <div className="howit-step">STEP 01</div>
            <div className="howit-card-title">Connect GitHub</div>
            <div className="howit-card-desc">Securely authorize access to your GitHub repositories. We use OAuth for safe authentication.</div>
          </div>
          <div
            className="howit-card"
            role="button"
            tabIndex={0}
            onClick={() => navigate('/documentation')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate('/documentation'); }}
          >
            {/* folder.png was missing in public; use an existing decorative asset instead */}
            <img src="/Folder.png" alt="Folder" className="howit-icon" />
            <div className="howit-step">STEP 02</div>
            <div className="howit-card-title">Select Repository</div>
            <div className="howit-card-desc">Choose the specific MERN application repository you want to analyze.</div>
          </div>
          <div
            className="howit-card"
            role="button"
            tabIndex={0}
            onClick={() => navigate('/documentation')}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') navigate('/documentation'); }}
          >
            <img src="/shield-image.png" alt="Shield" className="howit-icon" />
            <div className="howit-step">STEP 03</div>
            <div className="howit-card-title">Get Security Report</div>
            <div className="howit-card-desc">Receive a detailed vulnerability report with suggested fixes. Stay ahead of security threats.</div>
          </div>
        </div>
      </section>
      {/* Pricing Section */}
      <section className="pricing-section" id="pricing">
        <div className="pricing-header">
          <div className="pricing-label">PRICING</div>
          <h2 className="pricing-title">Start using cyber<br/>security protect</h2>
        </div>
        <div className="pricing-cards">
          <PricingCard
            plan="BASIC"
            price="FREE"
            features={["Real-time Threat Monitoring", "Community support", "Limited scans per month"]}
            buttonText="Get Started"
          />
          <PricingCard
            plan="STANDARD"
            price="$5"
            per="/per month"
            features={["Unlimited scans", "Vulnerability Assessments", "Priority support", "Advanced reporting"]}
            buttonText="Purchase"
            highlight
          />
        </div>
      </section>
    </>
  );
}

export default Home;