/**
 * From a parsed, well-formed response Object from /v2/search/instant (i.e., { branded: [...], common: [...]}),
 * do the following:
 *   1) filter down res.common such that each unique tag_id occurs only once
 *      (subsequent results are nutritionally identical; API docs say the first will be most query-relevant)
 * 
 *   2) concatenate res.branded and the result of step 1
 * 
 *   3) return an Array mapped from the result of step 2 such that each Object now has:
 *        - a "nutrition" property, initialized to null
 *        - a "loading" property, initialized to false
 *        - all the useful metadata from the corresponding instant search result
 * 
 *  Keep in mind: all product_names are either a unique combo of brand_name and food_name,
 *    or are shared with other common foods that are nutritionally and semantically identical
 *  So, using it as an id saves us the trouble of having to cache previous search results
 * 
 */

export default function mapInstantSearchResponse(responseObject) {
    if (!responseObject) return null;

    const uniqueCommons = filterDuplicateCommons(responseObject.common);
    const brandedContents = responseObject.branded || [];
    const consolidated = brandedContents.concat(uniqueCommons);
    if (consolidated.length === 0) return null;

    return consolidated.map(obj => mapResultData(obj));
}

// filter out any result whose previous sibling has the same tag_id
// this shortcut works fine because common results are either sorted by tag_id OR...
// ...they're unsorted because of an important semantic distinction, and so should be included anyway
function filterDuplicateCommons(commonArray) {
    if (!commonArray || commonArray.length === 0) return [];

    return commonArray.filter((obj, index, arr) => {
        if (index === 0 || obj.tag_id !== arr[index - 1].tag_id) return true;
        return false;
    });
}

function mapResultData(obj) {
    const productName = obj.brand_name_item_name || obj.food_name; // unique among all results and used as app id
    const servingString = (obj.serving_qty || 1) + " " + (obj.serving_unit || 'serving');

    return {
        data: { ...obj },
        loading: false,
        product_name: productName,
        serving_string: servingString,
    }
}
