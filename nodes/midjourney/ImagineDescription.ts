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
				displayName: 'Max Jobs',
				name: 'maxJobs',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 15,
				},
				default: 3,
				description: 'Maximum number of concurrent jobs (1-15 depending on your Midjourney plan)',
			},
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
			{
				displayName: 'Discord Token',
				name: 'discord',
				type: 'string',
				default: '',
				description: 'Override the Discord token from credentials (optional)',
			},
			{
				displayName: 'Discord Server ID',
				name: 'server',
				type: 'string',
				default: '',
				description: 'Override the Discord server ID from credentials (optional)',
			},
			{
				displayName: 'Discord Channel ID',
				name: 'channel',
				type: 'string',
				default: '',
				description: 'Override the Discord channel ID from credentials (optional)',
			},
		],
	},
];
