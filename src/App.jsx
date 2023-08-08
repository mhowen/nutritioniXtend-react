import { useState } from 'react';
import { ThemeContext } from './context/themeContext';
import AppNav from './components/layout/AppNav';
import AppSection from './components/layout/AppSection';
import NixInstantSearch from './components/search/NixInstantSearch';
import NixRecipe from './components/nutrition/NixRecipe';
import NixNutrition from './components/nutrition/NixNutrition';
import './App.css';

function App() {
	const [appTheme, setAppTheme] = useState('theme-dark');
	const [focusedContent, setFocusedContent] = useState('Search'); // of interest to small displays only
	
	const [displayedNutrition, setDisplayedNutrition] = useState(null);
	const [recipeHistory, setRecipeHistory] = useState([[]]);
	const [recipeIndex, setRecipeIndex] = useState(0);

	function modifyRecipe(action) {
		if (!action || !action.type || !action.payload) return;
		const currentRecipe = recipeHistory[recipeIndex];
		
		let nextRecipe;
		if (action.type === 'ADD_INGR') nextRecipe = [...currentRecipe, { ...action.payload, recipe_qty: 1 }];
		else if (action.type === 'REMOVE_INGR') nextRecipe = currentRecipe.filter(ingr => ingr.product_name !== action.payload);
		else if (action.type === 'CHANGE_INGR_QTY') nextRecipe = currentRecipe.map(ingr => {
			if (ingr.product_name === action.payload.product_name) return { ...ingr, recipe_qty: action.payload.quantity };
			return ingr;
		});
		else throw new Error('Error modifying Recipe: Invalid action type');

		let nextHistory = [...recipeHistory.slice(0, recipeIndex + 1), nextRecipe];

		setRecipeHistory(nextHistory);
		setRecipeIndex(nextHistory.length - 1);
		
		setDisplayedNutrition(null); // when null, NixNutrition automatically displays calculated totals for Recipe
	}

	const historyControls = <div>
		<button
			className={`bg-accent ${appTheme}`}
			disabled={recipeIndex === 0}
			onClick={() => setRecipeIndex(Math.max(0, recipeIndex - 1))}
		>Undo</button>
		<button
			className={`bg-accent ${appTheme}`}
			disabled={recipeIndex === recipeHistory.length - 1}
			onClick={() => setRecipeIndex(Math.min(recipeHistory.length - 1, recipeIndex + 1))}
		>Redo</button>
	</div>

	return (
		<ThemeContext.Provider value={{ appTheme, setAppTheme }}>
			<div className={`app-wrapper ${appTheme}`}>
				<AppNav
					focusedContent={focusedContent}
					onChangeFocusedContent={(nextContent) => setFocusedContent(nextContent)}
					onChangeTheme={(nextTheme) => setAppTheme(nextTheme)}
				/>

				<main className={`app-main ${appTheme}`}>
					<AppSection
						title='Search'
						isFocused={focusedContent === 'Search'}
					>
						<NixInstantSearch
							currentRecipe={recipeHistory[recipeIndex]}
							onDisplayNutrition={(nutrition) => {
								setFocusedContent('Nutrition');
								return setDisplayedNutrition(nutrition);
							}}
							onToggleIngredient={(action) => modifyRecipe(action)}
						/>
					</AppSection>

					<AppSection
						title='Recipe'
						headerContent={historyControls}
						isFocused={focusedContent === 'Recipe'}
					>
						<NixRecipe
							currentRecipe={recipeHistory[recipeIndex]}
							onDisplayNutrition={(nutrition) => {
								setFocusedContent('Nutrition');
								return setDisplayedNutrition(nutrition);
							}}
							onQuantityChange={(productName, newQty) => {
								const action = newQty > 0
									? { type: 'CHANGE_INGR_QTY', payload: { product_name: productName, quantity: newQty } }
									: { type: 'REMOVE_INGR', payload: productName };
								return modifyRecipe(action);
							}}
						/>
					</AppSection>

					<AppSection
						title='Nutrition'
						isFocused={focusedContent === 'Nutrition'}
					>
						<NixNutrition
							displayedNutrition={displayedNutrition}
							currentRecipe={recipeHistory[recipeIndex]}
						/>
					</AppSection>
				</main>
			</div>
		</ThemeContext.Provider>
	)
}

export default App;
