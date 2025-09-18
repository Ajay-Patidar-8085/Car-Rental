import React, { useState } from "react";
import axios from "axios";
import Container from "./Container";

const API_URL = "http://localhost:3000/users";

export default function UserAuthForm() {
    const [type, setType] = useState("login"); // toggle state
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.get(API_URL, { params: { email } });
            const user = res.data[0];

            if (type === "login") {
                if (user && user.password === password) {
                    setMessage(`✅ Welcome back, ${user.name}!`);
                } else {
                    setMessage("❌ Invalid email or password.");
                }
            } else {
                if (user) {
                    setMessage("⚠️ User already exists.");
                } else {
                    const newUser = {
                        id: Date.now().toString(),
                        name,
                        email,
                        password,
                        createdAt: new Date().toISOString(),
                    };
                    await axios.post(API_URL, newUser);
                    setMessage(`🎉 Signup successful! Welcome, ${name}`);
                }
            }
        } catch (err) {
            setMessage("Something went wrong. Please try again.");
            console.error(err);
        }
    };

    return (
        <Container className="flex justify-center items-center min-h-screen ">
            <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
                {/* Toggle Buttons */}
                <div className="flex mb-6 border-b border-gray-200">
                    <button
                        onClick={() => setType("login")}
                        className={`flex-1 py-2 text-lg font-semibold ${type === "login"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500"
                            }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setType("signup")}
                        className={`flex-1 py-2 text-lg font-semibold ${type === "signup"
                            ? "text-blue-600 border-b-2 border-blue-600"
                            : "text-gray-500"
                            }`}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {type === "signup" && (
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        {type === "login" ? "Login" : "Create Account"}
                    </button>
                </form>

                {/* Switch option */}
                <p className="text-center mt-4 text-gray-600">
                    {type === "login" ? (
                        <>
                            Don’t have an account?{" "}
                            <button
                                type="button"
                                onClick={() => setType("signup")}
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                Sign Up
                            </button>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <button
                                type="button"
                                onClick={() => setType("login")}
                                className="text-blue-600 font-semibold hover:underline"
                            >
                                Login
                            </button>
                        </>
                    )}
                </p>

                {/* Message */}
                {message && (
                    <p
                        className={`mt-4 text-center font-medium ${message.includes("✅") || message.includes("🎉")
                            ? "text-green-600"
                            : "text-red-500"
                            }`}
                    >
                        {message}
                    </p>
                )}
            </div>
        </Container>
    );
}
