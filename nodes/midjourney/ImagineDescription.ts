import { INodeProperties } from 'n8n-workflow';

/**
 * Defines valid aspect ratio values as a TypeScript union type
 * This ensures type safety and easier refactoring when adding/removing options
 */
type AspectRatioOption = '16:9' | '21:9' | '1:1' | '9:16' | '4:3' | '3:4';

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
				options: [
					{ name: '16:9 (Landscape)', value: '16:9' as AspectRatioOption },
					{ name: '21:9 (Widescreen)', value: '21:9' as AspectRatioOption },
					{ name: '1:1 (Square)', value: '1:1' as AspectRatioOption },
					{ name: '9:16 (Portrait)', value: '9:16' as AspectRatioOption },
					{ name: '4:3', value: '4:3' as AspectRatioOption },
					{ name: '3:4', value: '3:4' as AspectRatioOption },
				],
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
