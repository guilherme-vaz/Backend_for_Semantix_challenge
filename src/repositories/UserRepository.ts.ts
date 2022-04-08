import { MyDynamoDB } from "../database/DynamoDocumentClient";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import User from "src/models/User";


class UserRepository extends MyDynamoDB {
  private dynamoClientDB: DocumentClient;
  private readonly usersTable = process.env.USERS_TABLE;

  constructor() {
    super();
    this.dynamoClientDB = super.getDynamoClient();
  }

  // Index
  async getAllUsers(): Promise<User[]> {
    const result = await this.dynamoClientDB
      .scan({
        TableName: this.usersTable,
      })
      .promise();

    return result.Items as User[];
  }

  // Create user
  async createUser(user: User): Promise<User> {
    await this.dynamoClientDB.put({
        TableName: this.usersTable,
        Item: user,
      }).promise();

    return user;
  }

  // Update todo
  async updateUser(partialUser: Partial<User>): Promise<User> {
    const updated = await this.dynamoClientDB
      .update({
        TableName: this.usersTable,
        Key: { id: partialUser.id },
        UpdateExpression: "set fullName = :fullName, cellphone = :cellphone",
        ExpressionAttributeValues: {
          ":fullName": partialUser.fullName,
          ":cellphone": partialUser.cellphone,
        },
        ReturnValues: "UPDATED_NEW",
      })
      .promise();

    return updated.Attributes as User;
  }

  // Delete user
  async deleteUserById(id: string) {
    return this.dynamoClientDB
      .delete({
        TableName: this.usersTable,
        Key: { id: id },
      })
      .promise();
  }
}

export default UserRepository;
