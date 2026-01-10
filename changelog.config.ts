import type { ChronalogConfig } from "chronalog";

/**
 * Chronalog configuration
 * 
 * Customise folder paths, route paths, and commit message format.
 * All fields are optional and will use defaults if not specified.
 */
const config: ChronalogConfig = {
  // Directory where changelog files are stored
  changelogDir: "chronalog/changelog",

  // Route path for the admin interface
  // adminRoute: "/chronalog",

  // Route path for the public changelog page
  // changelogRoute: "/changelog",

  // API route path for saving entries
  // apiRoute: "/api/changelog/save",

  // Custom commit message format (use {title} as placeholder)
  // commitMessageFormat: "changelog: {title}",

  // Whether to auto-commit changes to Git
  // autoCommit: true,
};

export default config;
