import { INodeProperties } from 'n8n-workflow';

export const filesCreateFields: INodeProperties[] = [
	{
		displayName: 'Input Type',
		name: 'inputType',
		type: 'options',
		options: [
			{ name: 'Binary File', value: 'binaryData' },
			{ name: 'URL', value: 'url' },
		],
		default: 'binaryData',
		required: true,
		displayOptions: {
			show: {
				resource: ['minimax'],
				operation: ['uploadFile'],
			},
		},
		description: 'Where to get the image file from',
	},
	{
		displayName: 'Binary Property',
		name: 'binaryPropertyName',
		type: 'string',
		default: 'data',
		required: true,
		displayOptions: {
			show: {
				resource: ['minimax'],
				operation: ['uploadFile'],
				inputType: ['binaryData'],
			},
		},
		description: 'Name of the binary property containing the file data',
	},
	{
		displayName: 'URL',
		name: 'url',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['minimax'],
				operation: ['uploadFile'],
				inputType: ['url'],
			},
		},
		description: 'URL of the file to upload',
	},
];
