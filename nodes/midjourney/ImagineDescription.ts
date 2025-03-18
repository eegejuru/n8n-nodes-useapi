import { INodeProperties } from 'n8n-workflow';
import { AspectRatioOption, ASPECT_RATIO_OPTIONS } from '../constants/shared';

/**
 * Constants used throughout the Midjourney integration
 * Centralizing these values makes the code more maintainable
 */
export const RESOURCE_NAME = 'midjourney';
export const IMAGINE_OPERATION = 'imagine';

/**
 * Configuration for the Midjourney 'imagine' operation
 *
 * @description Defines the UI fields and options for the Midjourney 'imagine' operation,
 * which generates images based on text prompts. This operation connects to the Midjourney
 * API through UseAPI's integration, allowing users to create AI-generated artwork.
 *
 * @property {Object} prompt - The main text input field where users enter their image description
 * @property {Object} additionalOptions - Collection of optional parameters including aspect ratio and callback settings
 *
 * @example
 * // Example usage in n8n workflow:
 * // User provides a prompt like "sunset over mountains, photorealistic"
 * // Optionally selects aspect ratio "16:9" for landscape orientation
 * // The node then sends these parameters to the Midjourney API
 */
export const imagineFields: INodeProperties[] = [
	{
		displayName: 'Prompt',
		name: 'prompt',
		type: 'string',
		typeOptions: {
			rows: 4,
			minLength: 3,
			maxLength: 2000,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: [RESOURCE_NAME],
				operation: [IMAGINE_OPERATION],
			},
		},
		description: 'Text prompt describing the image to create (3-2000 characters)',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: [RESOURCE_NAME],
				operation: [IMAGINE_OPERATION],
			},
		},
		options: [
			{
				displayName: 'Aspect Ratio',
				name: 'aspectRatio',
				type: 'options',
				options: ASPECT_RATIO_OPTIONS,
				default: '' as AspectRatioOption | '',
				description: 'Set the aspect ratio for the generated image',
			},
			{
				displayName: 'Reply URL',
				name: 'replyUrl',
				type: 'string',
				default: '',
				description: 'URL to receive callbacks once the job is completed',
			},
			{
				displayName: 'Reference ID',
				name: 'replyRef',
				type: 'string',
				default: '',
				description: 'Your reference ID which will be returned with this job response/result',
			},
		],
	},
];
