

const AWS = require('aws-sdk');
/**

 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}

 */
exports.handler = async (event, context, callback) => {

     const dynamodb = new AWS.DynamoDB.DocumentClient();

    // const { Id } = JSON.parse(event.body);

    const reqParams = event.queryStringParameters;

    const car_Name = reqParams["car_Name"];
    const params = {

        TableName: 'carpool',
        Key: {
            car_Name: car_Name,
        },

    };
    try {

        await dynamodb.delete(params).promise();
      
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify("Record deleted successfully")
        };
        callback(null, response);

    } catch (error) {

        return {

            statusCode: 500,

            body: JSON.stringify({ message: 'Failed to delete record' })

        };

    }

}