/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { IModelConnection } from "@itwin/core-frontend";
import { createStorage } from "@itwin/unified-selection";

/**
 * Unified selection storage for managing selection state across the viewer
 */
export const selectionStorage = createStorage();

IModelConnection.onClose.addListener((imodel) => {
  selectionStorage.clearStorage({ imodelKey: imodel.key });
});
