import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import UserService from "src/services/user/UserService";
import User from "src/models/User";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters.id;

  const userService = new UserService();

  const user: Partial<User> = { ...JSON.parse(event.body), id };

  const userUpdated = await userService.updateUser(user);

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(userUpdated),
  };
};
