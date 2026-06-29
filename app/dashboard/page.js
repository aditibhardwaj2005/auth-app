import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default async function Dashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    redirect("/login");
  }

  return (
    <div className="apple-dashboard">
      <nav className="apple-nav">
        <div className="apple-nav-inner">
          <div className="apple-nav-brand">
            Auth App
          </div>
          <LogoutButton />
        </div>
      </nav>

      <main className="apple-main animate-fade-in">
        <div className="apple-welcome-section">
          <div style={{ marginBottom: "12px" }}>
            <span className="apple-badge apple-badge-green">
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#34c759", display: "inline-block" }} />
              Authenticated
            </span>
          </div>
          <h1 className="apple-welcome-title">Welcome back.</h1>
          <p className="apple-welcome-subtitle">
            You&apos;re securely signed in to your account. Here&apos;s an overview of your session.
          </p>
        </div>

        <div className="apple-stat-grid">
          <div className="apple-stat-card">
            <div className="apple-stat-label">Session Status</div>
            <div className="apple-stat-value" style={{ fontSize: "1.25rem", color: "#34c759" }}>Active</div>
            <div className="apple-stat-meta">Secure connection</div>
          </div>

          <div className="apple-stat-card">
            <div className="apple-stat-label">Auth Method</div>
            <div className="apple-stat-value" style={{ fontSize: "1.25rem" }}>JWT</div>
            <div className="apple-stat-meta">Expires in 24h</div>
          </div>

          <div className="apple-stat-card">
            <div className="apple-stat-label">Cookie</div>
            <div className="apple-stat-value" style={{ fontSize: "1.25rem" }}>HttpOnly</div>
            <div className="apple-stat-meta">XSS protected</div>
          </div>
        </div>

        <div className="apple-info-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <h2 className="apple-info-card-title">Account Security</h2>
              <p className="apple-info-card-body" style={{ maxWidth: "480px" }}>
                Your password is securely hashed with bcrypt. Your session token is stored in an
                HttpOnly cookie, keeping it safe from client-side scripts.
              </p>
            </div>
            <span className="apple-badge apple-badge-blue">
              🔒 Encrypted
            </span>
          </div>
        </div>
      </main>
    </div>
  );
}