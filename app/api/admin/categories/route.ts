import { NextRequest, NextResponse } from 'next/server';
import { getSavedCategories, saveCategories } from '@/lib/markdownSync';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { Category } from '@/types/fmhy';

export async function GET() {
  try {
    const categories = getSavedCategories();
    return NextResponse.json({ categories });
  } catch (err: any) {
    console.error('Error fetching categories:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin();
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { action, category, subcategory, categoryId, subcategoryId } = body;

    const categories: Category[] = getSavedCategories();

    // 1. Create new Category
    if (action === 'create_category') {
      const { name, id, slug, description, iconName } = category || {};
      if (!name) {
        return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
      }

      const safeId = (id || slug || name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const existing = categories.find((c) => c.id === safeId || c.slug === safeId);
      if (existing) {
        return NextResponse.json({ error: `Category with ID "${safeId}" already exists` }, { status: 409 });
      }

      const newCategory: Category = {
        id: safeId,
        name: name.trim(),
        slug: safeId,
        iconName: iconName || 'Layers',
        description: description || `Curated resources for ${name}`,
        githubFile: `data/${safeId}.md`,
        subcategories: [],
      };

      categories.push(newCategory);
      saveCategories(categories);

      return NextResponse.json({ success: true, category: newCategory, message: `Category "${name}" created successfully` });
    }

    // 2. Add Subcategory to Category
    if (action === 'create_subcategory') {
      const { name, description } = subcategory || {};
      if (!categoryId || !name) {
        return NextResponse.json({ error: 'categoryId and subcategory name are required' }, { status: 400 });
      }

      const targetCat = categories.find((c) => c.id === categoryId);
      if (!targetCat) {
        return NextResponse.json({ error: 'Target category not found' }, { status: 404 });
      }

      const safeSubId = `${targetCat.id}-${name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
      if (!targetCat.subcategories) targetCat.subcategories = [];

      const existingSub = targetCat.subcategories.find((s) => s.id === safeSubId);
      if (existingSub) {
        return NextResponse.json({ error: 'Subcategory with this name already exists in this category' }, { status: 409 });
      }

      const newSub = {
        id: safeSubId,
        name: name.trim(),
        description: description || `Resources for ${name}`,
        items: [],
      };

      targetCat.subcategories.push(newSub);
      saveCategories(categories);

      return NextResponse.json({ success: true, subcategory: newSub, message: `Subcategory "${name}" added to ${targetCat.name}` });
    }

    // 3. Delete Category
    if (action === 'delete_category') {
      if (!categoryId) {
        return NextResponse.json({ error: 'categoryId is required' }, { status: 400 });
      }

      const filtered = categories.filter((c) => c.id !== categoryId);
      saveCategories(filtered);

      return NextResponse.json({ success: true, message: 'Category removed successfully' });
    }

    // 4. Delete Subcategory
    if (action === 'delete_subcategory') {
      if (!categoryId || !subcategoryId) {
        return NextResponse.json({ error: 'categoryId and subcategoryId are required' }, { status: 400 });
      }

      const targetCat = categories.find((c) => c.id === categoryId);
      if (targetCat && targetCat.subcategories) {
        targetCat.subcategories = targetCat.subcategories.filter((s) => s.id !== subcategoryId);
        saveCategories(categories);
      }

      return NextResponse.json({ success: true, message: 'Subcategory removed successfully' });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err: any) {
    console.error('Error modifying categories:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
