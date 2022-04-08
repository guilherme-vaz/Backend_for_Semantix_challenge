import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { DynamoDB } from "aws-sdk";

export class MyDynamoDB {
  
  public getDynamoClient(): DocumentClient {
    return new DynamoDB.DocumentClient();
  }
}
