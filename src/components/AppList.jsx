import { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';
import PropTypes from 'prop-types';

export default function NixList({ children }) {
    const { appTheme } = useContext(ThemeContext);
    
    return (
        <ul className={`nix-list flex-1 text-capitalize ${appTheme}`}>
            {children}
        </ul>
    )
}
NixList.propTypes = {
    children: PropTypes.array,
}
