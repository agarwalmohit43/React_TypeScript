import { useCallback, useEffect, useState } from "react";
import { RecipeInterface } from "../../typings/autoCompleteRecipe";
import { RECIPE_SEARCH_URL } from "../../constants/autoCompleteRecipe";
import { debounce } from "../../helpers";
import "./styles.css";

const AutoCompleteRecipe = () => {
  const [recipeList, setRecipeList] = useState<RecipeInterface[]>([]);
  const [recipe, setRecipe] = useState<string>("");
  const fetchRecipe = useCallback(async (recipe: string) => {
    const res = await fetch(RECIPE_SEARCH_URL(recipe)).then((res) =>
      res.json()
    );

    setRecipeList(res);
  }, []);
  const debouncedFetchRecipe = debounce(fetchRecipe, 1000);
  useEffect(() => {
    if (recipe) {
      debouncedFetchRecipe(recipe);
    }
  }, [recipe]);

  const handleChangeRecipe = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setRecipe(value);
  };

  return (
    <div>
      AutoCompleteRecipe
      <div className="search-container">
        <input
          type="text"
          className="search-text"
          value={recipe}
          onChange={handleChangeRecipe}
        />
        <div className="search-result">
          {recipeList?.length > 0
            ? recipeList.map((item: RecipeInterface) => {
                console.log(item);

                return <span key={item.id}>{item.name}</span>;
              })
            : null}
        </div>
      </div>
    </div>
  );
};

export default AutoCompleteRecipe;
