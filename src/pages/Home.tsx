import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button.tsx";
import { useState } from "react";
import FeatureCard from "@/components/ui/FeatureCard";
import PricingCard from "@/components/ui/PricingCard";

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

    const handleNext = () => {
      setActive((prev) => (prev + 1) % features.length);
    };
    const handlePrev = () => {
      setActive((prev) => (prev - 1 + features.length) % features.length);
    };

    return (
        <>
        {/* ...existing hero section... */}

          <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden h-[90vh]">

  <div className="absolute top-0 left-0 w-full h-full -z-10">
    <img src="/Vector.png" alt="Decorative background" />
  </div>
            <div className="relative z-10 flex flex-col gap-8 w-full max-w-6xl px-6 md:flex-row md:px-12">
              
                {/* Left: Text content */}
                <div className="flex-1 flex flex-col items-start justify-center text-left max-w-2xl pt-16 pb-16 ml-40 md:pt-32 md:pb-32">
                    <h1 className="text-4xl font-extrabold text-white mb-6 md:text-6xl">Build Fast. Stay Secure</h1>
                    <p className="text-lg text-gray-400 mb-8 max-w-lg md:text-xl">Our AI-powered platform analyzes your MERN stack applications for security vulnerabilities providing actionable insights and automated fixes.</p>
                    <button
                        className="bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-md shadow-sm mb-4 transition-colors duration-200 border-none cursor-pointer hover:bg-gray-300"
                        onClick={() => navigate("/login")}
                    >
                        Start Free Scan
                    </button>
                </div>
                {/* Right: Shield image */}
                <div className="flex-1 flex items-center justify-center w-full pt-8 pb-8 md:w-auto md:pt-0 md:pb-0">
                    <img 
                        src="/shield.png" 
                        alt="Security Shield" 
                        className="max-w-[var(--shield-img-max-width)] object-contain filter drop-shadow-lg" 
                    />
                </div>
            </div>
        </section>

        {/* Features Section */}
          <section className="flex flex-col items-center justify-center h-[90vh]">
            <div className="text-gray-500 font-bold tracking-wider text-center mb-2">FEATURES</div>
            <h2 className="text-white text-4xl font-extrabold text-center mb-10 leading-tight">Advanced Security Features</h2>
            
            <div className="w-full max-w-6xl overflow-hidden mb-8">
              <div className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${active * 420}px)` }}>
                {features.map((feature, idx) => (
                  <div
                    key={idx}
                    className={`min-w-[370px] max-w-[420px] mx-5 bg-gradient-to-br from-white/[0.04] to-white/[0.01] rounded-3xl p-10 px-8 text-white shadow-lg border-2 border-transparent transition-colors duration-300 flex flex-col justify-start ${
                      active === idx ? 'border-white bg-gradient-to-br from-white/[0.08] to-white/[0.02]' : ''
                    }`}
                  >
                    <h3 className="text-3xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-lg text-gray-200">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex gap-3 justify-center items-center">
              {Array.from({ length: DOT_COUNT }, (_, i) => (
                <button
                  key={i}
                  className={`w-3.5 h-3.5 rounded-full border-none cursor-pointer transition-colors duration-200 ${
                    getDotActive(i) ? 'bg-white' : 'bg-gray-600'
                  }`}
                  onClick={() => setActive(i)}
              />
            ))}
          </div>
        </section>

        {/* About Us Section */}
          <section className="flex items-center justify-center py-16 gap-12 h-[90vh]" id="about">
            <div className="flex-1 flex justify-center max-w-2xl">
            <img
              src="/map.png"
                alt="About Us" 
                className="max-w-[540px] rounded-xl border-2 border-gray-600 shadow-2xl"
            />
          </div>
            <div className="text-white max-w-2xl pr-8">
              <div className="tracking-wider text-gray-300 font-bold mb-2 text-base">ABOUT US</div>
              <h2 className="text-5xl font-extrabold mb-6 leading-tight text-white">Secure Your Code, Secure Your Future</h2>
              <p className="text-gray-300 text-lg mb-6">
                We are a team of security experts and developers who understand the challenges of building secure applications in today's fast-paced development environment.
              </p>
              <p className="text-gray-300 text-lg mb-8">
                Our platform combines cutting-edge AI technology with industry best practices to provide comprehensive security analysis for your applications.
              </p>
              <button className="py-3 px-8 border-[1.5px] border-gray-300 rounded-lg bg-transparent text-white font-semibold text-lg cursor-pointer transition-all duration-200 hover:bg-white hover:text-gray-900">
                Learn More
            </button>
          </div>
        </section>

        {/* How It Works Section */}
          <section className="h-[90vh] w-full py-24 pt-24 pb-16 flex flex-col items-center justify-center" id="documentation">
            <div className="text-center mb-12">
              <div className="text-gray-500 font-bold tracking-wider text-lg mb-2">HOW IT WORKS</div>
              <h2 className="text-white text-5xl font-extrabold mb-0 leading-tight">Simple 3-Step Process</h2>
            </div>
            <div className="flex gap-10 justify-center items-stretch w-full max-w-6xl">
              <div className="bg-gradient-radial from-gray-700/10 via-gray-900/75 to-gray-900/75 rounded-2xl shadow-2xl p-10 px-8 pb-8 flex-1 min-w-[260px] max-w-[340px] flex flex-col items-center text-center transition-shadow duration-200 hover:shadow-3xl">
                <img src="/github.png" alt="GitHub" className="w-18 h-18 mb-6 rounded-xl bg-gray-700 object-contain" />
                <div className="text-gray-500 text-base font-semibold mb-2 tracking-wider">STEP 1</div>
                <h3 className="text-white text-2xl font-bold mb-3">Connect Repository</h3>
                <p className="text-gray-300 text-lg font-normal leading-relaxed">Connect your GitHub repository with just a few clicks. We support both public and private repositories.</p>
              </div>
              <div className="bg-gradient-radial from-gray-700/10 via-gray-900/75 to-gray-900/75 rounded-2xl shadow-2xl p-10 px-8 pb-8 flex-1 min-w-[260px] max-w-[340px] flex flex-col items-center text-center transition-shadow duration-200 hover:shadow-3xl">
                <img src="/folder.png" alt="Folder" className="w-18 h-18 mb-6 rounded-xl bg-gray-700 object-contain" />
                <div className="text-gray-500 text-base font-semibold mb-2 tracking-wider">STEP 2</div>
                <h3 className="text-white text-2xl font-bold mb-3">AI Analysis</h3>
                <p className="text-gray-300 text-lg font-normal leading-relaxed">Our AI-powered engine analyzes your code for vulnerabilities, secrets, and security issues.</p>
              </div>
              <div className="bg-gradient-radial from-gray-700/10 via-gray-900/75 to-gray-900/75 rounded-2xl shadow-2xl p-10 px-8 pb-8 flex-1 min-w-[260px] max-w-[340px] flex flex-col items-center text-center transition-shadow duration-200 hover:shadow-3xl">
                <img src="/shield-image.png" alt="Shield" className="w-18 h-18 mb-6 rounded-xl bg-gray-700 object-contain" />
                <div className="text-gray-500 text-base font-semibold mb-2 tracking-wider">STEP 3</div>
                <h3 className="text-white text-2xl font-bold mb-3">Get Results</h3>
                <p className="text-gray-300 text-lg font-normal leading-relaxed">Receive detailed reports with actionable insights and automated fixes for detected issues.</p>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="w-full py-24 pt-24 pb-16 flex flex-col items-center justify-center" id="pricing">
            <div className="text-center mb-12">
              <div className="text-gray-500 font-bold tracking-wider text-lg mb-2">PRICING</div>
              <h2 className="text-white text-5xl font-extrabold mb-0 leading-tight">Choose Your Plan</h2>
            </div>
            <div className="flex gap-12 justify-center items-stretch w-full max-w-4xl">
              <div className="bg-gradient-to-br from-gray-700/0 via-gray-900/85 to-gray-900/85 rounded-[22px] shadow-2xl p-10 px-8 pb-8 flex-1 min-w-[260px] max-w-[340px] flex flex-col items-center text-center transition-shadow duration-200 border-[1.5px] border-gray-600/13">
                <div className="text-white text-lg font-bold mb-6 tracking-wider">FREE</div>
                <div className="w-full flex items-center justify-center mb-8">
                  <div className="bg-gradient-to-r from-gray-700/45 via-gray-900/85 to-gray-900/85 rounded-full text-white text-4xl font-extrabold py-3 px-14 mr-2 shadow-lg">$0</div>
                  <div className="text-gray-300 text-lg font-medium">/month</div>
                </div>
                <ul className="list-none p-0 m-0 mb-9 w-full">
                  <li className="text-white text-lg font-normal mb-4 flex items-center gap-3 justify-start">
                    <img src="/checkmark.png" alt="Check" className="w-4.5 h-4.5 object-contain filter drop-shadow-sm" />
                    Up to 3 repositories
                  </li>
                  <li className="text-white text-lg font-normal mb-4 flex items-center gap-3 justify-start">
                    <img src="/checkmark.png" alt="Check" className="w-4.5 h-4.5 object-contain filter drop-shadow-sm" />
                    Basic vulnerability scan
                  </li>
                  <li className="text-white text-lg font-normal mb-4 flex items-center gap-3 justify-start">
                    <img src="/checkmark.png" alt="Check" className="w-4.5 h-4.5 object-contain filter drop-shadow-sm" />
                    Email notifications
                  </li>
                </ul>
                <button className="w-full py-4 rounded-lg text-lg font-bold cursor-pointer transition-all duration-200 border-2 border-white bg-transparent text-white hover:bg-white hover:text-gray-900">
                  Get Started
                </button>
              </div>
              <div className="bg-gradient-to-br from-gray-700/0 via-gray-900/85 to-gray-900/85 rounded-[22px] shadow-2xl p-10 px-8 pb-8 flex-1 min-w-[260px] max-w-[340px] flex flex-col items-center text-center transition-shadow duration-200 border-[1.5px] border-gray-600 shadow-2xl">
                <div className="text-white text-lg font-bold mb-6 tracking-wider">PRO</div>
                <div className="w-full flex items-center justify-center mb-8">
                  <div className="bg-gradient-to-r from-gray-700/45 via-gray-900/85 to-gray-900/85 rounded-full text-white text-4xl font-extrabold py-3 px-14 mr-2 shadow-2xl">$29</div>
                  <div className="text-gray-300 text-lg font-medium">/month</div>
          </div>
                <ul className="list-none p-0 m-0 mb-9 w-full">
                  <li className="text-white text-lg font-normal mb-4 flex items-center gap-3 justify-start">
                    <img src="/checkmark.png" alt="Check" className="w-4.5 h-4.5 object-contain filter drop-shadow-sm" />
                    Unlimited repositories
                  </li>
                  <li className="text-white text-lg font-normal mb-4 flex items-center gap-3 justify-start">
                    <img src="/checkmark.png" alt="Check" className="w-4.5 h-4.5 object-contain filter drop-shadow-sm" />
                    Advanced AI analysis
                  </li>
                  <li className="text-white text-lg font-normal mb-4 flex items-center gap-3 justify-start">
                    <img src="/checkmark.png" alt="Check" className="w-4.5 h-4.5 object-contain filter drop-shadow-sm" />
                    Priority support
                  </li>
                  <li className="text-white text-lg font-normal mb-4 flex items-center gap-3 justify-start">
                    <img src="/checkmark.png" alt="Check" className="w-4.5 h-4.5 object-contain filter drop-shadow-sm" />
                    Custom rules
                  </li>
                </ul>
                <button className="w-full py-4 rounded-lg text-lg font-bold cursor-pointer transition-all duration-200 border-2 border-gray-700 bg-gray-700 text-white hover:bg-white hover:text-gray-900 hover:border-white">
                  Start Pro Trial
                </button>
          </div>
          </div>
        </section>
        </>
    );
};

export default Home;