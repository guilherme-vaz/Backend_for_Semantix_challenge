import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import JobService from "src/services/Job/JobService";
import Job from "src/models/Job";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  
  const id = event.pathParameters.id;

  const jobService = new JobService();

  const job: Partial<Job> = { ...JSON.parse(event.body), id };

  const jobUpdated = await jobService.updateJob(job);

  return {
    statusCode: 200,
    body: JSON.stringify({
      item: jobUpdated,
    }),
  };
};
