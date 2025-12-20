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
  const { id } = await context.params;

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

type CartBody = {
  productId: string;
};

export async function POST( request: NextRequest,
  context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const body: CartBody = await request.json();
    const productId = body.productId;

    carts[id] = carts[id] ? carts[id].concat(productId) : [productId];
    const cartProducts = carts[id]
      .map(pid => products.find(p => p.id === pid))
      .filter(Boolean);

    return new Response(JSON.stringify(cartProducts), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  }

  export async function DELETE( request: NextRequest,
  context: { params: Promise<{ id: string }> }) {
    const { id } = await context.params;
    const body: CartBody = await request.json();
    const productId = body.productId;

    carts[id] = carts[id] ? carts[id].filter(pid => pid !== productId) : [];
    const cartProducts = carts[id]
      .map(pid => products.find(p => p.id === pid))
      .filter(Boolean);

    return new Response(JSON.stringify(cartProducts), {
      status: 202,
      headers: { "Content-Type": "application/json" },
    });
  }