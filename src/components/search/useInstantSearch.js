/**
 * Calls /v2/search/instant with url-encoded query
 * The intended use of this endpoint would have us pass in the search bar's value state
 * This implementation forgoes that due to Nix's super-restrictive call limit at the free tier
 * 
 */

import { useState, useEffect } from "react";

export default function useInstantSearch(query) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        if (!query || query.length === 0) return; // don't bother fetching with a blank query
        setData(null);
        setError(null);
        setLoading(true);
        const controller = new AbortController();
        
        const url = '/search/instant?query=' + query;
        fetch(url, { signal: controller.signal })
            .then(res => res.json())
            .then(json => setData(json))
            .catch(err => setError(err))
            .finally(() => setLoading(false));
            return () => {
                controller.abort(); // if component re-rendered or was unmounted, forget this request
            }
        }, [query]);
    return { data, error, loading };
}
