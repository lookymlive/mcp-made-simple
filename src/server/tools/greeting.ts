import { z } from "zod";

// 1. Tool Schema
export const GreetingToolSchema = z.object({
  name: z.string(),
});

// 2. Tool listing information
export const greetingToolDefinition = {
  name: "greeting",
  description: "Returns a greeting message",
  inputSchema: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "The name to greet",
      },
    },
    required: ["name"],
  },
};

// 3. Tool implementation
export const handleGreeting = (args: unknown) => {
  const validated = GreetingToolSchema.parse(args);
  const { name } = validated;

  return {
    content: [
      {
        type: "text",
        text: `Hello, ${name}! Welcome to the Model Context Protocol.`,
      },
    ],
  };
};
