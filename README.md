# MCP Registry Server

## Features

- **MCP Retriever**: Retrieve MCP Servers using semantic search

## Tools

- **retrieve_mcps**
  - Perform retrieval operations against the MCP registry.
  - Inputs:
    - `query` (string): The search query for retrieval.

## Configuration

### Usage with Claude Desktop

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