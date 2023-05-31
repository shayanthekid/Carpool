
const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    try {
        const { id, brand, car_Name, year, price, seatLayout, exteriorColor, interiorColor, wheels, carImageUrl, keyFeatures } = JSON.parse(event.body);

        const params = {
            TableName: 'carpool2',
            Item: {
                id: id,
                brand: brand,
                car_Name: car_Name,
                year: year,
                price: price,
                seatLayout: seatLayout,
                exteriorColor: exteriorColor,
                interiorColor: interiorColor,
                wheels: wheels,
                carImageUrl: carImageUrl,
                keyFeatures: keyFeatures
            }
        };

        await dynamoDB.put(params).promise();

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Update with your desired domain
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,PUT'
            },
            body: JSON.stringify({ message: 'Car has been updated' })
        };
    } catch (error) {
        console.error('Error updating car details:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*', // Update with your desired domain
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,PUT'
            },
            body: JSON.stringify({ message: error })
        };
    }
};
