import { INodeProperties } from 'n8n-workflow';

export const gen3TurboFields: INodeProperties[] = [
	/* Gen-3 Turbo Create Operation */
	{
		displayName: 'Image Input',
		name: 'imageInput',
		type: 'options',
		options: [
			{
				name: 'First Image',
				value: 'firstImage',
			},
			{
				name: 'First and Last Images',
				value: 'firstAndLastImages',
			},
			{
				name: 'First, Middle, and Last Images',
				value: 'allImages',
			},
		],
		default: 'firstImage',
		description: 'Select which image positions to use',
		displayOptions: {
			show: {
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'First Image Asset ID',
		name: 'firstImage_assetId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				operation: ['create'],
			},
		},
		description: 'Asset ID of the first image',
	},
	{
		displayName: 'Middle Image Asset ID',
		name: 'middleImage_assetId',
		type: 'string',
		default: '',
		required: false,
		displayOptions: {
			show: {
				operation: ['create'],
				imageInput: ['allImages'],
			},
		},
		description: 'Asset ID of the middle image',
	},
	{
		displayName: 'Last Image Asset ID',
		name: 'lastImage_assetId',
		type: 'string',
		default: '',
		required: false,
		displayOptions: {
			show: {
				operation: ['create'],
				imageInput: ['firstAndLastImages', 'allImages'],
			},
		},
		description: 'Asset ID of the last image',
	},
	{
		displayName: 'Text Prompt',
		name: 'text_prompt',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		required: false,
		displayOptions: {
			show: {
				operation: ['create'],
			},
		},
		description: 'Text prompt describing the video to create',
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
				operation: ['create'],
			},
		},
		description: 'Aspect ratio of the video',
	},
	{
		displayName: 'Duration (Seconds)',
		name: 'seconds',
		type: 'options',
		options: [
			{
				name: '5 Seconds',
				value: 5,
			},
			{
				name: '10 Seconds',
				value: 10,
			},
		],
		default: 5,
		displayOptions: {
			show: {
				operation: ['create'],
			},
		},
		description: 'Duration of the video in seconds',
	},
	{
		displayName: 'Seed',
		name: 'seed',
		type: 'number',
		default: '',
		placeholder: 'e.g. 12345678',
		displayOptions: {
			show: {
				operation: ['create'],
			},
		},
		description: 'Random seed for reproducible results (1-4294967294)',
	},
	{
		displayName: 'Camera Motion',
		name: 'cameraMotionOptions',
		type: 'collection',
		placeholder: 'Add Camera Motion',
		default: {},
		displayOptions: {
			show: {
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Static Camera',
				name: 'static',
				type: 'boolean',
				default: false,
				description: 'Keep the camera as still as possible',
			},
			{
				displayName: 'Horizontal Motion',
				name: 'horizontal',
				type: 'number',
				typeOptions: {
					minValue: -10,
					maxValue: 10,
				},
				default: 0,
				description: 'Horizontal camera motion (-10 to 10)',
			},
			{
				displayName: 'Vertical Motion',
				name: 'vertical',
				type: 'number',
				typeOptions: {
					minValue: -10,
					maxValue: 10,
				},
				default: 0,
				description: 'Vertical camera motion (-10 to 10)',
			},
			{
				displayName: 'Zoom',
				name: 'zoom',
				type: 'number',
				typeOptions: {
					minValue: -10,
					maxValue: 10,
				},
				default: 0,
				description: 'Camera zoom in/out (-10 to 10)',
			},
			{
				displayName: 'Roll',
				name: 'roll',
				type: 'number',
				typeOptions: {
					minValue: -10,
					maxValue: 10,
				},
				default: 0,
				description: 'Camera roll motion (-10 to 10)',
			},
			{
				displayName: 'Pan',
				name: 'pan',
				type: 'number',
				typeOptions: {
					minValue: -10,
					maxValue: 10,
				},
				default: 0,
				description: 'Camera pan motion (-10 to 10)',
			},
			{
				displayName: 'Tilt',
				name: 'tilt',
				type: 'number',
				typeOptions: {
					minValue: -10,
					maxValue: 10,
				},
				default: 0,
				description: 'Camera tilt motion (-10 to 10)',
			},
		],
	},
	{
		displayName: 'Additional Settings',
		name: 'additionalSettings',
		type: 'collection',
		placeholder: 'Add Setting',
		default: {},
		displayOptions: {
			show: {
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Explore Mode',
				name: 'exploreMode',
				type: 'boolean',
				default: false,
				description: 'Use Explore mode (requires Runway Unlimited plan, does not use credits)',
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
