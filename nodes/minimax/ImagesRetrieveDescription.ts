import { INodeProperties } from 'n8n-workflow';

export const IMAGES_RETRIEVE_OPERATION = 'imagesRetrieve';

export const imagesRetrieveFields: INodeProperties[] = [
  {
    displayName: 'Image ID',
    name: 'imageId',
    type: 'string',
    required: true,
    displayOptions: {
      show: {
        resource: ['minimax'],
        operation: [IMAGES_RETRIEVE_OPERATION],
      },
    },
    default: '',
    description: 'ID of the image to retrieve',
  },
];
