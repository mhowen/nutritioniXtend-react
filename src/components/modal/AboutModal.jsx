import { useContext } from 'react';
import { ThemeContext } from '../../context/themeContext';
import PropTypes from 'prop-types';
import './modal.css';

export default function AboutModal({ onCloseModal }) {
const { appTheme } = useContext(ThemeContext);

return (
<>
	<div className='modal-overlay' onClick={onCloseModal}></div>
	<div className={`modal ${appTheme}`}>
		<h2>About</h2>

		<div className='modal-main'>
			<div>
				<h3>Introduction</h3>
				<p>
				This single-page application was built in React as a demo for my portfolio.
				It implements the powerful Nutritionix API for conducting queries of Nutritionix&apos;s
				enormous database of branded and semantic grocery products (the search/instant endpoint)
				and for fetching corresponding nutritional data (the search/item and natural/nutrients
				endpoints).
				</p>
				<p>
				The App is meant to demonstrate the consumption of a complex and powerful API,
				and to manage similarly complex internal state from various sources. Accordingly,
				development was principally focused on the related business logic. You are more than
				welcome to examine the source code on Github or live on Stackblitz using the links up top.
				</p>
				<p>
				If you have any questions, please feel free to contact me by whichever means you prefer.
				Contact info is available on my interactive portfolio.
				</p>                    
			</div>

			<div>
				<h3>Using the App</h3>
				<p>
				The App is compartmentalized into three components: Search, Recipe, and Nutrition.
				</p>

				<p>
				To begin, query any branded or generic grocery product. The App will create and send a
				GET request to the Nutritionix search/instant endpoint and format its response into a 
				human-friendly list.
				</p>
				<p>
				From there, click on the button shaped like the Nutritionix Logo to request a result&apos;s
				comprehensive nutritional data, and/or click the add/remove button to commit a result to the Recipe.
				The Recipe View allows you to adjust ingredient quantities, traverse the Recipe&apos; state history,
				or remove existing ingredients.
				</p>
				<p>
				The Nutrition View displays the nutritional data for whichever search/instant result was selected,
				or the sum totals for the User Recipe. Individual Nutrition Facts can be clicked or tapped to
				display a breakdown of which ingredients are contributing to the corresponding nutrient total
				and to what extent they are contributing.
				</p>
			</div>

			<div>
				<h3>Tech</h3>
				<ul>
					<li>Web Framework: React/ReactDOM</li>
					<li>Toggle Component:
							<a href='https://www.npmjs.com/package/react-toggle'> React Toggle</a> by Aaron Shafovaloff
					</li>
					<li>Search:
							<a href='https://www.nutritionix.com/business/api'> Nutritionix API</a> by Syndigo et al.
					</li>
					<li>API testing:
							<a href='https://mswjs.io/'> Mock Service Worker</a> by Artem Zakharchenko et al.
					</li>
					<li>Frontend Tooling:
						<a href='https://vitejs.dev/'> Vite</a> by Evan You et al.
					</li>
					<li>HTTP client:
						<a href='https://axios-http.com/'> Axios</a> by Matt Zabriskie et al.
					</li>
				</ul>
			</div>
		</div>

		<button id='modal-close' onClick={onCloseModal}>Close</button>
	</div>
</>
)
}
AboutModal.propTypes = {
onCloseModal: PropTypes.func.isRequired,
}
