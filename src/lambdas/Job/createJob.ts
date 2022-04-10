import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import JobService from "src/services/Job/JobService";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { jobName, user, statusCode, recurrenceValue, recurrence } = JSON.parse(event.body);

  const jobService = new JobService();
  const job = await jobService.createJob(jobName, user, statusCode, recurrenceValue, recurrence);

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(job),
  };
};
