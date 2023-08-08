import mapNutritionFacts from './mapNutritionFacts';
import PropTypes from 'prop-types';

export default function NixNutritionViewer({onRequestDetails, nutritionData: nd}) {
    const isUserRecipe = nd.product_name === 'My Recipe';
    
    const factData = mapNutritionFacts(nd);

    return (
        <div className="nf-container">
            <div>
                <h3 className='border-bottom font-family-fgh font-huge'>Nutrition Facts</h3>
            </div>

            <div className='border-bottom-huge font-bold flex flex-wrap flex-spb font-med p-v-sm'>
                <span>Serving Size</span>
                <span>{nd.serving_qty} {nd.serving_unit}
                    {nd.serving_weight_grams ? ` (${nd.serving_weight_grams}g)` : ''}
                </span>
            </div>

            <div
                className={`border-bottom-big flex flex-spb flex-align-center ${isUserRecipe ? 'nf-interactive' : ''}`}
                onClick={() => onRequestDetails('nf_calories', 'Calories')}
            >
                <div className='font-bold flex-col'>
                    <span className='font-med'>Amount per serving</span>
                    <span className='font-big'>Calories</span>
                </div>
                <span className='font-bold font-huge font-family-fgh'>{nd.nf_calories}</span>
            </div>

            <div className='border-bottom text-right'>% Daily Value</div>

            <div className='border-bottom-huge'>
                {
                    factData.map(fact =>
                        <div
                            key={fact.name}
                            className={`border-bottom flex flex-spb ${isUserRecipe ? 'nf-interactive' : ''}`}
                            onClick={() => onRequestDetails(fact.nix_alias, fact.name)}
                        >
                            <span className={fact.indent ? 'm-left-1em' : 'font-bold'}>{fact.name}</span>
                            <span className='m-left-1ch'>{fact.val + (fact.unit || 'g')}</span>
                            <span className='auto-right'>{fact.pdv + '%'}</span>
                        </div>
                    )
                }
            </div>

            <div className='font-sm m-top-sm'>
                *Percent Daily Values are based on a 2,000 calorie diet. Your Daily Values may be
                higher or lower depending on your calorie needs—or so I hear, anyway. I&apos;m sure
                you know better than to take nutritional advice from SPA demos.
            </div>
        </div>
    )
}
NixNutritionViewer.propTypes = {
    onRequestDetails: PropTypes.func.isRequired,
    nutritionData: PropTypes.object
}
