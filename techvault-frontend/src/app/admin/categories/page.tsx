'use client';

import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Trash2,
  Edit2,
  Sliders,
  Check,
  X,
  Sparkles,
  Search
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Category, CategorySpecField } from '@/types';

export default function AdminCategoriesPage() {
  const categories = useStore((state) => state.categories);
  const addCategory = useStore((state) => state.addCategory);
  const updateCategory = useStore((state) => state.updateCategory);
  const deleteCategory = useStore((state) => state.deleteCategory);

  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [specFields, setSpecFields] = useState<CategorySpecField[]>([]);

  // New Spec Field Input
  const [newFieldName, setNewFieldName] = useState('');
  const [newFieldKey, setNewFieldKey] = useState('');
  const [newFieldType, setNewFieldType] = useState<'text' | 'number' | 'select' | 'boolean'>('select');
  const [newFieldOptions, setNewFieldOptions] = useState('');
  const [newFieldUnit, setNewFieldUnit] = useState('');

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setName('');
    setDescription('');
    setImageUrl('https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80');
    setSpecFields([]);
    setModalOpen(true);
  };

  const handleOpenEdit = (cat: Category) => {
    setEditingCategory(cat);
    setName(cat.name);
    setDescription(cat.description || '');
    setImageUrl(cat.imageUrl || '');
    setSpecFields(cat.specFields || []);
    setModalOpen(true);
  };

  const handleAddSpecField = () => {
    if (!newFieldName.trim()) return;
    const fieldKey = newFieldKey.trim() || newFieldName.toLowerCase().replace(/[^a-z0-9]+/g, '_');
    const options = newFieldType === 'select'
      ? newFieldOptions.split(',').map((s) => s.trim()).filter(Boolean)
      : undefined;

    const newField: CategorySpecField = {
      id: Date.now(),
      fieldName: newFieldName.trim(),
      fieldKey,
      fieldType: newFieldType,
      options,
      unit: newFieldUnit.trim() || undefined,
      isFilterable: true,
      sortOrder: specFields.length + 1
    };

    setSpecFields([...specFields, newField]);
    setNewFieldName('');
    setNewFieldKey('');
    setNewFieldOptions('');
    setNewFieldUnit('');
  };

  const handleRemoveSpecField = (fieldId: number) => {
    setSpecFields(specFields.filter((f) => f.id !== fieldId));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name,
        slug,
        description,
        imageUrl,
        specFields
      });
    } else {
      addCategory({
        name,
        slug,
        description,
        imageUrl,
        isActive: true,
        sortOrder: categories.length + 1,
        specFields
      });
    }
    setModalOpen(false);
  };

  const filteredCategories = categories.filter((c) => {
    if (search) {
      const q = search.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.slug.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-mono uppercase tracking-widest text-sky-700 font-bold mb-1">
            Dynamic Technical Attributes
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <span>Categories & Technical Specs Builder</span>
            <span className="text-xs bg-slate-100 text-slate-700 font-mono px-2.5 py-1 rounded-full font-bold border border-slate-200">
              {categories.length} Categories
            </span>
          </h1>
        </div>

        <button
          onClick={handleOpenCreate}
          className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-5 py-3 rounded-xl transition flex items-center gap-2 shadow-sm shadow-sky-600/20"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Add New Category</span>
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 text-xs text-slate-900 pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white border border-slate-200 rounded-3xl p-5 space-y-4 hover:border-sky-300 transition-all shadow-xs hover:shadow-md flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-10 h-10 rounded-xl object-cover bg-slate-100 border border-slate-200"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{cat.name}</h3>
                    <div className="text-[10px] text-sky-700 font-mono font-semibold">{cat.slug}</div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(cat)}
                    className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-sky-700 hover:bg-slate-200 transition"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-500 line-clamp-2">{cat.description}</p>

              {/* Dynamic Specifications Badges */}
              <div className="space-y-1.5 pt-2 border-t border-slate-100">
                <div className="text-[10px] font-mono text-slate-500 font-bold uppercase">
                  Dynamic Technical Spec Fields ({cat.specFields?.length || 0})
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.specFields && cat.specFields.length > 0 ? (
                    cat.specFields.map((field) => (
                      <span
                        key={field.id}
                        className="bg-slate-50 text-slate-700 border border-slate-200 text-[10px] px-2 py-0.5 rounded-md font-mono"
                      >
                        {field.fieldName} ({field.fieldType})
                      </span>
                    ))
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">No custom fields defined</span>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>{cat.productCount || 0} Products</span>
              <span className="text-emerald-700 font-bold">Active</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Category Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">
                {editingCategory ? `Edit Category: ${editingCategory.name}` : 'Create New Electronics Category'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Category Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mechanical Keyboards"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Short Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description for category badges..."
                  className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-800 block mb-1">Category Cover Image URL</label>
                <input
                  type="url"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full bg-slate-50 text-xs text-slate-900 p-3 rounded-xl border border-slate-200 focus:border-sky-500 focus:outline-none font-mono text-[11px]"
                />
              </div>

              {/* Dynamic Spec Field Builder Box */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
                <div className="text-xs font-mono uppercase tracking-wider text-sky-700 font-bold flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Configure Dynamic Technical Attributes</span>
                </div>

                <div className="space-y-2">
                  {specFields.map((field) => (
                    <div
                      key={field.id}
                      className="bg-white p-2.5 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <span className="font-bold text-slate-900">{field.fieldName}</span>
                        <span className="text-[10px] text-slate-500 font-mono ml-2">
                          [{field.fieldType}] {field.options ? `Options: ${field.options.join(', ')}` : ''}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSpecField(field.id)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Spec Field Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-200">
                  <input
                    type="text"
                    placeholder="Field Name (e.g. Read Speed)"
                    value={newFieldName}
                    onChange={(e) => setNewFieldName(e.target.value)}
                    className="bg-white text-xs text-slate-900 p-2 rounded-lg border border-slate-200 focus:border-sky-500 focus:outline-none"
                  />
                  <select
                    value={newFieldType}
                    onChange={(e) => setNewFieldType(e.target.value as any)}
                    className="bg-white text-xs text-slate-900 p-2 rounded-lg border border-slate-200 focus:border-sky-500 focus:outline-none"
                  >
                    <option value="select">Dropdown Select</option>
                    <option value="text">Text Input</option>
                    <option value="number">Numeric Value</option>
                    <option value="boolean">Boolean (Yes/No)</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Unit (e.g. MB/s, DPI, Hz)"
                    value={newFieldUnit}
                    onChange={(e) => setNewFieldUnit(e.target.value)}
                    className="bg-white text-xs text-slate-900 p-2 rounded-lg border border-slate-200 focus:border-sky-500 focus:outline-none font-mono"
                  />
                </div>

                {newFieldType === 'select' && (
                  <input
                    type="text"
                    placeholder="Comma-separated options (e.g. 500GB, 1TB, 2TB, 4TB)"
                    value={newFieldOptions}
                    onChange={(e) => setNewFieldOptions(e.target.value)}
                    className="w-full bg-white text-xs text-slate-900 p-2 rounded-lg border border-slate-200 focus:border-sky-500 focus:outline-none font-mono text-[11px]"
                  />
                )}

                <button
                  type="button"
                  onClick={handleAddSpecField}
                  className="w-full bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs py-2 rounded-lg transition"
                >
                  + Add Specification Field
                </button>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition shadow-xs"
                >
                  {editingCategory ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
