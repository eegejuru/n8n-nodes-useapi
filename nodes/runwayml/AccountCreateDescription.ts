import { INodeProperties } from 'n8n-workflow';

export const accountCreateFields: INodeProperties[] = [
	{
		displayName: 'Account Details',
		name: 'accountDetails',
		type: 'notice',
		default: 'This operation will register/update your RunwayML account using the information from your saved credentials.',
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['createAccount'],
			},
		},
	},
	{
		displayName: 'Confirm Registration',
		name: 'confirmRegistration',
		type: 'boolean',
		default: false,
		required: true,
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['createAccount'],
			},
		},
		description: 'Confirm that you want to register/update your RunwayML account',
	},
];
