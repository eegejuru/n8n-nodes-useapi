import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { midjourneyFields, midjourneyOperations } from './MidjourneyDescription';

export class Midjourney implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Midjourney',
		name: 'midjourney',
		icon: 'file:midjourney.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Work with Midjourney API',
		defaults: {
			name: 'Midjourney',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'useApiMidjourney',
				required: true,
			},
		],
		properties: [
			...midjourneyOperations,
			...midjourneyFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		let responseData;

		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'midjourney') {
					// *********************************************************************
					//                            midjourney
					// *********************************************************************

					if (operation === 'imagine') {
						// Get parameters
						const prompt = this.getNodeParameter('prompt', i) as string;
						const additionalOptions = this.getNodeParameter('additionalOptions', i, {}) as {
							maxJobs?: number;
							replyUrl?: string;
							replyRef?: string;
							discord?: string;
							server?: string;
							channel?: string;
						};

						// Get credentials
						const credentials = await this.getCredentials('useApiMidjourney');

						// Prepare request body
						const body: {
							prompt: string;
							discord?: string;
							server?: string;
							channel?: string;
							maxJobs?: number;
							replyUrl?: string;
							replyRef?: string;
						} = {
							prompt,
						};

						// Add optional parameters if provided
						if (additionalOptions.maxJobs) {
							body.maxJobs = additionalOptions.maxJobs;
						} else if (credentials.maxJobs) {
							body.maxJobs = credentials.maxJobs as number;
						}

						if (additionalOptions.replyUrl) {
							body.replyUrl = additionalOptions.replyUrl;
						}

						if (additionalOptions.replyRef) {
							body.replyRef = additionalOptions.replyRef;
						}

						// Add Discord credentials (with overrides if provided)
						if (additionalOptions.discord) {
							body.discord = additionalOptions.discord;
						} else if (credentials.discordToken) {
							body.discord = credentials.discordToken as string;
						}

						if (additionalOptions.server) {
							body.server = additionalOptions.server;
						} else if (credentials.discordServer) {
							body.server = credentials.discordServer as string;
						}

						if (additionalOptions.channel) {
							body.channel = additionalOptions.channel;
						} else if (credentials.discordChannel) {
							body.channel = credentials.discordChannel as string;
						}

						// Make API request
						responseData = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'useApiMidjourney',
							{
								method: 'POST',
								url: '/jobs/imagine',
								body,
								json: true,
							},
						);
					}
				}

				// Add the response to the returned data
				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData),
					{ itemData: { item: i } },
				);
				returnData.push(...executionData);
			} catch (error) {
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
