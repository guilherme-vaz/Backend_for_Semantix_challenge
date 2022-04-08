import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import UserService from "src/services/user/UserService";
import User from "src/models/User";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  //Get the id from url parameters
  const id = event.pathParameters.id;

  // Instance of TodoService
  const userService = new UserService();

  // ... Spread operator separates the arguments.
  // We're looking for the same id from the URL on the event.body
  const user: Partial<User> = { ...JSON.parse(event.body), id };

  const userUpdated = await userService.updateUser(user);

  return {
    statusCode: 200,
    body: JSON.stringify({
      item: userUpdated,
    }),
  };
};
