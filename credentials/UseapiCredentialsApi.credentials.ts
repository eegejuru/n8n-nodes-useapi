import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class UseapiCredentialsApi implements ICredentialType {
	name = 'useApiApi';
	displayName = 'UseAPI Credentials API';
	documentationUrl = 'https://useapi.net/docs/start-here';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
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
			method: 'GET',
			headers: {
				'X-Debug-Info': 'UseAPI credential test',
				'Authorization': '=Bearer {{$credentials.apiKey}}',
				'Accept': 'application/json'
			}
		}
	};
}
