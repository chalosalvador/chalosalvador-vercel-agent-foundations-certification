/**
 * This is where your agent will live.
 *
 * During the workshop you'll define a `ToolLoopAgent` here, give it a model
 * and instructions, and later add tools (web search, sandbox, etc.). The
 * route handler in `app/api/chat/route.ts` and the `useChat` call in
 * `components/agent-chat.tsx` will both import from this file.
 *
 * Workshop docs: https://agent-foundations-certification.vercel.app/docs/chat-agent
 */

import {
	ToolLoopAgent,
	type InferAgentUIMessage,
	type UIToolInvocation,
} from "ai";
import {
	searchProducts,
	getAllCategories,
	returnOrder,
	getProductDetails,
} from "@/lib/tools";

export type ShoppingAgentUIMessage = InferAgentUIMessage<typeof shoppingAgent>;
export type SearchProductsToolInvocation = UIToolInvocation<
	typeof searchProducts
>;
export type ProductDetailsToolInvocation = UIToolInvocation<
	typeof getProductDetails
>;

export const shoppingAgent = new ToolLoopAgent({
	model: "anthropic/claude-sonnet-4.6",
	instructions: `You are a helpful assistant for the Vercel swag store. When the user asks about products, availability, or recommendations, use the searchProducts tool to look up real catalog data before answering.
  When asked about a type or category of product use the getAllCategories tool for getting valid categories before using searchProducts.
  When the user wants to return an order, use the returnOrder tool. Ask for the order ID and reason if they haven't provided them. Example order IDs are 11111, 22222, and 33333.
  Use searchProducts to discover or recommend products, or whenever you don't yet know a product's exact ID.
  Use getProductDetails only when you have a specific product ID and the user wants that one item's full details (sizes, stock, full description). If the user names a product but you don't have its ID, call searchProducts first to find the ID, then getProductDetails.
  When you call getProductDetails a card will be rendered to show the product details. You don't need to add the details in the response.`,

	tools: { searchProducts, getAllCategories, returnOrder, getProductDetails },
});
