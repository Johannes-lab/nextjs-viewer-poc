import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        textAlign: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          color: "white",
          marginBottom: "1rem",
        }}
      >
        iTwin Viewer in Next.js
      </h1>
      <p
        style={{
          fontSize: "1.25rem",
          color: "rgba(255, 255, 255, 0.9)",
          marginBottom: "2rem",
          maxWidth: "600px",
        }}
      >
        A proof of concept demonstrating the iTwin Viewer running in a Next.js
        App Router application.
      </p>

      <div style={{ marginBottom: "2rem" }}>
        {!process.env.NEXT_PUBLIC_IMJS_AUTH_CLIENT_CLIENT_ID ? (
          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1rem",
              color: "white",
            }}
          >
            ⚠️ Please configure your environment variables in .env.local
          </div>
        ) : null}
      </div>

      <Link
        href="/viewer"
        style={{
          padding: "1rem 2rem",
          fontSize: "1.125rem",
          fontWeight: "600",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          border: "2px solid white",
          borderRadius: "8px",
          textDecoration: "none",
          transition: "all 0.3s ease",
          cursor: "pointer",
        }}
      >
        Launch Viewer
      </Link>

      <div
        style={{
          marginTop: "3rem",
          padding: "1.5rem",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "8px",
          maxWidth: "800px",
          textAlign: "left",
        }}
      >
        <h2 style={{ color: "white", marginBottom: "1rem" }}>
          Setup Instructions:
        </h2>
        <ol style={{ color: "rgba(255, 255, 255, 0.9)", lineHeight: "1.8" }}>
          <li>
            Get your OIDC client credentials from{" "}
            <a
              href="https://developer.bentley.com/"
              target="_blank"
              rel="noreferrer"
              style={{ color: "white", textDecoration: "underline" }}
            >
              developer.bentley.com
            </a>
          </li>
          <li>Get your iTwin ID and iModel ID from the iTwin Platform APIs</li>
          <li>Add all credentials to your .env.local file</li>
          <li>Restart the development server</li>
        </ol>
      </div>
    </div>
  );
}
