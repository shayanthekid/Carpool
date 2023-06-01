
const AWS = require('aws-sdk');
const mysql = require('mysql');
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const rdsHost = 'cardb.cjtxlmmgnofq.us-east-1.rds.amazonaws.com';
const dbUsername = 'admin';
const dbPassword = 'admin123';


function retrieveInventoryData() {
    const connection = mysql.createConnection({
        host: rdsHost,
        user: dbUsername,
        password: dbPassword,
    });
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM car_schema.Inventory ORDER BY idInventory DESC', (error, results) => {
            if (error) {
               reject(error);
            } else {
                resolve(results);
            }
            connection.end();
        });
    });
}


exports.handler = async () => {
    try {
        const inventoryData = await retrieveInventoryData();  
        let report = 'Icars Inventory Report:\n\n';

        inventoryData.forEach((item) => {
            report += `ID: ${item.idInventory}\n`;
            report += `Name: ${item.Name}\n`;
            report += `Quantity: ${item.Quantity}\n`;
            report += `Price: ${item.Price}\n`;
        });

        const sns = new AWS.SNS();
        const params = {
            TopicArn: 'arn:aws:sns:us-east-1:529836752143:carpoolReport',
            Subject: 'Icars report',
            Message: report

        }

        await sns.publish(params).promise();
        return {

           statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*', // Update with your desired domain
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST'
            },
            body: JSON.stringify({ message: 'success' })

        };

    } catch (error) {

        console.error('Error generating and sending inventory report:', error);
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*', // Update with your desired domain
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'OPTIONS,POST'
            },
            body: JSON.stringify({ message: error })

        };

    }

};
