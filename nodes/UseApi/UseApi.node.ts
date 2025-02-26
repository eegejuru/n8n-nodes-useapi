import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { runwayFields, runwayOperations } from './RunwayDescription';

// Define base URL constants
const BASE_URL_V1 = 'https://api.useapi.net/v1'; // For API operations (RunwayML assets, etc.)
const BASE_URL_V2 = 'https://api.useapi.net/v2'; // For credential management and verification
// This constant is used in credentials/UseApiApi.credentials.ts
void BASE_URL_V2; // Prevent "unused variable" TypeScript error

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
			},
		],
		properties: [
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

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				let responseData;

				if (resource === 'runway') {
					if (operation === 'getAssets') {
						// Get required parameters
						const offset = this.getNodeParameter('offset', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;

						// Get optional parameters
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as {
							mediaType?: string;
						};

						// Build the query string directly
						let queryString = `?offset=${offset}&limit=${limit}`;

						if (additionalFields.mediaType) queryString += `&mediaType=${encodeURIComponent(additionalFields.mediaType)}`;

						// Construct URL exactly like the working example
						const fullUrl = `${BASE_URL_V1}/runwayml/assets/${queryString}`;

						// Get credentials
						const credentials = await this.getCredentials('useApiApi');
						const token = credentials.apiKey as string;

						// console.log('Making API request to:', fullUrl);

						// Make request with only the Authorization header
						responseData = await this.helpers.request({
							method: 'GET',
							url: fullUrl,
							headers: {
								'Authorization': `Bearer ${token}`,
							},
							json: true,
						});

						// console.log('Response received');

					} else if (operation === 'getAsset') {
						const assetId = this.getNodeParameter('assetId', i) as string;

						// Construct URL with BASE_URL_V1
						const fullUrl = `${BASE_URL_V1}/runwayml/assets/${assetId}`;

						// Get credentials
						const credentials = await this.getCredentials('useApiApi');
						const token = credentials.apiKey as string;

						// console.log('Making API request to:', fullUrl);

						// Make request with only the Authorization header
						responseData = await this.helpers.request({
							method: 'GET',
							url: fullUrl,
							headers: {
								'Authorization': `Bearer ${token}`,
							},
							json: true,
						});

						// console.log('Response received');
					} else if (operation === 'deleteAsset') {
						const assetId = this.getNodeParameter('assetId', i) as string;
						const confirmation = this.getNodeParameter('confirmation', i) as boolean;

						if (!confirmation) {
							throw new Error('Operation cancelled: You must confirm the deletion by checking the confirmation checkbox.');
						}

						// Construct URL with BASE_URL_V1
						const fullUrl = `${BASE_URL_V1}/runwayml/assets/${assetId}`;

						// Get credentials
						const credentials = await this.getCredentials('useApiApi');
						const token = credentials.apiKey as string;

						// console.log('Making API delete request to:', fullUrl);

						// Make request with DELETE method
						responseData = await this.helpers.request({
							method: 'DELETE',
							url: fullUrl,
							headers: {
								'Authorization': `Bearer ${token}`,
							},
							json: true,
						});

						// console.log('Delete response received');
					}
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData || { error: "Failed to get data from API" }),
					{ itemData: { item: i } },
				);

				returnData.push(...executionData);
			} catch (error) {
				// console.error('Error in execution:', error);
				if (this.continueOnFail()) {
					const executionData = this.helpers.constructExecutionMetaData(
						this.helpers.returnJsonArray({
							error: error.message,
							details: error.response?.data || "No additional details",
							status: error.response?.status,
							statusText: error.response?.statusText
						}),
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
