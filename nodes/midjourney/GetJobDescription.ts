import { INodeProperties } from 'n8n-workflow';

export const getJobFields: INodeProperties[] = [
  {
    displayName: 'Job ID',
    name: 'jobId',
    type: 'string',
    default: '',
    required: true,
    displayOptions: {
      show: {
        resource: ['midjourney'],
        operation: ['getJob'],
      },
    },
    description: 'The ID of the job to retrieve',
  },
];
