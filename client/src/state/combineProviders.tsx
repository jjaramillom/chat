/* eslint-disable react/display-name */
import React, {ComponentProps, FC} from 'react';

export default (...components: FC[]): FC => {
	return components.reduce(
		(AccumulatedComponents, CurrentComponent) => {
			return ({children}: ComponentProps<FC>): JSX.Element => {
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
