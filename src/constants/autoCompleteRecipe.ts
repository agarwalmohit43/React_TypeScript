export const RECIPE_SEARCH_URL = (recipe: string, limit: number = 5) =>
  `https://dummyjson.com/recipes/search?q=${recipe}&limit=${limit}`;
