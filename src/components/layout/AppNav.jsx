import { useContext, useState } from "react";
import { createPortal } from "react-dom";
import { ThemeContext } from "../../context/themeContext";
import { icon_about, icon_github, icon_nix, icon_stackblitz } from "../../assets/icons/AppIcons";
import AboutModal from "../modal/AboutModal";
import Toggle from "react-toggle";
import PropTypes from 'prop-types';
import './toggle.css';
import './navbar.css';

export default function AppNav({ focusedContent, onChangeFocusedContent, onChangeTheme }) {
    const { appTheme } = useContext(ThemeContext);
    const [modalVisible, setModalVisible] = useState(false);
    
    return (
        <nav className={`navbar bg-gradient ${appTheme}`}>
            <ul className="navbar-nav navbar-nav-mobile">
                <li
                    className={"nav-item flex-1" + (focusedContent === 'Search' ? ' focused' : '')}
                    onClick={() => onChangeFocusedContent('Search')}
                >
                    <span className="nav-item-content">Search</span>
                </li>
                
                <li
                    className={"nav-item flex-1" + (focusedContent === 'Recipe' ? ' focused' : '')}
                    onClick={() => onChangeFocusedContent('Recipe')}
                >
                    <span className="nav-item-content">Recipe</span>
                </li>

                <li
                    className={"nav-item flex-1" + (focusedContent === 'Nutrition' ? ' focused' : '')}
                    onClick={() => onChangeFocusedContent('Nutrition')}
                >
                    <span className="nav-item-content">Nutrition</span>
                </li>
            </ul>

            <ul className="navbar-nav">
                <li className="nav-item">
                    <div className="nav-item-content">
                        <i className="icon-wrapper icon-fill">{icon_nix}</i>
                    </div>
                </li>
                <li className="nav-item">
                    <div className="nav-link" onClick={() => setModalVisible(true)}>
                        <i className="icon-wrapper">{icon_about}</i>
                        <span className="nav-link-label">About this Demo</span>
                    </div>
                </li>

                <li className="nav-item">
                    <div className="nav-link">
                        <i className="icon-wrapper">{icon_github}</i>
                        <span className="nav-link-label">Source Code</span>
                    </div>
                </li>
                <li className="nav-item">
                    <div className="nav-link">
                        <i className="icon-wrapper">{icon_stackblitz}</i>
                        <span className="nav-link-label">Try Live on Stackblitz</span>
                    </div>
                </li>

                <li className="nav-item">
                    <div className="nav-item-content">
                        <Toggle
                            id="toggle-theme"
                            checked={appTheme === 'theme-dark'}
                            onChange={(e) => onChangeTheme(e.target.checked ? 'theme-dark' : 'theme-light')}
                        />
                        <label
                            className="nav-label"
                            htmlFor="toggle-theme"
                        >Toggle Dark Mode</label>
                    </div>
                </li>
            </ul>

            {modalVisible && createPortal(
                <AboutModal onCloseModal={() => setModalVisible(false)} />,
                document.body
            )}
        </nav>
    )
}
AppNav.propTypes = {
    focusedContent: PropTypes.string.isRequired,
    onChangeFocusedContent: PropTypes.func.isRequired,
    onChangeTheme: PropTypes.func.isRequired,
}
