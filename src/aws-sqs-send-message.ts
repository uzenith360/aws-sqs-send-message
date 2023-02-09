import { SQS } from 'aws-sdk';

export default class AWSSQSSendMessage {
    private static _instance: AWSSQSSendMessage;

    private readonly sqsClient: SQS;

    private readonly awsRegion: string;
    private readonly defaultQueueURL: string;

    private constructor(
        awsRegion: string,
        deafultQueueURL: string,
    ) {
        this.awsRegion = awsRegion;
        this.defaultQueueURL = deafultQueueURL;

        this.sqsClient = new SQS(
            {
                apiVersion: 'latest',
                region: this.awsRegion,
            },
        );
    }

    async sendMessage(message: string, queueURL: string = this.defaultQueueURL): Promise<void> {
        await this.sqsClient.sendMessage({
            QueueUrl: queueURL,
            // Any message data we want to send
            MessageBody: message,
        }).promise();
    }

    public static getInstance(
        awsRegion: string,
        deafultQueueURL: string,
    ): AWSSQSSendMessage {
        if (!AWSSQSSendMessage._instance) {
            AWSSQSSendMessage._instance = new AWSSQSSendMessage(
                awsRegion,
                deafultQueueURL,
            );
        }

        return AWSSQSSendMessage._instance;
    }
}
