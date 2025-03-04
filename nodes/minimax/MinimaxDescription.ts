import { INodeProperties } from 'n8n-workflow';

export const minimaxOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['minimax'],
			},
		},
		options: [
			{
				name: 'Get Account Info',
				value: 'getAccountInfo',
				description: 'Get information about your Minimax account',
				action: 'Get account information',
			},
		],
		default: 'getAccountInfo',
	},
];

export const minimaxFields: INodeProperties[] = [
	// Fields for getAccountInfo operation
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['minimax'],
				operation: ['getAccountInfo'],
			},
		},
		options: [
			{
				displayName: 'Include Usage Stats',
				name: 'includeUsageStats',
				type: 'boolean',
				default: false,
				description: 'Whether to include usage statistics',
			},
		],
	},
];
