/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
"use client";

import { createTreeWidget } from "@itwin/tree-widget-react";
import {
  ModelsTreeComponent,
  CategoriesTreeComponent,
  ExternalSourcesTreeComponent,
} from "@itwin/tree-widget-react";
import { createPropertyGrid } from "@itwin/property-grid-react";

/**
 * Create tree widget UI provider for the viewer
 * Should be called after TreeWidget.initialize()
 */
export function createTreeWidgetUiProvider() {
  return createTreeWidget({
    trees: [
      {
        id: ModelsTreeComponent.id,
        getLabel: ModelsTreeComponent.getLabel,
        render: (props) => <ModelsTreeComponent {...props} />,
      },
      {
        id: CategoriesTreeComponent.id,
        getLabel: CategoriesTreeComponent.getLabel,
        render: (props) => <CategoriesTreeComponent {...props} />,
      },
      {
        id: ExternalSourcesTreeComponent.id,
        getLabel: ExternalSourcesTreeComponent.getLabel,
        render: (props) => <ExternalSourcesTreeComponent {...props} />,
      },
    ],
  });
}

/**
 * Create property grid UI provider for the viewer
 * Should be called after PropertyGridManager.initialize()
 */
export function createPropertyGridUiProvider() {
  return createPropertyGrid({});
}
