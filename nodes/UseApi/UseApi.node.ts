import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { httpVerbFields, httpVerbOperations } from './UseApiVerbDescription';
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
				required: false,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.useapi.net/v2',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		/**
		 * In the properties array we have two mandatory options objects required
		 *
		 * [Resource & Operation]
		 *
		 * https://docs.n8n.io/integrations/creating-nodes/code/create-first-node/#resources-and-operations
		 *
		 * In our example, the operations are separated into their own file (HTTPVerbDescription.ts)
		 * to keep this class easy to read.
		 *
		 */
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'HTTPLeh Verb',
						value: 'httpVerb',
					},
					{
						name: 'Runway',
						value: 'runway',
					},
				],
				default: 'httpVerb',
			},

			...httpVerbOperations,
			...httpVerbFields,
			...runwayOperations,
			...runwayFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		
		let responseData;

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'httpVerb') {
					// Existing HTTP verb handling code would go here
					// This part should be preserved from the original implementation
				} else if (resource === 'runway') {
					const operation = this.getNodeParameter('operation', i) as string;
					
					if (operation === 'getAsset') {
						const assetId = this.getNodeParameter('assetId', i) as string;
						responseData = await this.helpers.request({
							method: 'GET',
							baseURL: 'https://api.useapi.net/v1/runwayml',
							uri: `/assets/${assetId}`,
							json: true,
						});
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
