"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit2, Trash2, Plus } from "lucide-react";

// Sample advertisements data - matching the Figma design
const advertisementsData = [
  {
    id: "ad-1",
    productNo: "01",
    category: "Mens",
    image: null // No image for product 1
  },
  {
    id: "ad-2",
    productNo: "02", 
    category: "Women",
    image: true // Has image
  },
  {
    id: "ad-3",
    productNo: "03",
    category: "Kids", 
    image: true // Has image
  },
  {
    id: "ad-4",
    productNo: "04",
    category: "Others",
    image: true // Has image
  }
];

function ProductCard({ product, onEdit, onDelete }) {
  const isDeleteDisabled = product.id === "ad-1"; // Disable delete for product 1
    return (
    <div className="border-2  rounded-xl p-4 bg-white">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-[#005226]">
          Product No. : {product.productNo}
        </h3>
      </div>

      <div className="flex items-start gap-4 mb-6">        {/* Product Image - only for products 2, 3, 4 */}
        <div className="flex-shrink-0 w-24">
          {product.image ? (
            <div className="w-24 h-24 bg-blue-100 rounded-xl overflow-hidden">
              {/* Using a placeholder that shows a person with clothing */}
              <div className="w-full h-full bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-12 h-16 bg-green-600 rounded-lg mx-auto mb-1 relative">
                    {/* Simple person silhouette */}
                    <div className="w-4 h-4 bg-green-700 rounded-full absolute top-1 left-1/2 transform -translate-x-1/2"></div>
                    <div className="w-8 h-8 bg-green-700 rounded-t-lg absolute bottom-0 left-1/2 transform -translate-x-1/2"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Empty space placeholder to maintain layout consistency
            <div className="w-24 h-24"></div>
          )}
        </div>

        {/* Product Category */}
        <div className="flex-1 min-w-0">
          <p className="text-base font-semibold text-[#005226] mb-2">Product Category</p>
          <p className="text-base text-gray-700">{product.category}</p>
        </div>
      </div>      {/* Action Buttons */}
      <div className="border-t border-gray-400 pt-3 mt-auto">
        <div className="flex justify-center items-center">
          <button
            onClick={() => !isDeleteDisabled && onDelete(product.id)}
            disabled={isDeleteDisabled}
            className={`flex items-center gap-2 transition-colors ${
              isDeleteDisabled 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-red-500 hover:text-red-600'
            }`}
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">Delete</span>
          </button>
          
          {/* Vertical divider line */}
          <div className="h-8 w-px bg-gray-400 mx-6"></div>
          
          <button
            onClick={() => onEdit(product.id)}
            className="flex items-center gap-2 text-[#005226] hover:text-[#003917] transition-colors"
          >
            <Edit2 className="w-4 h-4" />
            <span className="text-sm font-medium">Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdvertisementsGrid() {
  const router = useRouter();
  const [products, setProducts] = useState(advertisementsData);

  const handleEdit = (productId) => {
    router.push(`/advertisement/edit?id=${productId}`);
  };

  const handleDelete = (productId) => {
    setProducts(products.filter(product => product.id !== productId));
    console.log(`Delete product ${productId}`);
  };

  const handleAddProduct = () => {
    console.log("Add new product");
    // Add new product functionality here
  };  return (
    <div className="px-6 pb-6">
      {/* Header with Add Products button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={handleAddProduct}
          className="flex items-center gap-2 bg-[#005226] text-white px-4 py-2 rounded-md border border-[#005226] hover:bg-[#003917] hover:border-[#003917] transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Products</span>
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="col-span-2 text-center py-12">
            <div className="text-gray-500">
              <h3 className="text-lg font-medium mb-2">No products available</h3>
              <p>Add your first product to get started.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
