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
			description: 'API Key for UseAPI authentication',
		},
		{
			displayName: 'Minimax Account',
			name: 'minimaxAccount',
			type: 'string',
			default: '',
			description: 'Your Minimax account identifier',
		},
		{
			displayName: 'Minimax URL',
			name: 'minimaxUrl',
			type: 'string',
			default: '',
			description: 'The URL for your Minimax instance',
		},
		{
			displayName: 'Minimax Token',
			name: 'minimaxToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Your authentication token for Minimax',
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
			baseURL: 'https://api.useapi.net/v2',
			url: '/account',
			method: 'GET'
		}
	};
}
