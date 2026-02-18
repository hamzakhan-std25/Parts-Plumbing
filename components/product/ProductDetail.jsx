"use client";

import { useState } from "react";
import { findMatchingVariant } from "@/utils/variation.utils";
import VariationOptions from "./VariationOptions";
import Description from "./Description";
import { generateWhatsAppLink } from "@/lib/whatsapp.utils";

export default function ProductDetail({ product }) {
  const variations = product.variations.nodes;
  const [selected, setSelected] = useState({});

  const matchedVariant = findMatchingVariant(variations, selected);
  // console.log("matchedVariant is :" , matchedVariant)

  return (
    <div className="max-w-5xl mx-auto p-6">

      <nav className="text-sm text-gray-500 mb-6">
        <ul className="flex flex-wrap items-center">
          <li>
            <a href="/" className="hover:text-white
            ">
              Home
            </a>
          </li>
          <li className="mx-2">/</li>
          <li>
            <a href="/products" className="hover:text-white">
            { product.productCategories.nodes[0].name}
            </a>
          </li>
          <li className="mx-2">/</li>
          <li className="text-gray-300 font-medium">{product.name}</li>
        </ul>
      </nav>

      <div className="bg-[#1e293b] rounded-2xl overflow-hidden shadow-xl">

        {/* Image */}
        <img
          src={product.image?.sourceUrl}
          alt={product.name}
          className="w-full h-80 object-cover"
        />

        <div className="p-6">

          {/* Title */}
          <h1 className="text-2xl font-bold mb-3">
            {product.name}
          </h1>

          {/* Short Description
          <div
            className="text-gray-300 mb-4"
            dangerouslySetInnerHTML={{
              __html: product.shortDescription,
            }}
          /> */}


          {/* Description with Read More */}
          <Description htmlContent={product.description} />

          {/* Variation Selector */}
          <VariationOptions
            variations={variations}
            selected={selected}
            setSelected={setSelected}
          />

          {/* Price */}
          {matchedVariant && (
            <div className="text-2xl font-bold text-yellow-400 mt-4">
              Rs : { parseInt(matchedVariant.price.replace(/[^0-9]/g, ''), 10) }
            </div>
          )}

          {/* Buttons */}
          {matchedVariant && (
            <div className="flex gap-4 mt-6 flex-wrap">
              <a
                href={generateWhatsAppLink(product, matchedVariant)}
                target="_blank"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold"
              >
                Ask Price on WhatsApp
              </a>

              <button className="border border-gray-500 px-6 py-3 rounded-full hover:bg-gray-700">
                Check Availability
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
