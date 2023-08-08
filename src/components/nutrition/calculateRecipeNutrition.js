// from input Array of nutrition objects, accumulate and return numerical totals as 'My Recipe'
export default function calculateRecipeNutrition(recipe) {
    if (!recipe || recipe.length === 0) return initialRecipe;

    const accumulated = { ...initialRecipe };
    for (const ingr of recipe) {
        const qty = ingr.recipe_qty || 1;
        accumulated.nf_calories += parseInt(ingr.nf_calories) * qty;
        accumulated.nf_cholesterol += parseInt(ingr.nf_cholesterol) * qty;
        accumulated.nf_dietary_fiber += parseInt(ingr.nf_dietary_fiber) * qty;
        accumulated.nf_protein += parseInt(ingr.nf_protein) * qty;
        accumulated.nf_saturated_fat += parseInt(ingr.nf_saturated_fat) * qty;
        accumulated.nf_sodium += parseInt(ingr.nf_sodium) * qty;
        accumulated.nf_sugars += parseInt(ingr.nf_sugars) * qty;
        accumulated.nf_total_carbohydrate += parseInt(ingr.nf_total_carbohydrate) * qty;
        accumulated.nf_total_fat += parseInt(ingr.nf_total_fat) * qty;
    }

    return accumulated;
}

const initialRecipe = {
    food_name: 'My Recipe',
    nf_calories: 0,
    nf_cholesterol: 0,
    nf_dietary_fiber: 0,
    nf_protein: 0,
    nf_saturated_fat: 0,
    nf_sodium: 0,
    nf_sugars: 0,
    nf_total_carbohydrate: 0,
    nf_total_fat: 0,
    product_name: 'My Recipe',
    serving_qty: 1,
    serving_unit: 'serving',
}