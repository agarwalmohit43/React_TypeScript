import { debounce } from "../helpers";

const useDebounce = (fn: any, delay: number) => {
  return debounce(fn, delay);
};

export default useDebounce;
