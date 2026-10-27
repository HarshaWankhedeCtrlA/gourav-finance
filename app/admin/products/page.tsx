"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "", slug: "", description: "", minAmount: "", maxAmount: "", minTenure: "", maxTenure: "", interestRate: ""
  });

  // Fetch products on load
  const fetchProducts = () => {
    fetch("/api/admin/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Product added successfully!");
        setIsAdding(false);
        setFormData({ name: "", slug: "", description: "", minAmount: "", maxAmount: "", minTenure: "", maxTenure: "", interestRate: "" });
        fetchProducts(); // Refresh list
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      alert("Error connecting to server.");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-primary mb-2">Loan Products</h1>
          <p className="text-muted">Manage the loans offered on the public website.</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} className="bg-primary">
          {isAdding ? "Cancel" : "+ Add New Product"}
        </Button>
      </div>

      {/* Add Product Form */}
      {isAdding && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8 animate-in fade-in slide-in-from-top-4">
          <h2 className="text-xl font-semibold mb-4 text-ink">Add New Loan Product</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Product Name</Label>
              <Input required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="e.g. Gold Loan" />
            </div>
            <div className="space-y-2">
              <Label>URL Slug (lowercase, no spaces)</Label>
              <Input required value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value})} placeholder="e.g. gold-loan" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Description</Label>
              <Input required value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Brief description of the loan..." />
            </div>
            <div className="space-y-2">
              <Label>Min Amount (₹)</Label>
              <Input required type="number" value={formData.minAmount} onChange={(e) => setFormData({...formData, minAmount: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Max Amount (₹)</Label>
              <Input required type="number" value={formData.maxAmount} onChange={(e) => setFormData({...formData, maxAmount: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Min Tenure (Months)</Label>
              <Input required type="number" value={formData.minTenure} onChange={(e) => setFormData({...formData, minTenure: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Max Tenure (Months)</Label>
              <Input required type="number" value={formData.maxTenure} onChange={(e) => setFormData({...formData, maxTenure: e.target.value})} />
            </div>
            <div className="space-y-2">
              <Label>Interest Rate (% p.a.)</Label>
              <Input required type="number" step="0.1" value={formData.interestRate} onChange={(e) => setFormData({...formData, interestRate: e.target.value})} />
            </div>
            <div className="md:col-span-2 mt-4">
              <Button type="submit" className="w-full bg-success hover:bg-success/90">Save Product</Button>
            </div>
          </form>
        </div>
      )}

      {/* Products List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-600">
            <tr>
              <th className="px-6 py-4 font-semibold">Product Name</th>
              <th className="px-6 py-4 font-semibold">Slug</th>
              <th className="px-6 py-4 font-semibold">Amount Range</th>
              <th className="px-6 py-4 font-semibold">Rate</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
            ) : products.length === 0 ? (
              <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-500">No products found. Add one above!</td></tr>
            ) : (
              products.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-ink">{p.name}</td>
                  <td className="px-6 py-4 text-gray-500 font-mono text-xs">{p.slug}</td>
                  <td className="px-6 py-4 text-gray-600">
                    ₹{p.minAmount.toLocaleString("en-IN")} - ₹{p.maxAmount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{p.interestRate}%</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">Delete</Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}