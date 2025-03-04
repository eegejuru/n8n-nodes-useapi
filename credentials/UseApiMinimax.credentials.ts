import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class UseApiMinimax implements ICredentialType {
	name = 'useApiMinimax';
	displayName = 'UseAPI Minimax Credentials';
	icon = 'file:minimax.svg';
	documentationUrl = 'https://useapi.net/docs/start-here/setup-minimax';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			required: true,
			description: 'API Key for UseAPI authentication',
		},
		{
			displayName: 'Minimax Account Details',
			name: 'accountDetails',
			type: 'notice',
			default: 'The following fields are used to register your Minimax account with UseAPI',
		},
		{
			displayName: 'Account Name',
			name: 'minimaxAccount',
			type: 'string',
			default: '',
			description: 'Account name to identify this Minimax account (required for registration)',
		},
		{
			displayName: 'Minimax API Token',
			name: 'minimaxToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Your Minimax API token (required for registration)',
		},
		{
			displayName: 'Minimax URL',
			name: 'minimaxUrl',
			type: 'string',
			default: '',
			description: 'The URL for your Minimax instance (optional)',
		},
		{
			displayName: 'Maximum Parallel Jobs',
			name: 'maxJobs',
			type: 'number',
			default: 1,
			typeOptions: {
				minValue: 1,
				maxValue: 10,
			},
			description: 'Maximum number of parallel jobs (1-10)',
		},
		{
			displayName: 'Webhook URL',
			name: 'webhookUrl',
			type: 'string',
			default: '',
			description: 'URL to receive webhook notifications when generation is complete',
		},
		{
			displayName: 'Error Webhook URL',
			name: 'errorWebhookUrl',
			type: 'string',
			default: '',
			description: 'URL to receive webhook notifications when errors occur',
		},
		{
			displayName: 'Registration Note',
			name: 'registrationNote',
			type: 'notice',
			default: 'After saving these credentials, add a Minimax "Register Account" operation to register this account with UseAPI',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'Authorization': '=Bearer {{$credentials.apiKey}}',
				'Accept': 'application/json',
			},
		},
	};
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.useapi.net/v1',
			url: '/minimax/accounts/account',
			method: 'POST',
			body: {
				name: '={{$credentials.minimaxAccount}}',
				token: '={{$credentials.minimaxToken}}',
				url: '={{$credentials.minimaxUrl}}',
				maxJobs: '={{$credentials.maxJobs}}',
				webhookUrl: '={{$credentials.webhookUrl}}',
				errorWebhookUrl: '={{$credentials.errorWebhookUrl}}'
			}
		}
	};
}
