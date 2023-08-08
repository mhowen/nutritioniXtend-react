import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/themeContext";
import { nixClient } from "../../config/axios";
import mapInstantSearchResponse from "./mapInstantSearchResponse";
import PropTypes from 'prop-types';

export default function InstantSearchForm({ onError, onNewResults }) {
	const [queryString, setQueryString] = useState("chicken");
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);

    const { appTheme } = useContext(ThemeContext);

    useEffect(() => {
        if (!query || query.length === 0) return;
        setLoading(true);
        const controller = new AbortController;

        nixClient.get(`/search/instant?query=${query}`)
            .then(res => {
                if (!res.data) return onError('Malformed response from HTTP client');
                return res.data
            })
            .then(data => {
                console.log('parsed:', data);
                if (data.message) return onError(data.message);
                const mapped = mapInstantSearchResponse(data);
                if (mapped) return onNewResults(mapped);
                else return onError('Unknown error parsing server response');
            })
            .catch(err => onError(err?.message || 'Unknown error during call to search/instant'))
            .finally(() => setLoading(false));
        return () => controller.abort(); // forget this request if component re-renders or is unmounted
    }, [query]);

	return (
        <div>
            <form onSubmit={e => {
                e.preventDefault();
                return setQuery(queryString);
            }}>
                <div className="flex flex-spb flex-wrap p-1em gap-sm">
                    <label
                        htmlFor='nix-instant-search'
                        className='visually-hidden'
                    >Search Foods:</label>
                    <input
                        id='nix-instant-search'
                        type='text'
                        className='flex-1 font-med p-btn'
                        placeholder="Search foods or products"
                        value={queryString}
                        onChange={e => setQueryString(e.target.value)}
                    />
                    <button
                        type='submit'
                        className={`m-center bg-accent ${appTheme}`}
                    >Submit</button>
                </div>
            </form>
        </div>
	)
}
InstantSearchForm.propTypes = {
    onError: PropTypes.func.isRequired,
	onNewResults: PropTypes.func.isRequired,
}
