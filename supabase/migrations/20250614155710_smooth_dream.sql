/*
  # Create blog posts table with proper error handling

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `slug` (text, unique, required)
      - `excerpt` (text)
      - `content` (text)
      - `featured_image` (text, URL)
      - `meta_title` (text)
      - `meta_description` (text)
      - `tags` (text array)
      - `category` (text)
      - `status` (text, default 'draft')
      - `author_id` (uuid, nullable)
      - `published_at` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `view_count` (integer, default 0)

  2. Security
    - Enable RLS on `blog_posts` table
    - Add policies for authenticated users to manage posts (if not exists)
    - Add policy for public to read published posts (if not exists)

  3. Performance
    - Add indexes for better query performance
*/

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  featured_image text,
  meta_title text,
  meta_description text,
  tags text[] DEFAULT '{}',
  category text DEFAULT 'general',
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  author_id uuid,
  published_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  view_count integer DEFAULT 0
);

-- Enable RLS if not already enabled
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_class c 
    JOIN pg_namespace n ON n.oid = c.relnamespace 
    WHERE c.relname = 'blog_posts' 
    AND n.nspname = 'public' 
    AND c.relrowsecurity = true
  ) THEN
    ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
  END IF;
END $$;

-- Drop existing policies if they exist and recreate them
DO $$ 
BEGIN
  -- Drop existing policies
  DROP POLICY IF EXISTS "Users can manage their own blog posts" ON blog_posts;
  DROP POLICY IF EXISTS "Public can read published posts" ON blog_posts;
  
  -- Create policies
  CREATE POLICY "Users can manage their own blog posts"
    ON blog_posts
    FOR ALL
    TO authenticated
    USING (auth.uid() = author_id)
    WITH CHECK (auth.uid() = author_id);

  CREATE POLICY "Public can read published posts"
    ON blog_posts
    FOR SELECT
    TO public
    USING (status = 'published');
END $$;

-- Create or replace the update function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop existing trigger if it exists and recreate it
DO $$
BEGIN
  DROP TRIGGER IF EXISTS update_blog_posts_updated_at ON blog_posts;
  
  CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON blog_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
END $$;

-- Create indexes if they don't exist
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);