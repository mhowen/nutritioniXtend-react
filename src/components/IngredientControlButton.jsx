import { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';
import { icon_add, icon_nix, icon_remove } from '../assets/icons/AppIcons';
import PropTypes from 'prop-types';

// This implementation reuses several functionalities across components, for which this can be slotted in
// 'hint' is visible when button is hovered over to aid semantic accessibility
export default function IngredientControlButton({type, onClick}) {
    const { appTheme } = useContext(ThemeContext);

    const content = typeMap[type] || { icon: null, alt: 'Unknown Control Type '};

    let textContent = 'Nutrition';
    if (type === 'btn-add') textContent = 'Add';
    if (type === 'btn-del') textContent = 'Remove';
    
    return(
        <>
            <button
                aria-label={content.alt}
                className={`btn-hint btn-icon ${type} ${appTheme}`}
                onClick={onClick}
            >
                {content?.icon}
            </button>
        </>
    )
}
IngredientControlButton.propTypes = {
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

const typeMap = {
    'btn-add': { icon: icon_add, alt: 'Add to Recipe' },
    'btn-del': { icon: icon_remove, alt: 'Remove from Recipe' },
    'btn-nf': { icon: icon_nix, alt: 'View Nutrition' },
}
