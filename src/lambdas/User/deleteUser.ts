import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import UserService from "src/services/User/UserService";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  //Get the id from url parameters
  const id = event.pathParameters.id;

  // Instance of TodoService
  const userService = new UserService();

  await userService.deleteUserById(id);

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: "Deleted",
  };
};
