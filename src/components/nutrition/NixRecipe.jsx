import AppList from '../../components/AppList';
import ListedIngredient from './ListedIngredient';
import PropTypes from 'prop-types';

export default function NixRecipe({currentRecipe, onDisplayNutrition, onQuantityChange }) {
    const listItems = currentRecipe?.map(ingr =>
        <li key={ingr.product_name}>
            <ListedIngredient
                name={ingr.product_name}
                quantity={ingr.recipe_qty}
                onQuantityChange={(itemName, newQty) => onQuantityChange(itemName, newQty)}
                onDisplayNutrition={() => onDisplayNutrition(currentRecipe.find(r => r.product_name === ingr.product_name))}
            />
        </li>
    );
    
    return (
        <>
            <AppList>{listItems}</AppList>
        </>
    )
}
NixRecipe.propTypes = {
    currentRecipe: PropTypes.arrayOf(PropTypes.object),
    onDisplayNutrition: PropTypes.func.isRequired,
    onQuantityChange: PropTypes.func.isRequired,
}
