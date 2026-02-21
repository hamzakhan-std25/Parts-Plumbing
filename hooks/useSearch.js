// hooks/useSearch.js
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import debounce from 'lodash.debounce'; // or use a simple setTimeout

export function useSearch() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Fetch suggestions from your GraphQL endpoint
  const fetchSuggestions = useCallback(
    debounce(async (searchTerm) => {
      if (searchTerm.length < 2) {
        setSuggestions([]);
        return;
      }
      setIsLoading(true);
      try {
        // Replace with your actual GraphQL query
        const res = await fetch('https://live-parts-plumbing.pantheonsite.io/graphql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `
              query SearchSuggestions($search: String!) {
                products(where: { search: $search }, first: 5) {
                  nodes { name slug }
                }
              }
            `,
            variables: { search: searchTerm },
          }),
        });
        const json = await res.json();
        setSuggestions(json.data?.products?.nodes || []);
      } catch (error) {
        console.error('Search suggestion error:', error);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    fetchSuggestions(query);
  }, [query, fetchSuggestions]);

  const submitSearch = (e) => {
    e?.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query)}`);
      // Optionally close overlay
    }
  };

  return {
    query,
    setQuery,
    suggestions,
    isLoading,
    submitSearch,
  };
}