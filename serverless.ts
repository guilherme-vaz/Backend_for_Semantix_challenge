import type { AWS } from "@serverless/typescript";

const serverlessConfiguration: AWS = {
  service: "semantix",
  frameworkVersion: "3",

  plugins: ["serverless-esbuild"],

  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "sa-east-1",
    profile: "serverlessUser",
    stage: "dev",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },

    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      NODE_OPTIONS: "--enable-source-maps --stack-trace-limit=1000",
      USERS_TABLE: "Users-${self:provider.stage}",
      JOBS_TABLE: "Jobs-${self:provider.stage}",
    },

    iamRoleStatements: [
      {
        Effect: "Allow",
        Action: [
          "dynamodb:GetItem",
          "dynamodb:PutItem",
          "dynamodb:UpdateItem",
          "dynamodb:DeleteItem",
          "dynamodb:Scan",
        ],
        Resource: [
          { "Fn::GetAtt": ["UsersDynamoDBTable", "Arn"] },
          { "Fn::GetAtt": ["JobsDynamoDBTable", "Arn"] }
        ],
      },
    ],
  },

  // import the function via paths
  functions: {

    //========= USER FUNCTIONS =================
    createUser: {
      name: "create-user",
      handler: "src/lambdas/User/createUser.handler",
      events: [
        {
          http: {
            method: "POST",
            path: "users",
            cors: true
          },
        },
      ],
    },

    getUser: {
      name: "get-user",
      handler: "src/lambdas/User/getUsers.handler",
      events: [
        {
          http: {
            method: "GET",
            path: "/users",
            cors: true
          },
        },
      ],
    },

    updateUser: {
      name: "update-user",
      handler: "src/lambdas/User/updateUser.handler",
      events: [
        {
          http: {
            method: "PATCH",
            path: "users/{id}",
            cors: true
          },
        },
      ],
    },

    deleteUser: {
      name: "delete-user",
      handler: "src/lambdas/User/deleteUser.handler",
      events: [
        {
          http: {
            method: "DELETE",
            path: "users/{id}",
            cors: true
          },
        },
      ],
    },

    //========= JOB FUNCTIONS =================
    createJob: {
      name: "create-job",
      handler: "src/lambdas/Job/createJob.handler",
      events: [
        {
          http: {
            method: "POST",
            path: "jobs",
            cors: true
          },
        },
      ],
    },

    getJob: {
      name: "get-job",
      handler: "src/lambdas/Job/getJob.handler",
      events: [
        {
          http: {
            method: "GET",
            path: "/jobs",
            cors: true
          },
        },
      ],
    },

    updateJob: {
      name: "update-job",
      handler: "src/lambdas/Job/updateJob.handler",
      events: [
        {
          http: {
            method: "PATCH",
            path: "jobs/{id}",
            cors: true
          },
        },
      ],
    },

    deleteJob: {
      name: "delete-job",
      handler: "src/lambdas/Job/deleteJob.handler",
      events: [
        {
          http: {
            method: "DELETE",
            path: "jobs/{id}",
            cors: true
          },
        },
      ],
    },
  },

  package: { individually: true },

  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ["aws-sdk"],
      target: "node14",
      define: { "require.resolve": undefined },
      platform: "node",
      concurrency: 10,
    },

    // usersTableName: "Users-Table",
    // jobsTableName: "Jobs-Table",
  },

  resources: {
    Resources: {
      UsersDynamoDBTable: {
        Type: "AWS::DynamoDB::Table",
        DeletionPolicy: "Retain",
        Properties: {
          TableName: "${self:provider.environment.USERS_TABLE}",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
      JobsDynamoDBTable: {
        Type: "AWS::DynamoDB::Table",
        DeletionPolicy: "Retain",
        Properties: {
          TableName: "${self:provider.environment.JOBS_TABLE}",
          AttributeDefinitions: [
            {
              AttributeName: "id",
              AttributeType: "S",
            },
          ],
          KeySchema: [
            {
              AttributeName: "id",
              KeyType: "HASH",
            },
          ],
          ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
          },
        },
      },
    },
  },
};

module.exports = serverlessConfiguration;
