import React, {ComponentProps} from 'react';
import {FCWithChildren} from '../types/shared';

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
