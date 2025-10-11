import React from "react";

const HOCWrapper = <T extends object>(Component: React.ComponentType<T>) => {
  let count = 0;
  const wrappedComponent = (props: T) => {
    return <Component {...props} count={count} />;
  };

  wrappedComponent.displayName = `HOC Wrapper - ${Component.displayName}`;
  return wrappedComponent;
};

export default HOCWrapper;
