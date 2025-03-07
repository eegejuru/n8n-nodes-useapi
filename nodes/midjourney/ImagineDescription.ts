import { INodeProperties } from 'n8n-workflow';

export const imagineFields: INodeProperties[] = [
	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['midjourney'],
				operation: ['imagine'],
			},
		},
		description: 'Text prompt describing the image to create',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['midjourney'],
				operation: ['imagine'],
			},
		},
		options: [
			{
				displayName: 'Reply URL',
				name: 'replyUrl',
				type: 'string',
				default: '',
				description: 'URL to receive callbacks once the job is completed',
			},
			{
				displayName: 'Reference ID',
				name: 'replyRef',
				type: 'string',
				default: '',
				description: 'Your reference ID which will be returned with this job response/result',
			},
		],
	},
];
