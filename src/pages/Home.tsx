import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertTriangle,
  Code,
  FileText,
  FolderGit2,
  Github,
  Key,
  Shield,
} from "lucide-react";
import React from "react";

export default function Frame(): JSX.Element {
  // Hero section data
  const heroData = {
    title: "Build Fast. Stay Secure",
    description:
      "Our AI-powered platform analyzes your MERN stack applications for security vulnerabilities providing actionable insights and automated fixes.",
    ctaText: "Start Free Scan",
  };

  // Features section data
  const featuresData = [
    {
      icon: <Code className="h-6 w-6 text-white" />,
      title: "Multi-Layered Code Analysis",
      description:
        "Scans your application code, third-party dependencies, and configurations for maximum coverage.",
    },
    {
      icon: <AlertTriangle className="h-6 w-6 text-white" />,
      title: "AI-Powered Vulnerability Detection",
      description:
        "Uses AI to analyze your code to detect even the most sophisticated vulnerabilities automatically.",
    },
    {
      icon: <Key className="h-6 w-6 text-white" />,
      title: "Secret & Credential Leak Detection",
      description:
        "Finds hardcoded API keys, tokens, and secrets before they get exploited.",
    },
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      title: "OWASP Top 10 Coverage",
      description:
        "Full protection against the most common web application security risks.",
    },
  ];

  // About section data
  const aboutData = {
    title:
      "At Xployt.ai, We're on a mission to make modern web development secure",
    description:
      "Built for modern stacks like MERN, Xployt.ai uses AI-powered code analysis, static scanning, and runtime simulation to detect security risks early. Just connect your GitHub repo and let Xployt.ai uncover vulnerabilities, explain the risks, and guide you to fix them.\n\nWhether you're a solo developer or building your next startup, we make app security simple, smart, and seamless.",
    ctaText: "Read More",
  };

  // How it works section data
  const howItWorksData = [
    {
      icon: <Github className="h-8 w-8 text-white" />,
      title: "Connect GitHub",
      description:
        "Securely link your GitHub account to scan your repositories.",
    },
    {
      icon: <FolderGit2 className="h-8 w-8 text-white" />,
      title: "Select Repository",
      description:
        "Choose which repositories you want to scan for vulnerabilities.",
    },
    {
      icon: <FileText className="h-8 w-8 text-white" />,
      title: "Get Security Report",
      description:
        "Receive detailed reports with clear explanations and suggested fixes.",
    },
  ];

  // Pricing section data
  const pricingData = {
    title: "Start using cyber security protect",
    plans: [
      {
        name: "FREE",
        price: "$0",
        features: [
          "One-time Threat Monitoring",
          "Basic Vulnerability Scan",
          "Limited access per month",
        ],
        ctaText: "Get Started",
      },
      {
        name: "STANDARD",
        price: "$5",
        period: "per month",
        features: [
          "Unlimited Scans",
          "Vulnerability Assessments",
          "Priority Support",
          "Automated Reporting",
        ],
        ctaText: "Purchase",
      },
    ],
  };

  return (
    <div className="flex flex-col items-center relative bg-[#020611] text-white">
      {/* Hero Section */}
      <section className="relative w-full max-w-[1514px] h-[746px] overflow-hidden">
        <div className="absolute w-[747px] h-[461px] top-[285px] left-0">
          <div className="flex flex-col w-[619px] items-start gap-4 absolute top-0 left-32">
            <h1 className="relative self-stretch mt-[-1.00px] font-extrabold text-white text-5xl tracking-[-0.58px] leading-[48px]">
              {heroData.title}
            </h1>

            <p className="relative self-stretch text-slate-400 text-base leading-7">
              {heroData.description}
            </p>

            <Button className="h-10 px-4 py-0 bg-gray-300 text-[#020611] rounded-lg hover:bg-gray-200">
              {heroData.ctaText}
            </Button>
          </div>

          {/* Vector graphics */}
          <div
            className="absolute w-[316px] h-[457px] top-1 left-0 bg-no-repeat bg-contain"
            style={{ backgroundImage: "url('')" }}
            aria-hidden="true"
          />

          <div
            className="absolute w-[551px] h-[390px] top-[71px] left-0 bg-no-repeat bg-contain"
            style={{ backgroundImage: "url('')" }}
            aria-hidden="true"
          />
        </div>

        <div className="absolute w-[536px] h-[533px] top-[107px] left-[856px]">
          <div
            className="relative w-[803px] h-[746px] top-[-107px] left-[-145px] bg-no-repeat bg-contain"
            style={{ backgroundImage: "url('')" }}
          >
            <div
              className="absolute w-[530px] h-[530px] top-[108px] left-[145px] bg-no-repeat bg-contain"
              style={{ backgroundImage: "url('')" }}
              aria-hidden="true"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative w-full max-w-[1514px] h-[746px] py-16">
        <div className="flex flex-col items-center justify-center h-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-2">Key Service Features</h2>
            <p className="text-xl text-slate-400">Protecting You</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {featuresData.map((feature, index) => (
              <Card key={index} className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="mb-4 mt-2">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="1" className="mt-8">
            <TabsList className="bg-slate-800">
              {[1, 2, 3, 4, 5].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab.toString()}
                  className="data-[state=active]:bg-slate-700"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* About Section */}
      <section className="relative w-full max-w-[1514px] h-[746px] bg-[#020611] overflow-hidden">
        <div className="absolute w-[1032px] h-[890px] top-[-313px] left-[767px]">
          <div
            className="absolute w-[163px] h-[218px] top-[313px] left-[584px] bg-no-repeat bg-contain"
            style={{ backgroundImage: "url('')" }}
            aria-hidden="true"
          />

          <div className="absolute w-[533px] h-[533px] top-0 left-[499px] bg-variable-collection-light-gray rounded-[266.5px] blur-[74px] opacity-10" />

          <div className="flex flex-col w-[619px] items-start gap-4 absolute top-[482px] left-0">
            <div className="flex flex-col items-start relative self-stretch w-full">
              <p className="relative self-stretch mt-[-1.00px] text-slate-500 text-base font-bold uppercase">
                ABOUT US
              </p>

              <h2 className="relative self-stretch text-white text-3xl font-extrabold leading-tight">
                {aboutData.title}
              </h2>
            </div>

            <div className="relative self-stretch text-slate-400 text-base leading-6">
              {aboutData.description.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4">
                  {paragraph}
                </p>
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
