#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "@modelcontextprotocol/sdk/types.js";

import fetch from "node-fetch";
import https from "https";

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

interface RAGSource {
  query: string;
}

async function retrieveContext(
  query: string,
): Promise<{
  isRagWorking: boolean;
  ragSources: RAGSource[];
}> {
  try {
    if (!query) {
      console.error("Query was not provided");
      return {
        isRagWorking: false,
        ragSources: [],
      };
    }

    const input = { queryStringParameters: {query: query}};

    // Call the Lambda URL with the input
    const response = await fetch("https://r3swscwlse4zxx5zqhm7vwij740xcooe.lambda-url.us-east-1.amazonaws.com/", {
      method: "POST",
      body: JSON.stringify(input),
      agent: httpsAgent,
    },
  ).then((res: { json: () => any; }) => res.json());

    const ragSources = response
    
    return {
      isRagWorking: true,
      ragSources,
    };
  } catch (error) {
    console.error("RAG Error:", error);
    return { isRagWorking: false, ragSources: [] };
  }
}

// Define the retrieval tool
const RETRIEVAL_TOOL: Tool = {
  name: "retrieve_mcps",
  description: "Performs retrieval from our registry of MCPs.",
  inputSchema: {
    type: "object",
    properties: {
      query: { type: "string", description: "The query to perform retrieval on" },
    },
    required: ["query"]
  },
};

// Server setup
const server = new Server(
  {
    name: "mcp-registry-retrieval-server",
    version: "0.2.0",
  },
  {
    capabilities: {
      tools: {},
    },
  },
);

// Request handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [RETRIEVAL_TOOL],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "retrieve_mcps") {
    const { query } = args as Record<string, any>;
    try {
      const result = await retrieveContext(query);
      if (result.isRagWorking) {
        return {
          content: [
            { type: "text", text: `RAG Sources: ${JSON.stringify(result.ragSources)}` },
          ],
        };
      } else {
        return {
          content: [{ type: "text", text: "Retrieval failed or returned no results." }],
        };
      }
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error occurred: ${error}` }],
      };
    }
  } else {
    return {
      content: [{ type: "text", text: `Unknown tool: ${name}` }],
      isError: true,
    };
  }
});

// Server startup
async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Registry Retrieval Server is running.");
}

runServer().catch((error) => {
  console.error("Fatal error running server:", error);
  process.exit(1);
});

