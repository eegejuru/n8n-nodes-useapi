> **Currently in BETA and under active development.**

![Banner image](https://user-images.githubusercontent.com/10284570/173569848-c624317f-42b1-45a6-ab09-f0ea3c247648.png)

# n8n-nodes-useapi

This n8n community node enables seamless integration of **[useapi.net](http://useapi.net) in your [n8n](https://n8n.io) workflows**.

Implementing in this nodes the following services, via the useapi.net API:
- Midjourney (not started yet)
- Riffusion (not started yet)
- Mureka (not started yet)
- Runway (in progress)
- MiniMax (not started yet)
- PixVerse (not started yet)
- InsightFaceSwap (not started yet)
- Pika (not started yet)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## More information

You need to set up and configure the Midjourney, Mureka, Runway, InsightFaceSwap, Pika or PixVerse as well as subscribe to useapi.net service before you can start using this experimental API. 

I am not affiliated in any way with useapi.net. Drop me a note if you have any questions. I will try to help and add new features as soon as possible.

## Features

### Runway
- **Task checker**: Check the status of a task.
- **Image to video**: Convert images into videos with RunwayML RunGen3 Turbo
- **Describe image**: Describe an image using RunwayML's image captioning model.
- **Assets listing**: List all assets available on RunwayML.

## Credentials

You will need an API key from useapi.net to use this node. Add the API key to the credentials section in the settings of the node.

## Version history

Initial version, RunwayML integrated with some services.

## Compatibility

1.80.0 and above

## License

[MIT](https://github.com/n8n-io/n8n-nodes-useapi/blob/master/LICENSE.md)
