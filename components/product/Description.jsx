"use client";

import { useState } from "react";
import { useDebouncedClick } from "@/hooks/useDebouncedClick";

export default function Description({ htmlContent }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const debouncedToggleExpanded = useDebouncedClick(() => {
    setIsExpanded((prev) => !prev);
  }, 250);

  return (
    <div>
      <div
        className={`prose prose-sm text-gray-300 ${
          !isExpanded ? "line-clamp-3" : ""
        }`}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
      <button
        onClick={debouncedToggleExpanded}
        className="bg-yellow-300 p-2 block  rounded-xl cursor-pointer transition-all float-end text-black text-sm font-medium mt-2"
      >
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    </div>
  );
}