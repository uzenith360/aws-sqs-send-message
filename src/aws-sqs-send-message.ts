import { SQS } from 'aws-sdk';

export default class AWSSQSSendMessage {
    private static _instance: AWSSQSSendMessage;

    private readonly sqsClient: SQS;

    private readonly awsRegion: string;
    private readonly queueURL: string;

    private constructor(
        awsRegion: string,
        queueURL: string,
    ) {
        this.awsRegion = awsRegion;
        this.queueURL = queueURL;

        this.sqsClient = new SQS(
            {
                apiVersion: 'latest',
                region: this.awsRegion,
            },
        );
    }

    async generateSQSUploadUrl(message: string): Promise<void> {
        await this.sqsClient.sendMessage({
            QueueUrl: this.queueURL,
            // Any message data we want to send
            MessageBody: message,
        }).promise();
    }

    public static getInstance(
        awsRegion: string,
        queueURL: string,
    ): AWSSQSSendMessage {
        if (!AWSSQSSendMessage._instance) {
            AWSSQSSendMessage._instance = new AWSSQSSendMessage(
                awsRegion,
                queueURL,
            );
        }

        return AWSSQSSendMessage._instance;
    }
}
