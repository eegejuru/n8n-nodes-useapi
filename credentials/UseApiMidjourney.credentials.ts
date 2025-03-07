import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class UseApiMidjourney implements ICredentialType {
	name = 'useApiMidjourney';
	displayName = 'UseAPI Midjourney Credentials';
	documentationUrl = 'https://useapi.net/docs/start-here/setup-midjourney';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'UseAPI API Key',
		},
		{
			displayName: 'Discord Token',
			name: 'discordToken',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Discord authentication token',
		},
		{
			displayName: 'Discord Server',
			name: 'discordServer',
			type: 'string',
			default: '',
			description: 'Discord server ID',
		},
		{
			displayName: 'Discord Channel',
			name: 'discordChannel',
			type: 'string',
			default: '',
			description: 'Discord channel ID',
		},
		{
			displayName: 'Max Jobs',
			name: 'maxJobs',
			type: 'number',
			default: 1,
			description: 'Maximum number of concurrent jobs (1-15)',
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
