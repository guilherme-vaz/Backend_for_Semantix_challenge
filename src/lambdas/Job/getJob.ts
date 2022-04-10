import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import JobService from "src/services/Job/JobService";

export const handler = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const jobService = new JobService();
  const jobs = await jobService.getAllJobs();

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(jobs),
  };
};
