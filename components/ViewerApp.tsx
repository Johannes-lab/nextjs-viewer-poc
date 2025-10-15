/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { BrowserAuthorizationClient } from "@itwin/browser-authorization";
import { ThemeProvider } from "@itwin/itwinui-react";
import {
  Viewer,
  ViewerContentToolsProvider,
  ViewerNavigationToolsProvider,
  ViewerStatusbarItemsProvider,
} from "@itwin/web-viewer-react";
import {
  FitViewTool,
  IModelApp,
  type ScreenViewport,
  StandardViewId,
} from "@itwin/core-frontend";
import { TreeWidget } from "@itwin/tree-widget-react";
import { PropertyGridManager } from "@itwin/property-grid-react";
import {
  MeasurementActionToolbar,
  MeasureTools,
  MeasureToolsUiItemsProvider,
} from "@itwin/measure-tools-react";
import { selectionStorage } from "@/lib/selectionStorage";
import { propertyGridUiProvider, treeWidgetUiProvider } from "./UiProviders";

interface ViewerAppProps {
  iTwinId: string;
  iModelId: string;
  changesetId?: string;
}

export function ViewerApp({ iTwinId, iModelId, changesetId }: ViewerAppProps) {
  const [initialized, setInitialized] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const authClient = useMemo(
    () =>
      new BrowserAuthorizationClient({
        scope:
          process.env.NEXT_PUBLIC_IMJS_AUTH_CLIENT_SCOPES ?? "itwin-platform",
        clientId: process.env.NEXT_PUBLIC_IMJS_AUTH_CLIENT_CLIENT_ID ?? "",
        redirectUri:
          process.env.NEXT_PUBLIC_IMJS_AUTH_CLIENT_REDIRECT_URI ?? "",
        postSignoutRedirectUri:
          process.env.NEXT_PUBLIC_IMJS_AUTH_CLIENT_LOGOUT_URI,
        responseType: "code",
        authority: process.env.NEXT_PUBLIC_IMJS_AUTH_AUTHORITY,
      }),
    []
  );

  // Handle authentication on mount
  useEffect(() => {
    const authenticate = async () => {
      try {
        await authClient.signInSilent();
      } catch (error) {
        // Silent sign-in failed, trigger interactive sign-in
        await authClient.signIn();
      } finally {
        setIsAuthenticating(false);
      }
    };
    authenticate();
  }, [authClient]);

  const onIModelAppInit = useCallback(async () => {
    // Initialize widgets after iModel is loaded
    await TreeWidget.initialize();
    await PropertyGridManager.initialize();
    await MeasureTools.startup();
    MeasurementActionToolbar.setDefaultActionProvider();
    setInitialized(true);
  }, []);

  // Create UI providers - excluding tree and property grid for now
  const uiProviders = useMemo(
    () => [
      new ViewerNavigationToolsProvider(),
      new ViewerContentToolsProvider({
        vertical: {
          measureGroup: false,
        },
      }),
      new ViewerStatusbarItemsProvider(),
      new MeasureToolsUiItemsProvider(),
      treeWidgetUiProvider,
      propertyGridUiProvider
      // TODO: Add tree widget and property grid after fixing configuration
    ],
    []
  );

  if (isAuthenticating) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-lg">Authenticating...</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider
      theme="dark"
      style={{
        flex: 1,
      }}
    >
      <Viewer
        iTwinId={iTwinId}
        iModelId={iModelId}
        changeSetId={changesetId}
        authClient={authClient}
        viewCreatorOptions={viewCreatorOptions}
        enablePerformanceMonitors={false}
        onIModelAppInit={onIModelAppInit}
        mapLayerOptions={{
          BingMaps: {
            key: "key",
            value: process.env.NEXT_PUBLIC_IMJS_BING_MAPS_KEY ?? "",
          },
        }}
        uiProviders={uiProviders}
        selectionStorage={selectionStorage}
      />
    </ThemeProvider>
  );
}

const viewCreatorOptions = { viewportConfigurer: viewConfiguration };

/**
 * Configure the viewport after the iModel is loaded
 * This applies a "Fit View" to show the model optimally
 */
function viewConfiguration(viewPort: ScreenViewport) {
  const tileTreesLoaded = () => {
    return new Promise((resolve, reject) => {
      const start = new Date();
      const intvl = setInterval(() => {
        if (viewPort.areAllTileTreesLoaded) {
          clearInterval(intvl);
          resolve(true);
        }
        const now = new Date();
        // After 20 seconds, stop waiting and fit the view
        if (now.getTime() - start.getTime() > 20000) {
          reject();
        }
      }, 100);
    });
  };

  tileTreesLoaded().finally(() => {
    IModelApp.tools.run(FitViewTool.toolId, viewPort, true, false);
    viewPort.view.setStandardRotation(StandardViewId.Iso);
  });
}
