import React, { useCallback, useEffect, useState } from "react";
import { RecipeInterface } from "../../typings/autoCompleteRecipe";
import { RECIPE_SEARCH_URL } from "../../constants/autoCompleteRecipe";
import { debounce } from "../../helpers";
import "./styles.css";

const AutoCompleteRecipe = () => {
  const [recipeList, setRecipeList] = useState<RecipeInterface[]>([]);
  const [recipe, setRecipe] = useState<string>("");
  const [showResults, setShowResults] = useState(false);
  const fetchRecipe = useCallback(async (recipe: string) => {
    const res = await fetch(RECIPE_SEARCH_URL(recipe)).then((res) =>
      res.json()
    );

    if (res.recipes.length > 0) {
      setRecipeList(res.recipes);
      setShowResults(true);
    } else {
      setRecipeList([]);
      setShowResults(false);
    }
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

  const handleResultSelect = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    const spanTag = target.closest("span.search-item") as HTMLElement | null;
    if (!spanTag) return;
    const value = spanTag?.dataset?.value || "";
    setRecipe(value);
    setShowResults(false);
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
        {showResults ? (
          <div className="search-result" onClick={handleResultSelect}>
            {recipeList?.length > 0
              ? recipeList.map((item: RecipeInterface) => {
                  return (
                    <span
                      key={item.id}
                      className="search-item"
                      data-value={item.name}
                    >
                      {item.name}
                    </span>
                  );
                })
              : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AutoCompleteRecipe;
