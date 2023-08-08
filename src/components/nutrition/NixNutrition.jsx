import { useState } from "react";
import AppList from '../AppList';
import NixNutritionViewer from "./NixNutritionViewer";
import calculateRecipeNutrition from "./calculateRecipeNutrition";
import PropTypes from 'prop-types';

export default function NixNutrition({displayedNutrition, currentRecipe}) {
    const [listedFact, setListedFact] = useState(null);
    const [listedIngredients, setListedIngredients] = useState([]);

    let headerContent = 'Awaiting Input!';

    if (displayedNutrition) headerContent = `Currently Displaying: ${displayedNutrition.product_name}`;
    else if (listedFact) headerContent = `Contribution of Ingredients by ${listedFact}`
    else if (currentRecipe && currentRecipe.length > 0) headerContent = 'Currently Displaying: User Recipe';

    return (
        <div className="lgscreen-flex-row">
            <NixNutritionViewer
                nutritionData={displayedNutrition || calculateRecipeNutrition(currentRecipe)}
                onRequestDetails={(nf, name) => {
                    setListedFact(name);
                    const contributors = currentRecipe.filter(ingr => ingr[nf] && ingr[nf] > 0);
                    const listMapped = contributors.map((ingr) => ({ product_name: ingr.product_name, nf_value: ingr[nf] }));
                    return setListedIngredients(listMapped);
                }}
            />

            <div className="flex-1 flex-col p-1em">
                <h3>{headerContent}</h3>

                <AppList>
                    {
                        listedIngredients.map(ingr =>
                            <li
                                key={ingr.product_name}
                                className="flex flex-spb flex-align-center gap-1em p-v-sm"
                            >
                                <span>{ingr.product_name}</span>
                                <span className="font-bold font-primary">
                                    {ingr.nf_value + (listedFact === 'Sodium' ? 'mg' : 'g')}
                                </span>
                            </li>
                        )
                    }
                </AppList>
            </div>
        </div>
    )
}
NixNutrition.propTypes = {
    displayedNutrition: PropTypes.object,
    currentRecipe: PropTypes.arrayOf(PropTypes.object),
}
