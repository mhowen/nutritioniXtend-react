import { nixClient } from '../../config/axios';
import simulateNutritionResponse from './simulateNutritionResponse';

/**
 * returns a Promise that resolves to the response from either the real Nix API or the simulated one
 * 
 * the free tier of the Nix API allows only 100 calls to any endpoint per API key per month
 *   so, for the purposes of this demo app, we can simulate a Nutrition response if the API isn't active at app-level
 * 
 * A note on distinguishing unique results:
 *  This implementation of the Nutritionix API returns one of two result types:
 *    branded: incl. food_name and brand_name, the concatenation of which is necessarily unique
 *    common: incl. only food_name, but no two common results share names since they're really just semantic categories
 *  
 *  This idiosyncracy means we can use product_name = (brand_name?) + food_name as a unique id for every result,
 *    and we'll want to -- only branded results come with a unique identifier from the Nutritionix db.
 */
export default function fetchNutrition(nixData) {
    const simulatedAPI = import.meta.env.VITE_USING_API !== 'live';
    
    return new Promise((resolve, reject) => {
        if (nixData?.nix_item_id) {
            nixClient.get(`/search/item?nix_item_id=${nixData.nix_item_id}`)
                .then(res => {
                    const result = parseResponse(res.data, simulatedAPI);

                    if (simulatedAPI) return setTimeout(() => resolve(result), 300);
                    return resolve(result);
                })
                .catch(err => reject(err));
        }
        else if (nixData?.food_name) {
            nixClient.post('/natural/nutrients', { query: nixData.food_name })
                .then(res => {
                    const result = parseResponse(res.data, simulatedAPI);
                    if (simulatedAPI) return setTimeout(() => resolve(result), 300);
                    return resolve(result);
                }).catch(err => reject(err));
        }
        else return reject('Invalid Fetch Data!');
    })

    // simulate response if necessary, then return the nutritional data nested in the response Object
    function parseResponse(res, simulateData) {
        let responseObject = res;
        console.log('res object is:', responseObject)
        
        if (!responseObject.foods) throw new Error('fetchNutrition received malformed response Object');
        if (!responseObject.foods[0]) throw new Error('Database found no entry for query');
        
        if (simulateData) responseObject = simulateNutritionResponse(nixData);

        const result = responseObject.foods[0]; // this implementation of Nix API gets exactly one result per response
        
        // add a product_name property to uniquely identify nutrition listed in the Recipe Builder
        result.product_name = result.brand_name ? `${result.brand_name} ${result.food_name}` : result.food_name;

        return result;
    }
}
