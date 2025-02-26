import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { runwayFields, runwayOperations } from './RunwayDescription';

export class UseApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'UseAPI',
		name: 'useApi',
		icon: 'file:useapi.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with UseApi API',
		defaults: {
			name: 'UseApi',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'useApiApi',
				required: true,
				displayOptions: {
					show: {
						authentication: ['apiKey'],
					},
				},
			},
		],
		requestDefaults: {
			baseURL: 'https://api.useapi.net/v1',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				options: [
					{
						name: 'API Key',
						value: 'apiKey',
					},
				],
				default: 'apiKey',
				description: 'The authentication method to use',
			},
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Runway',
						value: 'runway',
					},
				],
				default: 'runway',
			},

			...runwayOperations,
			...runwayFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		
		let responseData;

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;
				const authentication = this.getNodeParameter('authentication', i) as string;
				
				if (resource === 'runway') {
					if (operation === 'getAssets') {
						// Get required parameters
						const offset = this.getNodeParameter('offset', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;
						
						// Get optional parameters
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as {
							email?: string;
							mediaType?: string;
						};
						
						// Construct query parameters
						const queryParams: Record<string, any> = {
							offset,
							limit
						};
						
						if (additionalFields.email) queryParams.email = additionalFields.email;
						if (additionalFields.mediaType) queryParams.mediaType = additionalFields.mediaType;
						
						// Make the request with proper authentication
						if (authentication === 'apiKey') {
							responseData = await this.helpers.requestWithAuthentication.call(
								this,
								'useApiApi',
								{
									method: 'GET',
									url: 'https://api.useapi.net/v1/runwayml/assets',
									qs: queryParams,
									json: true,
								}
							);
						}
					} else if (operation === 'getAsset') {
						const assetId = this.getNodeParameter('assetId', i) as string;
						
						// Make the request with proper authentication
						if (authentication === 'apiKey') {
							responseData = await this.helpers.requestWithAuthentication.call(
								this,
								'useApiApi',
								{
									method: 'GET',
									url: `https://api.useapi.net/v1/runwayml/assets/${assetId}`,
									json: true,
								}
							);
						}
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);

				returnData.push(...executionData);
			} catch (error) {
				if (this.continueOnFail()) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({ error: error.message }),
						{ itemData: { item: i } },
					);
					returnData.push(...executionData);
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
