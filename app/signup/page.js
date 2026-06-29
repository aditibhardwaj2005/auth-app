"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      const res = await axios.post("/api/signup", { name, email, password });
      setAlert({ type: "success", message: res.data.message });
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      setAlert({
        type: "error",
        message: error.response?.data?.error || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apple-page">
      <div className="apple-card animate-fade-in">

        <h1 className="apple-card-heading">Create your Account</h1>
        <p className="apple-card-subheading">
          Join us today. It&apos;s quick and easy.
        </p>

        {alert && (
          <div className={`apple-alert ${alert.type === "error" ? "apple-alert-error" : "apple-alert-success"}`}>
            <span>
              {alert.type === "error" ? "⚠️" : "✓"}
            </span>
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSignup}>
          <div className="apple-form-group">
            <label className="apple-label" htmlFor="signup-name">
              Full Name
            </label>
            <input
              id="signup-name"
              type="text"
              className="apple-input"
              placeholder="John Appleseed"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>

          <div className="apple-form-group">
            <label className="apple-label" htmlFor="signup-email">
              Email Address
            </label>
            <input
              id="signup-email"
              type="email"
              className="apple-input"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="apple-form-group" style={{ marginBottom: "28px" }}>
            <label className="apple-label" htmlFor="signup-password">
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              className="apple-input"
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <button
            type="submit"
            className="apple-btn"
            disabled={loading}
          >
            {loading ? "Creating Account…" : "Create Account"}
          </button>
        </form>

        <p className="apple-footer-link">
          Already have an account?{" "}
          <Link href="/login">Sign in</Link>
        </p>

        <p style={{ textAlign: "center", marginTop: "28px", fontSize: "0.75rem", color: "var(--apple-text-tertiary)", lineHeight: "1.5" }}>
          By creating an account, you agree to our{" "}
          <a href="#" style={{ color: "var(--apple-blue)", textDecoration: "none" }}>Terms of Use</a>{" "}
          and{" "}
          <a href="#" style={{ color: "var(--apple-blue)", textDecoration: "none" }}>Privacy Policy</a>.
        </p>
      </div>
    </div>
  );
}