// 0. Import dependencies
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { greetingToolDefinition, handleGreeting } from "./tools/greeting.js";
// 1. Create MCP server instance
const server = new Server(
  {
    name: "MCP Made Simple",
    version: "0.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// 2. Define the list of tools
server.setRequestHandler(
  ListToolsRequestSchema, async () => {
    return {
      tools: [greetingToolDefinition],
    };
  }
);

// 3. Add tool call logic
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name,arguments: args } = request.params;

  switch (name) {
    case "greeting":
      return handleGreeting(args);
    default:
      throw new Error(`Tool "${name}" not found`);
  }
});


// 4. Start the MCP server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
console.log("MCP server started on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
