import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import JobService from "src/services/Job/JobService";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  //Get the id from url parameters
  const id = event.pathParameters.id;

  // Instance of TodoService
  const jobService = new JobService();

  await jobService.deleteJobById(id);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: "Deleted",
  };
};
