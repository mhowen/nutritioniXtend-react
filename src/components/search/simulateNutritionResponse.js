/**
 * Creates a simulated response from the specified Nutritionix API endpoint based on input metadata
 * 
 * @param {object} instantResult A branded or generic food result from search/instant endpoint
 */

// simulates a response from /v2/search/item, i.e. for branded food items
export default function simulateNutritionResponse(instantResult) {
    return {
        "foods": [
			{
				"food_name": instantResult.food_name,
				"brand_name": instantResult.brand_name,
				"serving_qty": instantResult.serving_qty || 1,
				"serving_unit": instantResult.serving_unit || 'serving',
				"serving_weight_grams": Math.random() > 0.5 ? randomInt(5, 250) : null,
				"nf_calories": instantResult.nf_calories || randomInt(0, 1500),
				"nf_total_fat": randomInt(2, 35),
				"nf_saturated_fat": randomInt(0, 10),
				"nf_cholesterol": randomInt(5, 100),
				"nf_sodium": randomInt(0, 1000),
				"nf_total_carbohydrate": randomInt(0, 80),
				"nf_dietary_fiber": randomInt(0, 25),
				"nf_sugars": randomInt(0, 80),
				"nf_protein": randomInt(0, 40),
				"nix_item_name": instantResult.food_name,
				"nix_item_id": instantResult.nix_item_id,
				"photo": {
					"thumb": instantResult.image || null,
					"highres": null
				}
			}
        ]
    }
}

function randomInt(min, max) {
    const low = Math.ceil(min);
    const hi = Math.floor(max);
    return Math.floor(Math.random() * (hi - low) + low);
}
