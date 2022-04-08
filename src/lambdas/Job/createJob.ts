import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import JobService from "src/services/Job/JobService";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { jobName, user, status, recurrence } = JSON.parse(event.body);

  const jobService = new JobService();
  const job = await jobService.createJob(jobName, user, status, recurrence);

  return {
    statusCode: 201,
    body: JSON.stringify({
      item: job,
    }),
  };
};
