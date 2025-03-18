import { INodeProperties } from 'n8n-workflow';
import { AspectRatioOption, ASPECT_RATIO_OPTIONS } from '../constants/shared';

export const IMAGES_CREATE_OPERATION = 'imagesCreate';

export const imagesCreateFields: INodeProperties[] = [
	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['minimax'],
				operation: ['imagesCreate'],
			},
		},
		default: '',
		description: 'Text prompt describing the image to create (max 1250 characters)',
		typeOptions: {
			rows: 4,
			maxLength: 1250,
		},
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
				operation: ['imagesCreate'],
			},
		},
		options: [
			{
				displayName: 'Account',
				name: 'account',
				type: 'string',
				default: '',
				description: 'MiniMax API account (required if you have multiple accounts configured)',
			},
			{
				displayName: 'Prompt Optimization',
				name: 'promptOptimization',
				type: 'boolean',
				default: true,
				description: 'Whether to enable prompt optimization',
			},
			{
				displayName: 'Model',
				name: 'model',
				type: 'options',
				options: [
					{
						name: 'image-01',
						value: 'image-01',
					},
				],
				default: 'image-01',
				description: 'Model to use for image generation',
			},
			{
				displayName: 'Aspect Ratio',
				name: 'aspectRatio',
				type: 'options',
				options: ASPECT_RATIO_OPTIONS,
				default: '16:9' as AspectRatioOption,
				description: 'Set the aspect ratio for the generated image',
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
				description: 'Number of images to generate (1-4)',
			},
			{
				displayName: 'Reply URL',
				name: 'replyUrl',
				type: 'string',
				default: '',
				description: 'URL to receive callbacks when image generation is completed or failed',
			},
			{
				displayName: 'Reference ID',
				name: 'replyRef',
				type: 'string',
				default: '',
				description: 'Your reference ID which will be returned with the image response/result',
			},
		],
	},
];
