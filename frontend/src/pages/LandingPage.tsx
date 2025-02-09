import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";

export function LandingPage() {
  const navigate = useNavigate();
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gray-50 flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-8 max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900">Your Second Brain</h1>

        <p className="text-lg text-gray-600">
          Organize your thoughts, ideas, and knowledge in one place. Second
          Brain helps you capture, store, and retrieve information effortlessly.
        </p>

        <div className="flex justify-center gap-4">
          <Button
            onClick={() => navigate("/signup")}
            variant="primary"
            text="Get Started"
            fullWidth={false}
            startIcon={<></>}
          />
          <Button
            onClick={() => navigate("/signin")}
            variant="secondary"
            text="Sign In"
            fullWidth={false}
            startIcon={<></>}
          />
        </div>
      </div>

      <footer className="absolute bottom-8 text-sm text-gray-500">
        © {year} Second Brain. All rights reserved.
      </footer>
    </div>
  );
}
