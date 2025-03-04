import { INodeProperties } from 'n8n-workflow';

export const filesListFields: INodeProperties[] = [
	// do not add account. it is not needed
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
		displayName: 'Filter By',
		name: 'filterType',
		type: 'options',
		options: [
			{ name: 'None', value: 'none' },
			{ name: 'File ID', value: 'file_id' },
			{ name: 'File Name', value: 'file_name' },
			{ name: 'File Type', value: 'file_type' }
		],
		default: 'none',
		displayOptions: {
			show: {
				resource: ['minimax'],
				operation: ['listFiles'],
			},
		},
		description: 'Field to filter the results by',
	},
	{
		displayName: 'Filter Value',
		name: 'filterValue',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['minimax'],
				operation: ['listFiles'],
				filterType: ['file_id', 'file_name', 'file_type'],
			},
		},
		description: 'Value to filter by',
	},
];
