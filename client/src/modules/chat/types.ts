export interface Chat {
	id: string;
	name: string;
	type: 'private' | 'public_group' | 'private_group';
}

export interface Message {
	id: string;
	content: string;
	timestamp: string;
	sender_id: string;
}
