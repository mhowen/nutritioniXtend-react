import { Icon } from '@iconify/react';
import IngredientControlButton from '../IngredientControlButton';
import PropTypes from 'prop-types';

export default function InstantSearchResult({ resultData, name, loading, inRecipe, onDisplayNutrition, onToggleIngredient }) {    
    let containerStyle = 'isr-container flex flex-align-center gap-1em text-center text-capitalize';
    if (loading) containerStyle += ' bg-load';

    let imageContent = <Icon icon='mdi:help-rhombus' className='isr-image' />
    if (resultData.photo?.thumb) {
        imageContent = <img src={resultData.photo.thumb} alt={`Picture of ${name}`} className='isr-image' />
    }

    const serving = `${resultData.serving_qty || 1} ${resultData.serving_unit || 'serving'}`;
    const cal = resultData.nf_calories ? `—${resultData.nf_calories} Cal` : '';

    return (
        <li>
            <div className={containerStyle}>
                <div className='isr-image-container'>
                    {imageContent}
                </div>

                <div className='flex-1 flex-col gap-sm'>
                    <span className='font-bold'>{name}</span>
                    <span>{serving}{cal ? <span className='font-primary font-bold'>{cal}</span> : null}</span>
                </div>
                
                <div className='flex-col lgscreen-flex-row'>
                    <IngredientControlButton
                        type='btn-nf'
                        onClick={() => { if (!loading) onDisplayNutrition() }}
                    />
                    <IngredientControlButton
                        type={inRecipe ? 'btn-del' : 'btn-add'}
                        onClick={() => { if (!loading) onToggleIngredient()}}
                    />
                </div>
            </div>
        </li>
    )
}
InstantSearchResult.propTypes = {
    resultData: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    inRecipe: PropTypes.bool.isRequired,
    onDisplayNutrition: PropTypes.func.isRequired,
    onToggleIngredient: PropTypes.func.isRequired,
};
