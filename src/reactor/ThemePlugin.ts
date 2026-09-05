/*
 * Copyright (c) 2023-2026 Datalayer, Inc.
 * Distributed under the terms of the Modified BSD License.
 */

/**
 * `@datalayer/primer-theme` — the Primer theme, as a reactor plugin.
 *
 * Every reactor application that portals Primer overlays — a command palette,
 * a menu — needs the same two lines of glue: `setupPrimerPortals()` before
 * anything portals, and again on every theme change so the portal root's
 * `data-color-mode` follows the application. Each host wrote them for itself
 * (the music example at module load, the LOOP palette inside its build), and
 * each copy was one theme-change subscription short: a palette opened after a
 * toggle wore the mode the page started in.
 *
 * This plugin is that glue, written once where the theme actually lives. It
 * sets the portal root up when it registers, follows the shared theme store
 * and the OS scheme (for `auto`) for as long as it runs, and contributes the
 * command the copies never had: cycle the color mode, from the palette or by
 * keystroke.
 *
 * It lives beside the theme store rather than in the reactor repo because the
 * store is the thing being followed — the reactor knows nothing of Primer,
 * and should not learn.
 *
 * @module reactor/ThemePlugin
 */

import { definePlugin } from "@datalayer/reactor";
import { setupPrimerPortals } from "../utils/Portals";
import { useThemeStore } from "../theme/useThemeStore";

export const THEME_PLUGIN_NAME = "@datalayer/primer-theme";

/** The command's id, for hosts that want to invoke or rebind it. */
export const TOGGLE_COLOR_MODE_COMMAND = "theme.toggleColorMode";

export const ThemePlugin = definePlugin({
  name: THEME_PLUGIN_NAME,
  displayName: "Theme",
  description:
    "Keeps Primer portals in the application’s color mode, and toggles it.",
  octicon: "sun",
  emoji: "\u{1F317}",
  commands: [
    {
      id: TOGGLE_COLOR_MODE_COMMAND,
      name: "Toggle the color mode",
      description: "Switch between light and dark",
      emoji: "\u{1F317}",
      category: "Appearance",
      keybinding: "Mod+Alt+T",
      execute: () => {
        // A visible change on every press. The store's own `toggleColorMode`
        // cycles light → dark → auto, and the step onto `auto` (or off it)
        // shows nothing when `auto` resolves to the mode already on screen —
        // so every third press looked like a dud, and from `auto` it took
        // two. Resolve what is showing and go to the opposite explicit mode;
        // `auto` remains a choice for the picker.
        const store = useThemeStore.getState();
        const showing =
          store.colorMode === "auto"
            ? typeof window !== "undefined" &&
              window.matchMedia?.("(prefers-color-scheme: dark)").matches
              ? "dark"
              : "light"
            : store.colorMode;
        store.setColorMode(showing === "dark" ? "light" : "dark");
      },
    },
  ],
  register: () => {
    // Nothing to portal into on a server.
    if (typeof document === "undefined") {
      return;
    }

    // Before anything portals: the root has to exist, in the right mode,
    // by the time the first overlay looks for it.
    setupPrimerPortals(useThemeStore.getState().colorMode);

    // The user changing their mind. `setupPrimerPortals` is idempotent and
    // re-reads the theme markers, so following the store is one call.
    const unsubscribe = useThemeStore.subscribe((state, previous) => {
      if (state.colorMode !== previous.colorMode) {
        setupPrimerPortals(state.colorMode);
      }
    });

    // The OS changing its mind, which only matters on `auto`: the store's
    // value has not moved, but what it resolves to has.
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const followScheme = () => {
      if (useThemeStore.getState().colorMode === "auto") {
        setupPrimerPortals("auto");
      }
    };
    scheme.addEventListener("change", followScheme);

    return () => {
      unsubscribe();
      scheme.removeEventListener("change", followScheme);
    };
  },
});

export default ThemePlugin;
