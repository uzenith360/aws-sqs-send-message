import { SQS } from '@aws-sdk/client-sqs';

export class AWSSQSSendMessage {
    private static _instance: AWSSQSSendMessage;

    private readonly sqsClient: SQS;

    private readonly awsRegion: string;
    private readonly defaultQueueURL: string;

    private constructor(
        awsRegion: string,
        defaultQueueURL: string,
    ) {
        this.awsRegion = awsRegion;
        this.defaultQueueURL = defaultQueueURL;

        this.sqsClient = new SQS({
            // The key apiVersion is no longer supported in v3, and can be removed.
            // @deprecated The client uses the "latest" apiVersion.
            apiVersion: 'latest',

            region: this.awsRegion,
        });
    }

    async sendMessage(message: string, queueURL: string = this.defaultQueueURL): Promise<void> {
        await this.sqsClient.sendMessage({
            QueueUrl: queueURL,
            // Any message data we want to send
            MessageBody: message,
        });
    }

    async sendMessages(messages: string[], queueURL: string = this.defaultQueueURL): Promise<void> {
        await this.sqsClient.sendMessageBatch({
            QueueUrl: queueURL,
            Entries: messages.map(
                (message: string, index: number) => (
                    {
                        Id: String(index),
                        // Any message data we want to send
                        MessageBody: message,
                    }
                ),
            ),
        });
    }

    public static getInstance(
        awsRegion: string,
        defaultQueueURL: string,
    ): AWSSQSSendMessage {
        if (!AWSSQSSendMessage._instance) {
            AWSSQSSendMessage._instance = new AWSSQSSendMessage(
                awsRegion,
                defaultQueueURL,
            );
        }

        return AWSSQSSendMessage._instance;
    }
}
