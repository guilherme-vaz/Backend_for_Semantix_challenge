import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import UserService from "src/services/User/UserService";

// The _ in front of event (_event) explicitly states that there's only one argument and we don't care about it
export const handler = async (
  _event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const userService = new UserService();
  const users = await userService.getAllUsers();

  return {
    statusCode: 201,
    body: JSON.stringify({
      item: users,
    }),
  };
};
