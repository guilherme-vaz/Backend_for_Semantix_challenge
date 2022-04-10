import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import UserService from "src/services/User/UserService";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // This name comes from the front-end form to create a Todo
  const { fullName, email, cellphone, password } = JSON.parse(event.body);

  // Instance of TodoService
  const userService = new UserService();
  const user = await userService.createUser(email, fullName, cellphone, password);

  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(user),
  };
};
