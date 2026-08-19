import { INITIAL_PRODUCTS } from '@/lib/data/mockData';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return INITIAL_PRODUCTS.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProductDetailClient slug={slug} />;
}
