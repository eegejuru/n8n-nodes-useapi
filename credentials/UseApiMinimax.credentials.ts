import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class UseApiMinimax implements ICredentialType {
	name = 'useApiMinimax';
	displayName = 'UseAPI Minimax Credentials';
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
			displayName: 'Account Identifier',
			name: 'minimaxAccount',
			type: 'string',
			default: '',
			description: 'Account identifier for this Minimax account (this value must match the "account" parameter in API calls)',
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
		}
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
			baseURL: 'https://api.useapi.net/v2',
			url: '/account',
			method: 'GET'
		}
	};
}
