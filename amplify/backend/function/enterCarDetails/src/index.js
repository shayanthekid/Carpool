
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const dynamoDB = new AWS.DynamoDB.DocumentClient();
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

exports.handler = async (event) => {
    
    try {

        const Car = JSON.parse(event.body);

        const params = {

            TableName: 'carpool',
            Item: Car
        };
        await dynamoDB.put(params).promise();

        return {

            statusCode: 200,

            body: JSON.stringify({ message: 'Car has been added' })

        };

    } catch (error) {

        console.error('Error adding car details:', error);

        return {

            statusCode: 500,

            body: JSON.stringify({ message: error })

        };

    }
};
