import { products } from "@/app/product-data";
import { NextRequest } from "next/server";

type ShoppingCart = Record<string, string[]>;

const carts: ShoppingCart = {
  '1': ['123', '234'],
  '2': ['345', '456'],
  '3': ['234']
};

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // 👈 FIXED

  const productIds = carts[id];

  if (productIds === undefined) {
    return new Response(JSON.stringify([]), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    });
  }

  const cartProducts = productIds
    .map(pid => products.find(p => p.id === pid))
    .filter(Boolean);

  return new Response(JSON.stringify(cartProducts), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
