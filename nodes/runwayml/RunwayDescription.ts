import { INodeProperties } from 'n8n-workflow';

export const runwayOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['runway'],
			},
		},
		options: [
			{
				name: 'Get Assets List',
				value: 'getAssets',
				description: 'Get a list of assets from RunwayML',
				action: 'Get assets list',
			},
			{
				name: 'Get Asset',
				value: 'getAsset',
				description: 'Get details of a specific asset',
				action: 'Get an asset',
			},
			{
				name: 'Delete Asset',
				value: 'deleteAsset',
				description: 'Delete a specific asset (Warning: This action cannot be undone)',
				action: 'Delete an asset',
			},
			{
				name: 'Upload Asset',
				value: 'uploadAsset',
				description: 'Upload a new asset to RunwayML',
				action: 'Upload an asset',
			},
			{
				name: 'Gen-3 Turbo Create',
				value: 'gen3TurboCreate',
				description: 'Create a video using Gen-3 Alpha Turbo',
				action: 'Create a video with Gen-3 Alpha Turbo',
			},
		],
		default: 'getAssets',
	},
];

export const runwayFields: INodeProperties[] = [
	/* Get Assets Operation */
	{
		displayName: 'Offset',
		name: 'offset',
		type: 'number',
		default: 0,
		description: 'Starting position for pagination (0-1000)',
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['getAssets'],
			},
		},
		required: true,
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 10,
		description: 'Maximum number of results to return (1-50)',
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['getAssets'],
			},
		},
		required: true,
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['getAssets'],
			},
		},
		options: [
			{
				displayName: 'Media Type',
				name: 'mediaType',
				type: 'options',
				options: [
					{
						name: 'Video',
						value: 'video',
					},
					{
						name: 'Image',
						value: 'image',
					},
					{
						name: 'Audio',
						value: 'audio',
					},
				],
				default: '',
				description: 'Type of media to filter results',
			},
		],
	},

	/* Get Asset Operation */
	{
		displayName: 'Asset ID',
		name: 'assetId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['getAsset'],
			},
		},
		description: 'The ID of the asset to retrieve (format: user:user_id-runwayml:account_email-asset:asset_uuid)',
	},

	/* Delete Asset Operation */
	{
		displayName: 'Asset ID',
		name: 'assetId',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['deleteAsset'],
			},
		},
		description: 'The ID of the asset to delete (format: user:user_id-runwayml:account_email-asset:asset_uuid)',
	},
	{
		displayName: '⚠️ Confirmation',
		name: 'confirmation',
		type: 'boolean',
		default: false,
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['deleteAsset'],
			},
		},
		description: 'WARNING: This will permanently delete the asset and cannot be undone. Please confirm to proceed.',
		required: true,
	},

	/* Upload Asset Operation */
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['uploadAsset'],
			},
		},
		description: 'The name of the file to be created',
	},
	{
		displayName: 'Input Type',
		name: 'inputType',
		type: 'options',
		options: [
			{
				name: 'Binary Data',
				value: 'binaryData',
			},
			{
				name: 'URL',
				value: 'url',
			},
		],
		default: 'binaryData',
		description: 'The source of the file to upload',
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['uploadAsset'],
			},
		},
	},
	{
		displayName: 'Binary Property',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		required: true,
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['uploadAsset'],
				inputType: ['binaryData'],
			},
		},
		description: 'Name of the binary property containing the file to upload',
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['uploadAsset'],
				inputType: ['url'],
			},
		},
		description: 'URL of the file to upload',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['uploadAsset'],
			},
		},
		options: [
			{
				displayName: 'Duration (seconds)',
				name: 'duration',
				type: 'number',
				default: 0,
				description: 'Duration in seconds for audio or video files',
			},
			{
				displayName: 'Width (pixels)',
				name: 'width',
				type: 'number',
				default: 0,
				description: 'Width in pixels for image or video files',
			},
			{
				displayName: 'Height (pixels)',
				name: 'height',
				type: 'number',
				default: 0,
				description: 'Height in pixels for image or video files',
			},
		],
	},
];
