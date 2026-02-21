// hooks/useSearch.js
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import debounce from 'lodash.debounce';
import { useAllProducts } from './useAllProducts';

export function useSearch() {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const { products, loading: productsLoading } = useAllProducts();
    const router = useRouter();

    useEffect(() => {
        if (query.length < 2 || productsLoading) {
            setSuggestions([]);
            return;
        }

        const words = query.toLowerCase().split(/\s+/).filter(w => w.length > 0);
        const filtered = products.filter(product =>
            words.every(word => product.name.toLowerCase().includes(word))
        );
        setSuggestions(filtered.slice(0, 5)); // show top 5
    }, [query, products, productsLoading]);

    const submitSearch = (e, closeMenu) => {
        e?.preventDefault();
        if (query.trim()) {
            router.push(`/products?search=${encodeURIComponent(query)}`);
            setQuery('');
            // Optionally clear suggestions after search
            setSuggestions([]);
            // Optionally, you could also trigger a global event or state update here if needed
            // ✅ Call the passed function if it exists
            if (typeof closeMenu === 'function') {
                closeMenu();
            }
        }
    };

    return {
        query,
        setQuery,
        suggestions,
        isLoading: productsLoading,
        submitSearch,
    };
}