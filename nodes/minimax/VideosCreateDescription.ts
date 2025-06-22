import { INodeProperties } from 'n8n-workflow';

export const videosCreateFields: INodeProperties[] = [
	// Fields for createVideo operation
	{
		displayName: 'Input Type',
		name: 'inputType',
		type: 'options',
		options: [
			{ name: 'Text Prompt Only', value: 'textOnly' },
			{ name: 'Image + Optional Text', value: 'imageText' },
		],
		default: 'textOnly',
		required: true,
		displayOptions: {
			show: {
				resource: ['minimax'],
				operation: ['createVideo'],
			},
		},
		description: 'Type of input to use for video creation',
	},
	// Text prompt field
	{
		displayName: 'Text Prompt',
		name: 'prompt',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		displayOptions: {
			show: {
				resource: ['minimax'],
				operation: ['createVideo'],
			},
		},
		description: 'Text prompt describing the video to generate',
	},
	// File ID field (for image input)
	{
		displayName: 'File ID',
		name: 'fileID',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['minimax'],
				operation: ['createVideo'],
				inputType: ['imageText'],
			},
		},
		description: 'ID of the uploaded image to use (format: user:user_id-minimax:account-file:file_id)',
	},
	// Text-to-Video model selection (only shown for text input)
	{
		displayName: 'Model',
		name: 'model',
		type: 'options',
		options: [
			{ name: 'T2V-01 (Text-to-Video)', value: 'T2V-01' },
			{ name: 'T2V-01-Director (Text-to-Video Director)', value: 'T2V-01-Director' },
		],
		default: 'T2V-01',
		displayOptions: {
			show: {
				resource: ['minimax'],
				operation: ['createVideo'],
				inputType: ['textOnly'],
			},
		},
		description: 'Model to use for text-to-video generation',
	},
	// Image-to-Video model selection (only shown for image input)
	{
		displayName: 'Model',
		name: 'model',
		type: 'options',
		options: [
			{ name: 'I2V-01 (Image-to-Video)', value: 'I2V-01' },
			{ name: 'I2V-01-live (Image-to-Video, Live)', value: 'I2V-01-live' },
			{ name: 'I2V-01-Director (Image-to-Video Director)', value: 'I2V-01-Director' },
			{ name: 'S2V-01 (Subject Reference)', value: 'S2V-01' },
			{ name: 'Hailuo-02 (Image-to-Video)', value: '02' },
		],
		default: 'I2V-01',
		displayOptions: {
			show: {
				resource: ['minimax'],
				operation: ['createVideo'],
				inputType: ['imageText'],
			},
		},
		description: 'Model to use for image-to-video generation',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['minimax'],
				operation: ['createVideo'],
			},
		},
		options: [
			{
				displayName: 'Prompt Optimization',
				name: 'promptOptimization',
				type: 'boolean',
				default: true,
				description: 'Whether to optimize the provided prompt',
			},
			{
				displayName: 'Quantity',
				name: 'quantity',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 4,
				},
				default: 1,
				description: 'Number of Videos to generate (1-4)',
			},
				{
		displayName: 'Options',
		name: 'options',
		type: 'options',
		options: [
			{ name: '768p-6sec', value: '768p-6sec' },
			{ name: '768p-10sec', value: '768p-10sec' },
			{ name: '1080p-6sec', value: '1080p-6sec' },
		],
		default: '768p-6sec',
		description: 'Resolution and Duration Options',
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
		],
	},
];
