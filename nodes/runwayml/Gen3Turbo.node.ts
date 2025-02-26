import { IExecuteFunctions, INodeExecutionData, INodeType, INodeTypeDescription } from 'n8n-workflow';
import { gen3TurboFields } from './Gen3TurboDescription';

// Define base URL constants
const BASE_URL_V1 = 'https://api.useapi.net/v1';

export class Gen3Turbo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Runway Gen-3 Turbo',
		name: 'gen3Turbo',
		icon: 'file:useapi.svg', // You might want to create a specific icon
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Create videos with RunwayML Gen-3 Alpha Turbo',
		defaults: {
			name: 'Gen-3 Turbo',
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
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Create Video',
						value: 'create',
						description: 'Create a video using Gen-3 Alpha Turbo',
						action: 'Create a video with Gen-3 Alpha Turbo',
					},
				],
				default: 'create',
			},
			...gen3TurboFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const operation = this.getNodeParameter('operation', i) as string;
				let responseData;

				if (operation === 'create') {
					// Get parameters
					const firstImageAssetId = this.getNodeParameter('firstImage_assetId', i) as string;
					const imageInput = this.getNodeParameter('imageInput', i) as string;
					const textPrompt = this.getNodeParameter('text_prompt', i, '') as string;
					const aspectRatio = this.getNodeParameter('aspect_ratio', i) as string;
					const seconds = this.getNodeParameter('seconds', i) as number;
					const seed = this.getNodeParameter('seed', i, '') as string | number;
					
					// Get camera motion options
					const cameraMotionOptions = this.getNodeParameter('cameraMotionOptions', i, {}) as {
						static?: boolean;
						horizontal?: number;
						vertical?: number;
						zoom?: number;
						roll?: number;
						pan?: number;
						tilt?: number;
					};
					
					// Get additional settings
					const additionalSettings = this.getNodeParameter('additionalSettings', i, {}) as {
						exploreMode?: boolean;
						replyUrl?: string;
						replyRef?: string;
						maxJobs?: number;
					};
					
					// Build request body
					const requestBody: {[key: string]: any} = {
						firstImage_assetId: firstImageAssetId,
						text_prompt: textPrompt || undefined,
						aspect_ratio: aspectRatio,
						seconds: seconds,
					};
					
					// Add conditional parameters based on image input
					if (imageInput === 'firstAndLastImages' || imageInput === 'allImages') {
						requestBody.lastImage_assetId = this.getNodeParameter('lastImage_assetId', i, '') as string;
					}
					
					if (imageInput === 'allImages') {
						requestBody.middleImage_assetId = this.getNodeParameter('middleImage_assetId', i, '') as string;
					}
					
					// Add seed if provided
					if (seed !== '') {
						requestBody.seed = seed;
					}
					
					// Add camera motion parameters
					if (cameraMotionOptions.static) {
						requestBody.static = true;
					} else {
						if (cameraMotionOptions.horizontal !== undefined) requestBody.horizontal = cameraMotionOptions.horizontal;
						if (cameraMotionOptions.vertical !== undefined) requestBody.vertical = cameraMotionOptions.vertical;
						if (cameraMotionOptions.zoom !== undefined) requestBody.zoom = cameraMotionOptions.zoom;
						if (cameraMotionOptions.roll !== undefined) requestBody.roll = cameraMotionOptions.roll;
						if (cameraMotionOptions.pan !== undefined) requestBody.pan = cameraMotionOptions.pan;
						if (cameraMotionOptions.tilt !== undefined) requestBody.tilt = cameraMotionOptions.tilt;
					}
					
					// Add additional settings
					if (additionalSettings.exploreMode) requestBody.exploreMode = true;
					if (additionalSettings.replyUrl) requestBody.replyUrl = additionalSettings.replyUrl;
					if (additionalSettings.replyRef) requestBody.replyRef = additionalSettings.replyRef;
					if (additionalSettings.maxJobs) requestBody.maxJobs = additionalSettings.maxJobs;
					
					// Get credentials
					const credentials = await this.getCredentials('useApiApi');
					const token = credentials.apiKey as string;
					
					// Make the API request to create the video
					responseData = await this.helpers.request({
						method: 'POST',
						url: `${BASE_URL_V1}/runwayml/gen3turbo/create`,
						headers: {
							'Authorization': `Bearer ${token}`,
							'Content-Type': 'application/json',
						},
						body: requestBody,
						json: true,
					});
				}

				const executionData = this.helpers.constructExecutionMetaData(
					this.helpers.returnJsonArray(responseData || { error: "Failed to get data from API" }),
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
