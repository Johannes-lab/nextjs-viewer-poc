"use client";

import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

// Dynamically import the ViewerApp with no SSR
const ViewerApp = dynamic(
  () =>
    import("@/components/ViewerApp").then((mod) => ({
      default: mod.ViewerApp,
    })),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          fontSize: "1.5rem",
          color: "#667eea",
        }}
      >
        Loading iTwin Viewer...
      </div>
    ),
  }
);

function ViewerContent() {
  const searchParams = useSearchParams();

  // Get IDs from environment or URL params
  const iTwinId =
    searchParams.get("iTwinId") || process.env.NEXT_PUBLIC_IMJS_ITWIN_ID || "";
  const iModelId =
    searchParams.get("iModelId") ||
    process.env.NEXT_PUBLIC_IMJS_IMODEL_ID ||
    "";
  const changesetId = searchParams.get("changesetId");

  if (!iTwinId || !iModelId) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <h1
          style={{ fontSize: "2rem", marginBottom: "1rem", color: "#dc2626" }}
        >
          ⚠️ Configuration Required
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            marginBottom: "1rem",
            maxWidth: "600px",
          }}
        >
          Please add valid iTwin ID and iModel ID to your .env.local file and
          restart the application.
        </p>
        <p style={{ fontSize: "1rem", color: "#666" }}>
          Alternatively, add them as query parameters:
          ?iTwinId=YOUR_ITWIN_ID&iModelId=YOUR_IMODEL_ID
        </p>
      </div>
    );
  }

  return (
    <ViewerApp
      iTwinId={iTwinId}
      iModelId={iModelId}
      changesetId={changesetId || undefined}
    />
  );
}

export default function ViewerPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            fontSize: "1.5rem",
          }}
        >
          Loading...
        </div>
      }
    >
      <ViewerContent />
    </Suspense>
  );
}
