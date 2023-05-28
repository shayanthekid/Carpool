

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();

/**

 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}

 */
exports.handler = async (event, context, callback) => {


    // const { Id } = JSON.parse(event.body);

    const reqParams = event.queryStringParameters;

    const id = reqParams["id"] || '';
    // const car_ID = reqParams["car_ID"] || '';
    const params = {

        TableName: 'carpool2',
        Key: {
            id: id,
         
     
        },
        ConditionExpression: 'attribute_exists(id)'

    };
    try {

         await dynamodb.delete(params).promise();
      
        const response = {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(id)
        };
        callback(null, response);

    } catch (error) {

        return {

            statusCode: 500,

            body: JSON.stringify({ message: 'Failed to delete record', error})

        };

    }

}