-- SMP Food Products — Seed Data
-- Run after schema.sql in Supabase SQL Editor

INSERT INTO categories (id, name, slug, description, image, product_count) VALUES
  ('c1', 'Kids Nutrition', 'kids-nutrition', 'Wholesome nutrition designed for growing children.', '/images/category-placeholder.svg', 2),
  ('c2', 'Family Nutrition', 'family-nutrition', 'Balanced nutrition mixes for the whole family.', '/images/category-placeholder.svg', 3),
  ('c3', 'Traditional Malt', 'traditional-malt', 'Time-tested malt recipes passed down through generations.', '/images/category-placeholder.svg', 4),
  ('c4', 'Millet Products', 'millet-products', 'Nutrient-dense millet blends for modern wellness.', '/images/category-placeholder.svg', 3),
  ('c5', 'Instant Mixes', 'instant-mixes', 'Quick, convenient, and nutritious instant preparations.', '/images/category-placeholder.svg', 2),
  ('c6', 'Combo Packs', 'combo-packs', 'Value bundles combining our best products.', '/images/category-placeholder.svg', 1),
  ('c7', 'Best Sellers', 'best-sellers', 'Our most loved products chosen by thousands of families.', '/images/category-placeholder.svg', 6),
  ('c8', 'New Arrivals', 'new-arrivals', 'Discover our latest product innovations.', '/images/category-placeholder.svg', 5)
ON CONFLICT (slug) DO NOTHING;
