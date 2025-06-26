// components/ui/Pagination.jsx
"use client";

export default function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  maxVisiblePages = 5 
}) {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return Array.from({ length: maxVisiblePages }, (_, i) => i + 1);
    }

    if (currentPage >= totalPages - 2) {
      return Array.from({ length: maxVisiblePages }, (_, i) => totalPages - maxVisiblePages + 1 + i);
    }

    return Array.from({ length: maxVisiblePages }, (_, i) => currentPage - 2 + i);
  };

  const visiblePages = getVisiblePages();
  const showEllipsis = totalPages > maxVisiblePages && currentPage < totalPages - 2;

  return (
    <div className="flex justify-center items-center mt-6 gap-1">
      {/* Previous Button */}
      <button 
        className="w-8 h-8 flex items-center justify-center rounded-full text-sm text-black hover:bg-gray-50 disabled:opacity-50 transition-colors"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      
      {/* Page Numbers */}
      {visiblePages.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-medium transition-colors ${
            currentPage === pageNumber
              ? "bg-[#005226] text-white"
              : "text-gray-600 hover:bg-gray-50"
          }`}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}
      
      {/* Ellipsis */}
      {showEllipsis && (
        <>
          <span className="flex items-center justify-center w-8 h-8 text-gray-400 text-sm">•</span>
          <span className="flex items-center justify-center w-8 h-8 text-gray-400 text-sm">•</span>
          <span className="flex items-center justify-center w-8 h-8 text-gray-400 text-sm">•</span>
        </>
      )}
      
      {/* Next Button */}
      <button 
        className="w-8 h-8 flex items-center justify-center rounded-full text-sm text-black hover:bg-gray-50 disabled:opacity-50 transition-colors"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
}
