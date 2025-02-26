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
				name: 'UseApiApi',
				required: true,
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
				const operation = this.getNodeParameter('operation', i) as string;
				
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
					
					responseData = await this.helpers.request({
						method: 'GET',
						uri: '/runwayml/assets',
						qs: queryParams,
						json: true,
					});
				} else if (operation === 'getAsset') {
					const assetId = this.getNodeParameter('assetId', i) as string;
					responseData = await this.helpers.request({
						method: 'GET',
						uri: `/runwayml/assets/${assetId}`,
						json: true,
					});
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
