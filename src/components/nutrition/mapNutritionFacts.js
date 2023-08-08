// Calculates and neatly packages various data used for rendering Nutrition Facts
export default function mapNutritionFacts(data) {
    return [
        {
            nix_alias: 'nf_total_fat',
            name: 'Total Fat',
            val: data.nf_total_fat,
            pdv: Math.round(100 * (data.nf_total_fat / 78)),
        },
        {
            nix_alias: 'nf_saturated_fat',
            name: 'Saturated Fat',
            val: data.nf_saturated_fat,
            pdv: Math.round(100 * (data.nf_saturated_fat / 20)),
            indent: true,
        },
        {
            nix_alias: 'nf_cholesterol',
            name: 'Cholesterol',
            val: data.nf_cholesterol,
            pdv: Math.round(100 * (data.nf_cholesterol / 300)),
        },
        {
            nix_alias: 'nf_sodium',
            name: 'Sodium',
            val: data.nf_sodium,
            pdv: Math.round(100 * (data.nf_sodium / 2300)),
            unit: 'mg',
        },
        {
            nix_alias: 'nf_total_carbohydrate',
            name: 'Carbohydrates',
            val: data.nf_total_carbohydrate,
            pdv: Math.round(100 * (data.nf_total_carbohydrate / 275)),
        },
        {
            nix_alias: 'nf_dietary_fiber',
            name: 'Dietary Fiber',
            val: data.nf_dietary_fiber,
            pdv: Math.round(100 * (data.nf_dietary_fiber / 28)),
            indent: true,
        },
        {
            nix_alias: 'nf_sugars',
            name: 'Sugars',
            val: data.nf_sugars,
            pdv: '**',
            indent: true,
        },
        {
            nix_alias: 'nf_protein',
            name: 'Protein',
            val: data.nf_protein,
            pdv: Math.round(100 * (data.nf_protein / 50)),
        },
    ]
}