import { INodeProperties } from 'n8n-workflow';

export const videoToVideoFields: INodeProperties[] = [
	{
		displayName: 'Video Asset ID',
		name: 'assetId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['videoToVideo'],
			},
		},
		description: 'Required assetId of video asset you want to edit. Use GET /assets/?mediaType=video to see the list of video assets.',
	},
	{
		displayName: 'Text Prompt',
		name: 'text_prompt',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['videoToVideo'],
			},
		},
		description: 'Describe desired changes for the video',
	},
	{
		displayName: 'Aspect Ratio',
		name: 'aspect_ratio',
		type: 'options',
		options: [
			{
				name: 'Landscape',
				value: 'landscape',
			},
			{
				name: 'Portrait',
				value: 'portrait',
			},
		],
		default: 'landscape',
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['videoToVideo'],
			},
		},
		description: 'Aspect ratio of the video',
	},
	{
		displayName: 'Structure Transformation',
		name: 'structure_transformation',
		type: 'number',
		typeOptions: {
			minValue: 0,
			maxValue: 10,
			stepSize: 1,
		},
		default: 3,
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['videoToVideo'],
			},
		},
		description: 'Higher values result in greater change to your input\'s structure, while lower values will be closer to your input (0-10)',
	},
	{
		displayName: 'Duration (Seconds)',
		name: 'seconds',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 10,
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['videoToVideo'],
			},
		},
		description: 'Specify the desired length of the final video in seconds',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['videoToVideo'],
			},
		},
		options: [
			{
				displayName: 'Seed',
				name: 'seed',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 4294967294,
				},
				default: '',
				description: 'Random seed for reproducible results (1-4294967294)',
			},
			{
				displayName: 'Explore Mode',
				name: 'exploreMode',
				type: 'boolean',
				default: false,
				description: 'Whether to use Explore mode (requires Runway Unlimited plan, does not use credits)',
			},
			{
				displayName: 'Reply URL',
				name: 'replyUrl',
				type: 'string',
				default: '',
				description: 'Webhook URL to receive notification when generation is complete',
			},
			{
				displayName: 'Reply Reference',
				name: 'replyRef',
				type: 'string',
				default: '',
				description: 'Custom reference ID to include in the callback',
			},
			{
				displayName: 'Max Jobs',
				name: 'maxJobs',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 10,
				},
				default: 5,
				description: 'Maximum number of parallel jobs (1-10)',
			},
		],
	},
];
