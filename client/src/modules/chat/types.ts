export interface Paginated<T> {
	data: T[];
	total: number;
}

export interface Chat {
	id: string;
	name: string;
	type: 'private' | 'public_group' | 'private_group';
}

export interface Message {
	id: string;
	content: string;
	timestamp: string;
	senderUsername: string;
	senderId: string;
}
