export interface Paginated<T> {
	data: T[];
	total: number;
}

export type SortingOrder = 'asc' | 'desc';
