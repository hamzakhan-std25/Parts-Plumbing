'use client';

import { useState } from 'react';
import { findMatchingVariant } from '@/utils/variation.utils';
import VariationOptions from './VariationOptions';
import Description from './Description';
import { generateWhatsAppLink } from '@/lib/whatsapp.utils';
import Link from 'next/link';
import Image from 'next/image';

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
            <Link
              href="/"
              className="hover:text-white
            "
            >
              Home
            </Link>
          </li>
          <li className="mx-2">/</li>
          <li>
            <Link href="/products" className="hover:text-white">
              {product.productCategories.nodes[0].name}
            </Link>
          </li>
          <li className="mx-2">/</li>
          <li className="text-gray-300 font-medium">{product.name}</li>
        </ul>
      </nav>

      <div className="bg-[#1e293b] rounded-2xl overflow-hidden shadow-xl">
        {/* Image */}

        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={product.image?.sourceUrl || '/placeholder-product.png'}
            alt={product.name}
            fill // This replaces w-full h-full on the image itself
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Prevents loading massive images on mobile
            className="object-cover"
          />
        </div>

        <div className="relative w-full h-80">
          <Image
            src={product.image?.sourceUrl || '/placeholder-product.png'}
            alt={product.name || 'Product Image'}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={true}
          />
        </div>

        <div className="p-6">
          {/* Title */}
          <h1 className="text-2xl font-bold mb-3">{product.name}</h1>

          {/* Description with Read More */}
          <Description htmlContent={product.description} />

          {/* Variation Selector */}
          <VariationOptions variations={variations} selected={selected} setSelected={setSelected} />

          {/* Price */}
          {matchedVariant && (
            <div className="text-2xl font-bold text-yellow-400 mt-4">
              Rs : {parseInt(matchedVariant.price.replace(/[^0-9]/g, ''), 10)}
            </div>
          )}

          {/* Buttons */}
          {matchedVariant && (
            <div className="flex gap-4 mt-6 flex-wrap">
              <Link
                href={generateWhatsAppLink(product, matchedVariant)}
                target="_blank"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold"
              >
                Ask Price on WhatsApp
              </Link>

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
