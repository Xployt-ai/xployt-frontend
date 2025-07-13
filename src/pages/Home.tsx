import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/Button.tsx";

const Home = () => {
    const navigate = useNavigate();

    return (
        <section className="relative w-full min-h-[90vh] flex items-center justify-center bg-[#030711] overflow-hidden" style={{background: "radial-gradient(ellipse at 70% 40%, #101624 60%, #030711 100%)"}}>
            {/* Decorative lines bottom left */}
            <img 
                src="/Vector.png" 
                alt="Decorative lines" 
                className="absolute left-0 bottom-0 w-[30vw] min-w-[200px] max-w-[400px] pointer-events-none select-none"
                style={{ zIndex: 1 }}
            />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-6xl px-6 md:px-12">
                {/* Left: Text content */}
                <div className="flex-1 flex flex-col items-start justify-center text-left max-w-xl py-16 md:py-32">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6">Build Fast. Stay Secure</h1>
                    <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-md">Our AI-powered platform analyzes your MERN stack applications for security vulnerabilities providing actionable insights and automated fixes.</p>
                    <button
                        className="bg-gray-200 text-gray-900 font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-300 transition mb-4"
                        onClick={() => navigate("/login")}
                    >
                        Start Free Scan
                    </button>
                </div>
                {/* Right: Shield image */}
                <div className="flex-1 flex items-center justify-center w-full md:w-auto py-8 md:py-0">
                    <img 
                        src="/shield.png" 
                        alt="Security Shield" 
                        className="w-[340px] h-[340px] max-w-full object-contain drop-shadow-xl" 
                    />
                </div>
            </div>
        </section>
    );
}

export default Home;