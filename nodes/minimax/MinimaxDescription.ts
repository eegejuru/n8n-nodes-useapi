import { INodeProperties } from 'n8n-workflow';
import {
  IMAGES_LIST_OPERATION,
  IMAGES_RETRIEVE_OPERATION,
  IMAGES_CREATE_OPERATION,
  imagesCreateFields,
  imagesListFields,
  imagesRetrieveFields,
} from '.';

export const minimaxOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['minimax'],
			},
		},
		options: [
			{
				name: 'Create/Update Account',
				value: 'createAccount',
				description: 'Register or update a MiniMax account with UseAPI',
				action: 'Create or update an account',
			},
			{
				name: 'Create Images',
				value: IMAGES_CREATE_OPERATION,
				description: 'Create images using text prompt',
				action: 'Create images',
			},
			{
				name: 'Create Video',
				value: 'createVideo',
				description: 'Create a 5-second video using text/image prompt',
				action: 'Create a video',
			},
			{
				name: 'List Files',
				value: 'listFiles',
				description: 'Get a list of uploaded files',
				action: 'List files',
			},
			{
				name: 'List Images',
				value: IMAGES_LIST_OPERATION,
				description: 'Get a list of generated images',
				action: 'List images',
			},
			{
				name: 'Retrieve Image',
				value: IMAGES_RETRIEVE_OPERATION,
				description: 'Get status and details of an image by ID',
				action: 'Retrieve an image',
			},
			{
				name: 'Retrieve Video',
				value: 'retrieveVideo',
				description: 'Get status and details of a video by ID',
				action: 'Retrieve a video',
			},
			{
				name: 'Upload File',
				value: 'uploadFile',
				description: 'Upload an image file to be used in video creation',
				action: 'Upload a file',
			},
		],
		default: 'createAccount',
	},
];

export const minimaxFields: INodeProperties[] = [
	...imagesCreateFields,
	...imagesListFields,
	...imagesRetrieveFields,
];
