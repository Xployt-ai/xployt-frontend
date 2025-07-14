import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            <p>Sample Page</p>
            <Button onClick={() => navigate("/login")}>
                Login
            </Button>
        </>
    );
}

export default Home;