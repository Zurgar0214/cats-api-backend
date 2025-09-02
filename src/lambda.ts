import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { bootstrapServer } from './main';

let cachedServer: any;

export const handler = async (event: APIGatewayProxyEvent, context: Context) => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return cachedServer(event, context);
};