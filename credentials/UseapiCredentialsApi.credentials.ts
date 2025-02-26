import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class UseapiCredentialsApi implements ICredentialType {
	name = 'useApiApi';
	displayName = 'UseAPI Credentials API';
	documentationUrl =
	'https://useapi.net/docs/start-here';
	properties: INodeProperties[] = [
		{
			displayName: 'USEAPI Key',
			name: 'UseApiKey',
			type: 'string',
			typeOptions: { password: true },
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'useapi-key': '={{$credentials.UseApiKey}}',
				accept: 'application/json',
			},
		},
	};
	test?: ICredentialTestRequest | undefined = {
		request: {
			baseURL: 'https://api.useapi.net/v2',
			url: '/account',
		},
	};
}
