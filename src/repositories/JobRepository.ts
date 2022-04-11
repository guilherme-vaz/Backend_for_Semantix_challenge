import { MyDynamoDB } from "../database/DynamoDocumentClient";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import Job from "src/models/Job";

class JobRepository extends MyDynamoDB {
  private dynamoClientDB: DocumentClient;
  private readonly jobsTable = process.env.JOBS_TABLE;

  constructor() {
    super();
    this.dynamoClientDB = super.getDynamoClient();
  }

  async getAllJobs(): Promise<Job[]> {
    const result = await this.dynamoClientDB
      .scan({
        TableName: this.jobsTable,
      })
      .promise();

    return result.Items as Job[];
  }

  async createJob(job: Job): Promise<Job> {
    await this.dynamoClientDB.put({
        TableName: this.jobsTable,
        Item: job,
      }).promise();

    return job;
  }

   async updateJob(partialJob: Partial<Job>): Promise<Job> {
    const updated = await this.dynamoClientDB
      .update({
        TableName: this.jobsTable,
        Key: { id: partialJob.id },
        UpdateExpression: "set jobName = :jobName, statusCode = :statusCode, recurrenceValue = :recurrenceValue, recurrence = :recurrence",
        ExpressionAttributeValues: {
          ":jobName": partialJob.jobName,
          ":statusCode": partialJob.statusCode,
          ":recurrenceValue": partialJob.recurrenceValue,
          ":recurrence": partialJob.recurrence,
        },
        ReturnValues: "UPDATED_NEW",
      })
      .promise();

    return updated.Attributes as Job;
  }

  async deleteJobById(id: string) {
    return this.dynamoClientDB
      .delete({
        TableName: this.jobsTable,
        Key: { id: id },
      })
      .promise();
  }
}

export default JobRepository;