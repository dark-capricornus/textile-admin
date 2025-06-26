"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import ProductEditForm from "../../../../components/advertisement/ProductEditForm";

// Sample data - in a real app, this would come from an API
const sampleProducts = [
  {
    id: "ad-1",
    productNo: "01",
    category: "Mens",
    heading: "Classic T-Shirt",
    content: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Sit Cras Duis Ac Fermentum At Urna, Dictumst Ultricies Tortor. Adipiscing Sed Urna, Neque Posuere Aliquam Porttitor At.",
    images: "data/man.jpg"
  },
  {
    id: "ad-2",
    productNo: "02",
    category: "Women",
    heading: "Relaxed Fit Hoodie",
    content: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Sit Cras Duis Ac Fermentum At Urna, Dictumst Ultricies Tortor. Adipiscing Sed Urna, Neque Posuere Aliquam Porttitor At.",
    images: "data/man.jpg"
  },
  {
    id: "ad-3",
    productNo: "03",
    category: "Kids",
    heading: "Kids Casual Wear",
    content: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Sit Cras Duis Ac Fermentum At Urna, Dictumst Ultricies Tortor. Adipiscing Sed Urna, Neque Posuere Aliquam Porttitor At.",
    images: "data/man.jpg"
  },
  {
    id: "ad-4",
    productNo: "04",
    category: "Others",
    heading: "Accessories",
    content: "Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Sit Cras Duis Ac Fermentum At Urna, Dictumst Ultricies Tortor. Adipiscing Sed Urna, Neque Posuere Aliquam Porttitor At.",
    images: "data/man.jpg"
  }
];

export default function EditProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  
  const [product, setProduct] = useState(null);
  useEffect(() => {
    if (productId) {
      // In a real app, fetch from API
      const foundProduct = sampleProducts.find(p => p.id === productId);
      setProduct(foundProduct);
    }
  }, [productId]);

  const handleSave = (updatedProduct) => {
    // In a real app, save to API
    console.log('Saving product:', updatedProduct);
    // Redirect back to advertisements page
    router.push('/advertisement');
  };

  const handleCancel = () => {
    router.push('/advertisement');
  };

  if (!product) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2">Product not found</h3>
          <button
            onClick={() => router.push('/advertisement')}
            className="text-[#005226] hover:underline"
          >
            Go back to advertisements
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <ProductEditForm
        product={product}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
}
