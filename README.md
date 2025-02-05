# MCP Registry Server

[![smithery badge](https://smithery.ai/badge/@KBB99/mcp-registry-server)](https://smithery.ai/server/@KBB99/mcp-registry-server)

## Features

- **MCP Retriever**: Retrieve MCP Servers using semantic search

<a href="https://glama.ai/mcp/servers/8pg7mzcpt8"><img width="380" height="200" src="https://glama.ai/mcp/servers/8pg7mzcpt8/badge" alt="mcp-registry-server MCP server" /></a>

## Tools

- **retrieve_mcps**
  - Perform retrieval operations against the MCP registry.
  - Inputs:
    - `query` (string): The search query for retrieval.

## Configuration

### Installation Guide

### Installing via Smithery

To install MCP Registry Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/@KBB99/mcp-registry-server):

```bash
npx -y @smithery/cli install @KBB99/mcp-registry-server --client claude
```

### Usage with Claude Desktop

First build the server:

```bash
git clone https://github.com/KBB99/mcp-registry-server.git
cd mcp-registry-server
npm install
npm run build
```

You can confirm the server is working by running:

```bash
node ./dist/index.js
```

Add this to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "aws-kb-retrieval": {
      "command": "node",
      "args": [
        "./path/to/build/mcp-server-retriever/dist/index.js",
      ]
    }
  }
}
```

## License

This MCP server is licensed under the MIT License. This means you are free to use, modify, and distribute the software, subject to the terms and conditions of the MIT License. For more details, please see the LICENSE file in the project repository.

This README assumes that your server package is named `mcp-server-retriever`. Adjust the package name and installation details if they differ in your setup. Also, ensure that your server script is correctly built and that all dependencies are properly managed in your `package.json`.

