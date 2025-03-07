import { INodeProperties } from 'n8n-workflow';
import { imagineFields } from './ImagineDescription';
import { getJobFields } from './GetJobDescription';
import { buttonFields } from './ButtonDescription';

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
			{
				name: 'Get Job',
				value: 'getJob',
				description: 'Retrieve job status and results',
				action: 'Retrieve job status and results',
			},
			{
				name: 'Button',
				value: 'button',
				description: 'Execute a button command on a Midjourney job',
				action: 'Execute a button command',
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
	...getJobFields,
	...buttonFields,
];
