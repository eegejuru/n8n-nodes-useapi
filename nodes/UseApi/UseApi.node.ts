import { 
	IExecuteFunctions, 
	INodeExecutionData, 
	INodeType, 
	INodeTypeDescription,
	NodeApiError,
	NodeOperationError
} from 'n8n-workflow';
import { runwayFields, runwayOperations } from '../runwayml/RunwayDescription';
import { gen3TurboFields } from '../runwayml/Gen3TurboDescription';

// Define base URL constants
const BASE_URL_V1 = 'https://api.useapi.net/v1'; // For API operations (RunwayML assets, etc.)
const BASE_URL_V2 = 'https://api.useapi.net/v2'; // For credential management and verification
// This constant is used in credentials/UseApiApi.credentials.ts
void BASE_URL_V2; // Prevent "unused variable" TypeScript error

export class UseApi implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'UseAPI RunwayML',
		name: 'useApi',
		icon: 'file:useapi.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with RunwayML through UseAPI',
		defaults: {
			name: 'UseAPI RunwayML',
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
			...gen3TurboFields,
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
							throw new NodeOperationError(this.getNode(), 'Operation cancelled: You must confirm the deletion by checking the confirmation checkbox.', { itemIndex: i });
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
					} else if (operation === 'uploadAsset') {
						const name = this.getNodeParameter('name', i) as string;
						const inputType = this.getNodeParameter('inputType', i) as string;
						
						// Get additional fields
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as {
							duration?: number;
							width?: number;
							height?: number;
						};
						
						// Construct URL with query parameters
						let queryUrl = `${BASE_URL_V1}/runwayml/assets/?name=${encodeURIComponent(name)}`;
						
						// Add optional parameters if they exist
						if (additionalFields.duration) queryUrl += `&duration=${additionalFields.duration}`;
						if (additionalFields.width) queryUrl += `&width=${additionalFields.width}`;
						if (additionalFields.height) queryUrl += `&height=${additionalFields.height}`;
						
						// Get credentials
						const credentials = await this.getCredentials('useApiApi');
						const token = credentials.apiKey as string;
						
						let binaryData;
						let contentType;
						
						if (inputType === 'binaryData') {
							// Handle binary data upload
							const binaryPropertyName = this.getNodeParameter('binaryPropertyName', i) as string;
							
							if (!items[i].binary) {
								throw new NodeApiError(this.getNode(), { message: 'No binary data found' });
							}
							
							// Use type assertion to tell TypeScript that binary exists and has the correct type
							const binary = items[i].binary!;
							
							// Use a safer property access method that TypeScript understands
							if (!(binaryPropertyName in binary)) {
								throw new NodeApiError(this.getNode(), { message: `No binary data found in property "${binaryPropertyName}"` });
							}
							
							// Now TypeScript knows this is safe
							const binaryProperty = binary[binaryPropertyName];
							binaryData = await this.helpers.getBinaryDataBuffer(i, binaryPropertyName);
							contentType = binaryProperty.mimeType;
						} else if (inputType === 'url') {
							// Handle URL upload
							const url = this.getNodeParameter('url', i) as string;
							
							// Download the file from the URL
							const response = await this.helpers.request({
								method: 'GET',
								url,
								encoding: null, // Get the response as a Buffer
							});
							
							binaryData = response;
							
							// Try to determine content type from the URL
							const fileExtension = url.split('.').pop()?.toLowerCase();
							
							if (fileExtension) {
								// Map common extensions to content types based on docs
								const contentTypeMap: { [key: string]: string } = {
									'png': 'image/png',
									'jpg': 'image/jpeg',
									'jpeg': 'image/jpeg',
									'gif': 'image/gif',
									'webp': 'image/webp',
									'mpo': 'image/mpo',
									'mp4': 'video/mp4',
									'mov': 'video/quicktime',
									'3gp': 'video/3gpp',
									'mkv': 'video/x-matroska',
									'flv': 'video/x-flv',
									'mpeg': 'video/mpeg',
									'ts': 'video/MP2T',
									'avi': 'video/x-msvideo',
									'mjpeg': 'video/x-motion-jpeg',
									'webm': 'video/webm',
									'ogv': 'video/ogg',
									'wav': 'audio/wav',
									'mp3': 'audio/mpeg',
									'flac': 'audio/flac',
									'ogg': 'audio/ogg',
								};
								
								contentType = contentTypeMap[fileExtension] || 'application/octet-stream';
							} else {
								contentType = 'application/octet-stream'; // Default
							}
						}
						
						// Make the API request to upload the asset
						responseData = await this.helpers.request({
							method: 'POST',
							url: queryUrl,
							headers: {
								'Authorization': `Bearer ${token}`,
								'Content-Type': contentType,
							},
							body: binaryData,
							json: true,
						});
					} else if (operation === 'gen3TurboCreate') {
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
					} else if (operation === 'getTasks') {
						// Get required parameters
						const offset = this.getNodeParameter('offset', i) as number;
						const limit = this.getNodeParameter('limit', i) as number;

						// Get optional parameters
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as {
							email?: string;
							statuses?: string;
						};

						// Build the query string
						let queryString = `?offset=${offset}&limit=${limit}`;

						if (additionalFields.email) queryString += `&email=${encodeURIComponent(additionalFields.email)}`;
						if (additionalFields.statuses) queryString += `&statuses=${encodeURIComponent(additionalFields.statuses)}`;

						// Construct URL
						const fullUrl = `${BASE_URL_V1}/runwayml/tasks/${queryString}`;

						// Get credentials
						const credentials = await this.getCredentials('useApiApi');
						const token = credentials.apiKey as string;

						// Make request
						responseData = await this.helpers.request({
							method: 'GET',
							url: fullUrl,
							headers: {
								'Authorization': `Bearer ${token}`,
							},
							json: true,
						});
					} else if (operation === 'getTask') {
						const taskId = this.getNodeParameter('taskId', i) as string;

						// Construct URL
						const fullUrl = `${BASE_URL_V1}/runwayml/tasks/${taskId}`;

						// Get credentials
						const credentials = await this.getCredentials('useApiApi');
						const token = credentials.apiKey as string;

						// Make request
						responseData = await this.helpers.request({
							method: 'GET',
							url: fullUrl,
							headers: {
								'Authorization': `Bearer ${token}`,
							},
							json: true,
						});
					} else if (operation === 'describeImage') {
						const imageAssetId = this.getNodeParameter('imageAssetId', i) as string;

						// Construct URL
						const fullUrl = `${BASE_URL_V1}/runwayml/frames/describe/${imageAssetId}`;

						// Get credentials
						const credentials = await this.getCredentials('useApiApi');
						const token = credentials.apiKey as string;

						// Make request
						responseData = await this.helpers.request({
							method: 'GET',
							url: fullUrl,
							headers: {
								'Authorization': `Bearer ${token}`,
							},
							json: true,
						});
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
