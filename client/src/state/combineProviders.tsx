import React, {ComponentProps, PropsWithChildren} from 'react';

type FCWithChildren = React.FC<PropsWithChildren>;

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
		({children}) => <>{children}</>
	);
};
