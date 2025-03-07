import { INodeProperties } from 'n8n-workflow';
import { imagineFields } from './ImagineDescription';

export const midjourneyOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['midjourney'],
			},
		},
		options: [
			{
				name: 'Imagine',
				value: 'imagine',
				description: 'Generate an image using the Midjourney /imagine command',
				action: 'Generate an image with imagine command',
			},
		],
		default: 'imagine',
	},
];

export const midjourneyFields: INodeProperties[] = [
	{
		displayName: 'Resource',
		name: 'resource',
		type: 'hidden',
		noDataExpression: true,
		default: 'midjourney',
	},
	...imagineFields,
];
