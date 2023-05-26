


const AWS = require('aws-sdk');

const dynamoDB = new AWS.DynamoDB.DocumentClient();
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async (event) => {
    // Add CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    };

    // Check if the request is an OPTIONS preflight request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: headers,
        };
    }

    // Rest of your code to retrieve cars from DynamoDB
    const params = {
        TableName: 'carpool',
    };

    try {
        const result = await dynamoDB.scan(params).promise();

        if (result.Items && result.Items.length > 0) {
            return {
                statusCode: 200,
                headers: headers,
                body: JSON.stringify(result.Items),
            };
        } else {
            return {
                statusCode: 404,
                headers: headers,
                body: JSON.stringify({ message: 'No cars found' }),
            };
        }
    } catch (error) {
        console.error('Error retrieving cars:', error);

        const errorMessage = 'Failed to retrieve cars';

        return {
            statusCode: 500,
            headers: headers,
            body: JSON.stringify({ message: errorMessage, error: error.stack }),
        }
    }
};