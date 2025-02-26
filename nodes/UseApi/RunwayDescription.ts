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
				routing: {
					request: {
						method: 'GET',
						url: '/runwayml/assets',
					},
				},
			},
			{
				name: 'Get Asset',
				value: 'getAsset',
				description: 'Get details of a specific asset',
				action: 'Get an asset',
				routing: {
					request: {
						method: 'GET',
						url: '=/runwayml/assets/{{$parameter["assetId"]}}',
					},
				},
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
		routing: {
			request: {
				qs: {
					offset: '={{$value}}',
				},
			},
		},
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
		routing: {
			request: {
				qs: {
					limit: '={{$value}}',
				},
			},
		},
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
				displayName: 'Email',
				name: 'email',
				type: 'string',
				default: '',
				description: 'Email associated with the RunwayML account (required if multiple accounts configured)',
				routing: {
					request: {
						qs: {
							email: '={{$value}}',
						},
					},
				},
			},
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
				routing: {
					request: {
						qs: {
							mediaType: '={{$value}}',
						},
					},
				},
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
		description: 'The ID of the asset to retrieve',
	},
];
