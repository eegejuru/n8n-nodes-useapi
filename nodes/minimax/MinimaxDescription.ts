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
				name: 'Create Video',
				value: 'createVideo',
				description: 'Create a 5-second video using text/image prompt',
				action: 'Create a video',
			},
		],
		default: 'createVideo',
	},
];

export const minimaxFields: INodeProperties[] = [
	// No additional fields needed for now
];
