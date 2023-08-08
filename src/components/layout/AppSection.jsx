import { useContext } from 'react';
import { ThemeContext } from '../../context/themeContext';
import PropTypes from 'prop-types';

export default function AppSection({ children, title, headerContent, isFocused }) {
    const { appTheme } = useContext(ThemeContext);

    const sectionClass = `section-wrapper ${appTheme} ${isFocused ? '' : 'mobile-hidden'}`

    return (
        <section className={sectionClass}>
            <div className={`header section-header ${appTheme}`}>
                <h2>{title}</h2>
                {headerContent}
            </div>

            <div className={`section-content`}>
                {children}
            </div>
        </section>
    )
}
AppSection.propTypes = {
    children: PropTypes.object,
    title: PropTypes.string.isRequired,
    headerContent: PropTypes.object,
    isFocused: PropTypes.bool.isRequired,
}
