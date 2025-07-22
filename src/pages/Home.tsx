import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Home.css";
import Footer from "@/components/Footer.tsx";

const Home = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState(0);

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
      }
    ];

    return (
      <div
      >
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
        <section className="features-section bg-transparent">
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

            <Button
              variant="outline"
              className="h-10 px-4 py-0 bg-slate-800 text-variable-collection-light-gray border-variable-collection-light-gray rounded-lg hover:bg-slate-700"
            >
              {aboutData.ctaText}
            </Button>
          </div>
        </div>

        <div className="absolute w-[750px] h-[804px] top-[233px] left-[-130px]">
          <div
            className="absolute w-[315px] h-[448px] top-[65px] left-[130px] bg-no-repeat bg-contain"
            style={{ backgroundImage: "url('')" }}
            aria-hidden="true"
          />

          <div className="absolute w-[533px] h-[533px] top-[271px] left-0 bg-variable-collection-light-gray rounded-[266.5px] blur-[74px] opacity-10" />

          <div
            className="absolute w-[496px] h-[287px] top-0 left-[254px] bg-no-repeat bg-contain"
            style={{ backgroundImage: "url('')" }}
            aria-hidden="true"
          />
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative w-full max-w-[1514px] h-[746px] py-16">
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-3xl font-bold mb-16">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {howItWorksData.map((step, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="mb-6 mt-2 p-4 bg-slate-700 rounded-full">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-slate-400">{step.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative w-full max-w-[1514px] h-[746px] py-16">
        <div className="flex flex-col items-center justify-center h-full">
          <h2 className="text-3xl font-bold mb-16 text-center">
            {pricingData.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingData.plans.map((plan, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <p className="text-sm font-semibold text-slate-400">
                      {plan.name}
                    </p>
                    <div className="flex justify-center items-baseline mt-2">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      {plan.period && (
                        <span className="text-sm text-slate-400 ml-1">
                          {plan.period}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <Shield className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant={index === 0 ? "outline" : "default"}
                    className={`w-full ${index === 0 ? "border-slate-600 hover:bg-slate-700" : "bg-slate-700 hover:bg-slate-600"}`}
                  >
                    {plan.ctaText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
