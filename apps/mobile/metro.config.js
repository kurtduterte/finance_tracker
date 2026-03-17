const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Watch all files in the monorepo so Metro can resolve hoisted pnpm deps
config.watchFolders = [workspaceRoot];

// Look for modules in workspace root node_modules first, then project root
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// Bind Metro to all interfaces (0.0.0.0) so Android emulator can connect
config.server = {
  ...config.server,
  port: 8081,
};

module.exports = config;
