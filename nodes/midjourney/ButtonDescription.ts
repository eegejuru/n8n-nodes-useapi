import { INodeProperties } from 'n8n-workflow';

export const buttonFields: INodeProperties[] = [
  {
    displayName: 'Job ID',
    name: 'jobId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['midjourney'],
        operation: ['button'],
      },
    },
    description: 'The ID of the job that contains the button you want to press',
  },
  {
    displayName: 'Button',
    name: 'button',
    type: 'string',
    default: '',
    required: true,
    placeholder: 'U1, V1, etc.',
    displayOptions: {
      show: {
        resource: ['midjourney'],
        operation: ['button'],
      },
    },
    description: 'Button from buttons array of the referenced job (U1, U2, V1, V2, etc.)',
  },
  {
    displayName: 'Additional Options',
    name: 'additionalOptions',
    type: 'collection',
    placeholder: 'Add Option',
    default: {},
    displayOptions: {
      show: {
        resource: ['midjourney'],
        operation: ['button'],
      },
    },
    options: [
      {
        displayName: 'Custom Zoom Prompt',
        name: 'prompt',
        type: 'string',
        default: '',
        description: 'Required for the Custom Zoom button',
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
