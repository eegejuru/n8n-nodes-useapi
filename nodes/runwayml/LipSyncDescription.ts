import { INodeProperties } from 'n8n-workflow';

export const lipSyncFields: INodeProperties[] = [
	{
		displayName: 'Input Type',
		name: 'inputType',
		type: 'options',
		options: [
			{ name: 'Image + Audio', value: 'imageAudio' },
			{ name: 'Image + Voice Text', value: 'imageVoiceText' },
			{ name: 'Video + Audio', value: 'videoAudio' },
			{ name: 'Video + Voice Text', value: 'videoVoiceText' },
		],
		default: 'imageAudio',
		required: true,
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['lipSync'],
			},
		},
		description: 'Type of input to use for lip sync',
	},
	// Image options
	{
		displayName: 'Image Asset ID',
		name: 'image_assetId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['lipSync'],
				inputType: ['imageAudio', 'imageVoiceText'],
			},
		},
		description: 'Asset ID of the image to use for lip syncing',
	},
	// Video options
	{
		displayName: 'Video Asset ID',
		name: 'video_assetId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['lipSync'],
				inputType: ['videoAudio', 'videoVoiceText'],
			},
		},
		description: 'Asset ID of the video to use for lip syncing',
	},
	// Audio options
	{
		displayName: 'Audio Asset ID',
		name: 'audio_assetId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['lipSync'],
				inputType: ['imageAudio', 'videoAudio'],
			},
		},
		description: 'Asset ID of the audio to use for lip syncing',
	},
	// Voice text options
	{
		displayName: 'Voice ID',
		name: 'voiceId',
		type: 'string',
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['lipSync'],
				inputType: ['imageVoiceText', 'videoVoiceText'],
			},
		},
		description: 'ID of the voice to use for generating audio. Use GET lipsync/voices to see the list of voices.',
	},
	{
		displayName: 'Voice Text',
		name: 'voice_text',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		default: '',
		required: true,
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['lipSync'],
				inputType: ['imageVoiceText', 'videoVoiceText'],
			},
		},
		description: 'Text to be read by the AI voice and used for lip syncing',
	},
	{
		displayName: 'Voice Model',
		name: 'model_id',
		type: 'options',
		options: [
			{ name: 'Eleven Multilingual v1', value: 'eleven_multilingual_v1' },
			{ name: 'Eleven Multilingual v2 (28+ languages)', value: 'eleven_multilingual_v2' },
		],
		default: 'eleven_multilingual_v1',
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['lipSync'],
				inputType: ['imageVoiceText', 'videoVoiceText'],
			},
		},
		description: 'AI voice model to use',
	},
	{
		displayName: 'Additional Options',
		name: 'additionalOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['runway'],
				operation: ['lipSync'],
			},
		},
		options: [
			{
				displayName: 'Explore Mode',
				name: 'exploreMode',
				type: 'boolean',
				default: false,
				description: 'Whether to use Explore mode (requires Runway Unlimited plan, does not use credits)',
			},
			{
				displayName: 'Reply URL',
				name: 'replyUrl',
				type: 'string',
				default: '',
				description: 'Webhook URL to receive notification when generation is complete',
			},
			{
				displayName: 'Reply Reference',
				name: 'replyRef',
				type: 'string',
				default: '',
				description: 'Custom reference ID to include in the callback',
			},
			{
				displayName: 'Max Jobs',
				name: 'maxJobs',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 10,
				},
				default: 5,
				description: 'Maximum number of parallel jobs (1-10)',
			},
		],
	},
];
