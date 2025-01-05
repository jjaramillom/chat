import {useEffect, useRef, useState} from 'react';
import {twMerge} from 'tailwind-merge';

import {LoadingIndicator} from './LoadingIndicator';

const DEFAULT_MIN_DURATION = 500;

export const LoadingContainer: React.FC<{
	isLoading: boolean;
	children: React.ReactNode;
	minDuration?: number;
	className?: string;
}> = ({isLoading, children, minDuration, className}) => {
	const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
	const [shouldRenderIndicator, setShouldRenderIndicator] = useState(false);
	const isLoadingRef = useRef(isLoading);

	useEffect(() => {
		isLoadingRef.current = isLoading;
		if (isLoading) {
			setShouldRenderIndicator(true);
			timeout.current = setTimeout(() => {
				setShouldRenderIndicator(isLoadingRef.current);
				timeout.current = null;
			}, minDuration ?? DEFAULT_MIN_DURATION);
		} else if (!timeout.current) {
			setShouldRenderIndicator(false);
		}
	}, [isLoading]);

	return (
		<div className={twMerge('relative w-full h-full', className)}>
			{shouldRenderIndicator && (
				<div className='absolute w-full h-full flex justify-center items-center bg-gray-50/70'>
					<LoadingIndicator />
				</div>
			)}
			{children}
		</div>
	);
};
