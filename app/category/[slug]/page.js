import { CATEGORIES } from '../../../features/categories/constants';
import CategoryClient from '../../../features/categories/CategoryClient';

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    slug: category.slug,
  }));
}

export default function CategoryPage({ params }) {
  return <CategoryClient slug={params.slug} />;
}
