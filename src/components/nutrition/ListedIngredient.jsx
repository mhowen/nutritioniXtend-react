import { useContext } from 'react';
import { ThemeContext } from '../../context/themeContext';
import IngredientControlButton from '../IngredientControlButton';
import PropTypes from 'prop-types';

export default function ListedIngredient({ name, quantity, onQuantityChange, onDisplayNutrition }) {
    const { appTheme } = useContext(ThemeContext);
    
    return (
        <div className='flex flex-align-center gap-1em p-btn'>
            <div className='flex-1 font-bold text-capitalize'>{name}</div>
            
            <div className='ctrl-qty'>
                <span className='ctrl-qty__input'>
                    <label htmlFor={`qty-${name}`} className='visually-hidden'>Adjust Quantity</label>
                    <input
                        id={`qty-${name}`}
                        className='input-num font-med text-center'
                        type='text'
                        value={quantity}
                        onChange={(e) => onQuantityChange(name, parseInt(e.target.value) || quantity)}
                    />
                </span>

                <button
                    className={`bg-accent ${appTheme}`}
                    onClick={() => onQuantityChange(name, quantity + 1)}
                >+</button>
                
                <button
                    className={`bg-accent ${appTheme}`}
                    disabled={quantity <= 1}
                    onClick={() => onQuantityChange(name, quantity - 1)}
                >-</button>

            </div>

            <div className='flex-col lgscreen-flex-row'>
                <IngredientControlButton
                    type='btn-nf'
                    onClick={onDisplayNutrition}
                />
                <IngredientControlButton
                    type='btn-del'
                    onClick={() => onQuantityChange(name, 0)}
                />
            </div>
        </div>
    )
}
ListedIngredient.propTypes = {
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    onQuantityChange: PropTypes.func.isRequired,
    onDisplayNutrition: PropTypes.func.isRequired,
}
