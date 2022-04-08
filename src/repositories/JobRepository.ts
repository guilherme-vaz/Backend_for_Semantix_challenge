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

  // Index
  async getAllJobs(): Promise<Job[]> {
    const result = await this.dynamoClientDB
      .scan({
        TableName: this.jobsTable,
      })
      .promise();

    return result.Items as Job[];
  }

  // Create job
  async createJob(job: Job): Promise<Job> {
    await this.dynamoClientDB.put({
        TableName: this.jobsTable,
        Item: job,
      }).promise();

    return job;
  }

   // Update job
   async updateJob(partialJob: Partial<Job>): Promise<Job> {
    const updated = await this.dynamoClientDB
      .update({
        TableName: this.jobsTable,
        Key: { id: partialJob.id },
        UpdateExpression: "set jobName = :jobName, statusCode = :statusCode, recurrence = :recurrence",
        ExpressionAttributeValues: {
          ":jobName": partialJob.jobName,
          ":statusCode": partialJob.statusCode,
          ":recurrence": partialJob.recurrence,
        },
        ReturnValues: "UPDATED_NEW",
      })
      .promise();

    return updated.Attributes as Job;
  }

  // Delete job
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