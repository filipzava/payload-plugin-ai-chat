# 🚀 AI Chat Payload Plugin

The AI Chat Payload Plugin is a plugin for Payload CMS that adds ChatGPT-like functionality to your collection. It enables seamless interaction with ChatGPT models within Payload and provides out-of-the-box chat completion and admin chat completion endpoints. This README file provides instructions on how to install and use the plugin.

⚠️ **Please note that this plugin is still in development and may contain bugs or incomplete features. Your feedback and suggestions during the beta testing phase are highly appreciated.**

## 📢 Feedback and Bug Reporting

During the beta testing phase, your feedback and bug reports play a crucial role in improving the plugin. If you encounter any issues, have suggestions for improvements, or need assistance, please [open an issue](https://github.com/filipzava/payload-plugin-ai-chat/issues) on the GitHub repository. Your contributions will help make the AI Chat Payload Plugin more stable and reliable.

Thank you for participating in the beta testing phase of the AI Chat Payload Plugin! Your support and feedback are highly appreciated.

## 📥 Installation

You can install the AI Chat Payload Plugin using one of the following methods:

```shell
pnpm add payload-plugin-ai-chat
```

or

```shell
yarn add payload-plugin-ai-chat
```

or

```shell
npm i payload-plugin-ai-chat
```

## Basic Usage

To use the AI Chat Payload Plugin, follow these steps:

1. Add the plugin to the plugins array in your Payload config file.
2. Configure the plugin options, including the collections you want to enable the AI Chat functionality for.
3. Set other options such as the group name, group label, and defaults for AI chat parameters.

Here's an example of how to configure the plugin in your Payload config file:

```javascript
import { buildConfig } from 'payload/config';
import { aiChat } from 'payload-plugin-ai-chat'

const config = buildConfig({
  collections: ['chats'],
  plugins: [
    aiChat({
      collections: ['chats'],
      groupName: 'aiChat',
      groupLabel: 'AI Chat',
      defaults: {
        model: 'gpt-3.5-turbo-16k',
        messageRole: 'user',
        temperature: 1,
        maxToken: 2_048,
        frequencyPenalty: 0,
        presencePenalty: 0,
      },
    })
  ]
});

export default config;
```

## Options

The AI Chat Payload Plugin provides a set of configurable options to customize its functionality:

* `enabled` (boolean | default: true): Flag to determine if the plugin functionality should be enabled or not.
* `collections` (string[]): An array of collection slugs to enable the AI Chat functionality.
* `groupName` (string | default: 'aiChat'): Name for the AI Chat group in your configuration.
* `groupLabel` (string | default: 'AI Chat'): Display label for the AI Chat group in the Payload admin panel.
* `defaults` (object): Set of default values for the AI Chat parameters.
  - `model` (string | default: 'gpt-3.5-turbo-16k'): Specifies which GPT model to use.
  - `messageRole` (string | default: 'user'): Role for the message (usually 'user' or 'assistant').
  - `temperature` (number | default: 1): Controls the randomness of the model's output.
  - `maxToken` (number | default: 2_048): Maximum number of tokens for the response.
  - `frequencyPenalty` (number | default: 0): Adjusts the likelihood of frequently used tokens appearing.
  - `presencePenalty` (number | default: 0): Adjusts the likelihood of new tokens appearing.

**Make sure to have the `OPENAI_API_KEY` set in your environment variables for the plugin to work seamlessly.**
[How to generate your API KEY ?](https://help.openai.com/en/articles/4936850-where-do-i-find-my-secret-api-key)

## Development

To actively develop or debug this plugin, you can work directly within the dev directory of this repository or link your own project.

### Internal Development

This repository includes a fully working, self-seeding instance of Payload. To spin up the dev, follow these steps:

1. Clone the repository.
2. Navigate to the root directory of the plugin repository and run `yarn` to install the dependencies.
3. Navigate to the `dev` directory and run `yarn` to install the dev dependencies.
4. Run `yarn dev` to start the dev server.
5. Open [http://localhost:3000/admin](http://localhost:3000/admin) in your browser.
6. Log in using the username `dev@payloadcms.com` and password `test`.

The dev allows you to test and make changes to the plugin. Keep in mind that the dev database is automatically seeded on every startup, and any changes you make to the data will be destroyed each time you reboot the app.
