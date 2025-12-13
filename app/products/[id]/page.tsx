import { products } from "@/app/product-data";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;

  const product = products.find((p) => p.id === id);

  if (!product) {
    return <h1>Product not found</h1>;
  }

  return (
    <>
    <h1>{product.name}</h1>
    <p>Price: ${product.price}</p>
    <h3>Description</h3>
    <p>{product.description}</p>
    </>
  );
}
