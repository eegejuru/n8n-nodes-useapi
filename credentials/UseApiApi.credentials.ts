import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class UseApiApi implements ICredentialType {
	name = 'useApiApi';
	displayName = 'UseAPI RunwayML Credentials';
	documentationUrl = 'https://useapi.net/docs/start-here/setup-runwayml';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
		{
			displayName: 'Runway Email',
			name: 'runwayEmail',
			type: 'string',
			default: '',
			description: 'Email for Runway ML authentication',
		},
		{
			displayName: 'Runway Password',
			name: 'runwayPassword',
			type: 'string',
			typeOptions: { password: true },
			default: '',
			description: 'Password for Runway ML authentication',
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
