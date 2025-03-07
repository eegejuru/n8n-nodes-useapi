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
    placeholder: 'Example: U1, V2, Upscale (2x)',
    displayOptions: {
      show: {
        resource: ['midjourney'],
        operation: ['button'],
      },
    },
    description: 'Button from buttons array of the referenced job. Common values include: U1-U4, V1-V4, ⬅️, ➡️, ⬆️, ⬇️, 🔄, Vary (Region), Vary (Strong), Vary (Subtle), Zoom Out 1.5x, Zoom Out 2x, Upscale variants, Make Square, Make Variations, Remaster, Custom Zoom',
    hint: 'First use "Get Job" operation to see the exact available buttons for your specific job ID',
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
