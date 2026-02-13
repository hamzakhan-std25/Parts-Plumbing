"use client";

import { useState } from "react";

export default function Description({ htmlContent }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <div
        className={`prose prose-sm text-gray-600 ${
          !isExpanded ? "line-clamp-3" : ""
        }`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-600 hover:underline text-sm font-medium mt-2"
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    </div>
  );
}