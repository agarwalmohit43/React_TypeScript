import React, { useCallback, useEffect, useMemo, useState } from "react";
import { RecipeInterface } from "../../typings/autoCompleteRecipe";
import { RECIPE_SEARCH_URL } from "../../constants/autoCompleteRecipe";
import { debounce, memoise } from "../../helpers";
import "./styles.css";

const AutoCompleteRecipe = () => {
  const [recipeList, setRecipeList] = useState<RecipeInterface[]>([]);
  const [recipe, setRecipe] = useState<string>("");
  const [showResults, setShowResults] = useState(false);

  const fetchRecipe = useCallback(
    async (q: string): Promise<RecipeInterface[]> => {
      const res = await fetch(RECIPE_SEARCH_URL(q, 0)).then((r) => r.json());
      return res?.recipes ?? [];
    },
    []
  );

  const memoisedFetched = useMemo(() => memoise(fetchRecipe), [fetchRecipe]);

  const debouncedFetchRecipe = useMemo(
    () =>
      debounce(async (q: string) => {
        const data: RecipeInterface[] = await memoisedFetched(q);
        if (data && data.length > 0) {
          setRecipeList(data);
          setShowResults(true);
        } else {
          setRecipeList([]);
          setShowResults(false);
        }
      }, 300),
    [memoisedFetched]
  );
  useEffect(() => {
    if (recipe) {
      debouncedFetchRecipe(recipe);
    }
  }, [recipe, debouncedFetchRecipe]);

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

  console.log(recipeList);

  return (
    <div>
      AutoCompleteRecipe
      <div className="search-container">
        <input
          type="text"
          className="search-text"
          value={recipe}
          onFocus={() => setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 150)}
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
                      onMouseDown={() => {
                        setRecipe(item.name);
                        setShowResults(false);
                      }}
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
