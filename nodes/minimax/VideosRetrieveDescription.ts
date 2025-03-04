import { INodeProperties } from 'n8n-workflow';

export const videosRetrieveFields: INodeProperties[] = [
	{
		displayName: 'Video ID',
		name: 'videoId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['minimax'],
				operation: ['retrieveVideo'],
			},
		},
		description: 'The ID of the video to retrieve',
	},
];
