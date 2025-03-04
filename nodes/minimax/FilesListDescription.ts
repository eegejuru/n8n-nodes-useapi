import { INodeProperties } from 'n8n-workflow';

export const filesListFields: INodeProperties[] = [
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		default: 10,
		displayOptions: {
			show: {
				resource: ['minimax'],
				operation: ['listFiles'],
			},
		},
		description: 'Maximum number of files to return',
	},
	{
		displayName: 'File ID',
		name: 'fileId',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['minimax'],
				operation: ['listFiles'],
			},
		},
		description: 'Optional file ID to filter the results. If specified, only the file with this ID will be returned.',
	},
];
