import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    await axios.post(BACKEND_URL + "/api/v1/signup", {
      username,
      password,
    });
    navigate("/signin");
    alert("You have signed up!");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Create an Account
          </h1>
          <p className="text-gray-600">Start your journey with Second Brain</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <Input reference={usernameRef} placeholder="Enter username" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <Input reference={passwordRef} placeholder="••••••••" />
          </div>

          <Button
            onClick={signup}
            variant="primary"
            text="Sign Up"
            fullWidth
            startIcon={<></>}
          />
        </div>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/signin" className="text-purple-600 hover:underline">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
}
