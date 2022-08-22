import React, {ComponentProps, FC} from 'react';

type FCWithChildren = FC<{
  children?: React.ReactNode;
}>;

export default (...components: FCWithChildren[]): FCWithChildren => {
  return components.reduce(
    (AccumulatedComponents, CurrentComponent) => {
      return ({children}: ComponentProps<FCWithChildren>): JSX.Element => {
        return (
          <AccumulatedComponents>
            <CurrentComponent>{children}</CurrentComponent>
          </AccumulatedComponents>
        );
      };
    },
    // @ts-ignore
    ({children}) => <>{children}</>,
  );
};
