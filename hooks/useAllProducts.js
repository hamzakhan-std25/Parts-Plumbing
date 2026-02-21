// hooks/useAllProducts.js
"use client"
import { getProducts } from '@/services/product.service';
import { useEffect, useState } from 'react';

const CACHE_KEY = 'kpk_all_products';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export function useAllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        // Check localStorage
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const { timestamp, data } = JSON.parse(cached);
          if (Date.now() - timestamp < CACHE_DURATION) {
            console.log("from localStorage : ...")
            setProducts(data);
            setLoading(false);
            return;
          }
        }        
          const res = await getProducts(200)
          console.log("getProducts is :", res)
          const fetchedProducts = res?.nodes || [];
          console.log("fetchedProducts : ",fetchedProducts)
        

        // Store in localStorage
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ timestamp: Date.now(), data: fetchedProducts })
        );

        setProducts(fetchedProducts);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return { products, loading, error };
}