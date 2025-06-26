import React from "react";

export function Button({ children, className = "", onClick, ...props }) {
  return (
    <button
      className={`px-4 py-2 rounded-md font-medium transition-colors ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
