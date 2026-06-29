"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        window.location.href = "/dashboard";
      } else {
        setAlert({ type: "error", message: data.error || "Login failed." });
      }
    } catch {
      setAlert({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apple-page">
      <div className="apple-card animate-fade-in">

        <h1 className="apple-card-heading">Sign in</h1>
        <p className="apple-card-subheading">
          Welcome back. Enter your details to continue.
        </p>

        {alert && (
          <div className={`apple-alert ${alert.type === "error" ? "apple-alert-error" : "apple-alert-success"}`}>
            <span>{alert.type === "error" ? "⚠️" : "✓"}</span>
            {alert.message}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="apple-form-group">
            <label className="apple-label" htmlFor="login-email">
              Email Address
            </label>
            <input
              id="login-email"
              type="email"
              className="apple-input"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="apple-form-group" style={{ marginBottom: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <label className="apple-label" htmlFor="login-password" style={{ marginBottom: 0 }}>
                Password
              </label>
              <a
                href="#"
                style={{ fontSize: "0.8125rem", color: "var(--apple-blue)", textDecoration: "none", fontWeight: 500 }}
                onMouseOver={e => e.target.style.opacity = "0.7"}
                onMouseOut={e => e.target.style.opacity = "1"}
              >
                Forgot password?
              </a>
            </div>
            <input
              id="login-password"
              type="password"
              className="apple-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <div style={{ marginBottom: "24px" }} />

          <button
            type="submit"
            className="apple-btn"
            disabled={loading}
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>

        <p className="apple-footer-link">
          Don&apos;t have an account?{" "}
          <Link href="/signup">Create one</Link>
        </p>
      </div>
    </div>
  );
}