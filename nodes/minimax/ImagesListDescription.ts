import { INodeProperties } from 'n8n-workflow';

export const IMAGES_LIST_OPERATION = 'imagesList';

export const imagesListFields: INodeProperties[] = [
  {
    displayName: 'Additional Options',
    name: 'additionalOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['minimax'],
        operation: [IMAGES_LIST_OPERATION],
      },
    },
    options: [
      {
        displayName: 'Limit',
        name: 'limit',
        type: 'number',
        typeOptions: {
          minValue: 1,
          maxValue: 100,
        },
        default: 30,
        description: 'Maximum number of images to return',
      },
      {
        displayName: 'Last Image ID',
        name: 'lastImageId',
        type: 'string',
        default: '',
        description: 'Specify the image id from where to start for pagination',
      },
    ],
  },
];
