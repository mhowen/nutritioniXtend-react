import { useState } from 'react';
import { icon_add, icon_nix, icon_remove } from '../../assets/icons/AppIcons';
import AppList from '../../components/AppList';
import InstantSearchForm from './InstantSearchForm'
import InstantSearchResult from './InstantSearchResult';
import fetchNutrition from './fetchNutrition';
import PropTypes from 'prop-types';

export default function NixInstantSearch({currentRecipe, onDisplayNutrition, onToggleIngredient}) {
    const [error, setError] = useState(null);
    const [resultsData, setResultsData] = useState(null); // data from which InstantSearchResults are rendered

    // change loading state of a given result or store fetched nutrition directly within render data
    function updateResult(result, { loading = false, nutrition = result.nutrition }) {
        setResultsData(resultsData.map(obj => {
            if (obj.product_name === result.product_name) return { ...result, loading: loading, nutrition: nutrition };
            return obj;
        }));
    }

    function handleFetchNutrition(result, callback) {
        updateResult(result, { loading: true });
        setError(null);
        fetchNutrition(result.data)
            .then(res => {
                console.log('got res from fetchNutrition:', res);
                updateResult(result, { nutrition: res }); // also sets result.loading back to false
                return callback(res);
            }).catch(err => {
                console.log('got error:', err)
                return setError(err?.message);
            });
    }

    // access or fetch nutrition and pass resulting object up to App for transfer to NixNutrition
    function handleDisplay(result) {
        if (!result?.data) return;
        if (result.nutrition) return onDisplayNutrition(result.nutrition);

        handleFetchNutrition(result, onDisplayNutrition);
    }

    // add or remove result from recipe
    function handleIngredient(result) {
        // like-named product already in recipe? send a removal action
        if (currentRecipe.find(ingr => ingr.product_name === result.product_name)) {
            return onToggleIngredient({ type: 'REMOVE_INGR', payload: result.product_name});
        }
        
        // otherwise, find or fetch nutrition and send an addition action
        if (result.nutrition) return onToggleIngredient({ type: 'ADD_INGR', payload: result.nutrition });
        handleFetchNutrition(result, (nutrition) => onToggleIngredient({ type: 'ADD_INGR', payload: nutrition }));
    }

    const ingredientNames = currentRecipe.map(ingr => ingr.product_name); // sets inRecipe prop of each list item

    let message = resultsData?.length > 0 ? `Returned ${resultsData.length} results for query` : 'Awaiting input!';
    if (error) message = error;

    return (
        <>
            <InstantSearchForm
                onError={(err) => setError(err)}
                onNewResults={(results) => {
                    setError(null);
                    console.log('mapped results to display:', results)
                    return setResultsData(results);
                }}
            />

            <div className={error ? 'p-1em warn' : 'p-1em'}>{message}</div>

            <div className='flex-col gap-sm m-left-1em lgscreen-hidden'>
                <div className='flex flex-align-center gap-sm'>
                    <span className='btn-nf'>{icon_nix}</span>
                    <span>View Nutrition</span>
                </div>
                <div className='flex flex-align-center gap-sm'>
                    <span className='btn-add'>{icon_add}</span>/
                    <span className='btn-del'>{icon_remove}</span>
                    <span>Add/Remove from Recipe</span>
                </div>
            </div>

            <AppList>
                {resultsData?.map(result =>
                    <InstantSearchResult
                        key={result.product_name}
                        resultData={result.data}
                        name={result.product_name}
                        loading={result.loading}
                        inRecipe={ingredientNames.includes(result.product_name)}
                        onDisplayNutrition={() => handleDisplay(result)}
                        onToggleIngredient={() => handleIngredient(result)}
                    />
                )}
            </AppList>
        </>
    )
}
NixInstantSearch.propTypes = {
    currentRecipe: PropTypes.arrayOf(PropTypes.object),
    onDisplayNutrition: PropTypes.func.isRequired,
    onToggleIngredient: PropTypes.func.isRequired,
}
