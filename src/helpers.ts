type Procedure = (...args: any[]) => void;

const debounce = <T extends Procedure>(fn: T, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

export { debounce };
