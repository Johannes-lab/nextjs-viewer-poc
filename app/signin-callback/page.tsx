"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BrowserAuthorizationClient } from "@itwin/browser-authorization";

export default function SignInCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const authClient = new BrowserAuthorizationClient({
          scope:
            process.env.NEXT_PUBLIC_IMJS_AUTH_CLIENT_SCOPES ?? "itwin-platform",
          clientId: process.env.NEXT_PUBLIC_IMJS_AUTH_CLIENT_CLIENT_ID ?? "",
          redirectUri:
            process.env.NEXT_PUBLIC_IMJS_AUTH_CLIENT_REDIRECT_URI ?? "",
          postSignoutRedirectUri:
            process.env.NEXT_PUBLIC_IMJS_AUTH_CLIENT_LOGOUT_URI,
          responseType: "code",
          authority: process.env.NEXT_PUBLIC_IMJS_AUTH_AUTHORITY,
        });

        await authClient.handleSigninCallback();


        router.push("/viewer");
      } catch (err) {
        console.error("Authentication callback error:", err);
        setError(err instanceof Error ? err.message : "Authentication failed");
      }
    };

    handleCallback();
  }, [router]);

  if (error) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontSize: "1.5rem",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <div>Authentication failed</div>
        <div style={{ fontSize: "1rem", color: "#ef4444" }}>{error}</div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        fontSize: "1.5rem",
      }}
    >
      Completing sign in...
    </div>
  );
}
