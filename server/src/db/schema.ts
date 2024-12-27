// schema.ts
import {InferInsertModel, InferSelectModel} from 'drizzle-orm';
import {
	pgTable,
	serial,
	varchar,
	text,
	timestamp,
	pgEnum,
	integer,
	primaryKey,
} from 'drizzle-orm/pg-core';

// Define Enums
export const chatTypeEnum = pgEnum('chat_type', [
	'private',
	'public_group',
	'private_group',
]);
export const chatRoleEnum = pgEnum('chat_role', ['member', 'admin']);

// Users Table
export const users = pgTable('users', {
	id: varchar('id', {length: 255}).primaryKey(),
});

export type SelectUser = InferSelectModel<typeof users>;
export type InsertUser = InferInsertModel<typeof users>;

// Chats Table
export const chats = pgTable('chats', {
	id: serial('id').primaryKey(),
	type: chatTypeEnum('type').notNull(),
	name: varchar('name', {length: 255}),
});

export type SelectChat = InferSelectModel<typeof chats>;
export type InsertChat = InferInsertModel<typeof chats>;

// ChatMembers Table
export const chatMembers = pgTable(
	'chat_members',
	{
		chat_id: integer('chat_id')
			.references(() => chats.id, {onDelete: 'cascade'})
			.notNull(),
		user_id: varchar('user_id', {length: 255})
			.references(() => users.id, {onDelete: 'cascade'})
			.notNull(),
		role: chatRoleEnum('role').default('member').notNull(),
	},
	(table) => [{pk: primaryKey({columns: [table.chat_id, table.user_id]})}]
);

export type SelectChatMember = InferSelectModel<typeof chatMembers>;
export type InsertChatMember = InferInsertModel<typeof chatMembers>;

// Messages Table
export const messages = pgTable('messages', {
	id: serial('id').primaryKey(),
	chat_id: integer('chat_id')
		.references(() => chats.id, {onDelete: 'cascade'})
		.notNull(),
	sender_id: varchar('sender_id', {length: 255})
		.references(() => users.id, {onDelete: 'cascade'})
		.notNull(),
	content: text('content').notNull(),
	timestamp: timestamp('timestamp').defaultNow().notNull(),
});

export type SelectMessage = InferSelectModel<typeof messages>;
export type InsertMessage = InferInsertModel<typeof messages>;
