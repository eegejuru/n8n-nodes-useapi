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
				displayName: 'Aspect Ratio',
				name: 'aspectRatio',
				type: 'options',
				options: [
					{ name: '16:9 (Landscape)', value: '16:9' },
					{ name: '21:9 (Widescreen)', value: '21:9' },
					{ name: '1:1 (Square)', value: '1:1' },
					{ name: '9:16 (Portrait)', value: '9:16' },
					{ name: '4:3', value: '4:3' },
					{ name: '3:4', value: '3:4' },
				],
				default: '',
				description: 'Set the aspect ratio for the generated image',
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
		],
	},
];
