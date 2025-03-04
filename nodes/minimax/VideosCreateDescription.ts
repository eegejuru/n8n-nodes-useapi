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
	// Model selection
	{
		displayName: 'Model',
		name: 'model',
		type: 'options',
		options: [
			{ name: 'T2V-01 (Text-to-Video)', value: 'T2V-01' },
			{ name: 'I2V-01 (Image-to-Video)', value: 'I2V-01' },
			{ name: 'I2V-01-live (Image-to-Video, Live)', value: 'I2V-01-live' },
			{ name: 'S2V-01 (Subject Reference)', value: 'S2V-01' },
			{ name: 'T2V-01-Director (Text-to-Video Director)', value: 'T2V-01-Director' },
			{ name: 'I2V-01-Director (Image-to-Video Director)', value: 'I2V-01-Director' },
		],
		default: 'T2V-01',
		displayOptions: {
			show: {
				resource: ['minimax'],
				operation: ['createVideo'],
			},
		},
		description: 'Model to use for video generation',
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
