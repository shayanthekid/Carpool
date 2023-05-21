const AWS = require('aws-sdk');
var s3 = new AWS.S3();
/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

//*/ get reference to S3 client 
exports.handler = (event, context, callback) => {
    let encodedImage = JSON.parse(event.body).user_avatar;
    let decodedImage = Buffer.from(encodedImage, 'base64');
    var filePath = "avatars/" + event.queryStringParameters.username + ".jpg"
    var params = {
        "Body": decodedImage,
        "Bucket": "carimages185911-sajiddesk",
        "Key": filePath
    };
    s3.upload(params, function (err, data) {
        if (err) {
            callback(err, null);
        } else {
            let response = {
                "statusCode": 200,
                "headers": {
                    "my_header": "my_value"
                },
                "body": JSON.stringify(data),
                "isBase64Encoded": false
            };
            callback(null, response);
        }
    });

};


