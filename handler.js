const { SQS } = require("aws-sdk");

const sqs = new SQS();

module.exports.producer = async (event) => {
  let statusCode = 200;
  let message;

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "No body was found"
      })
    };
  }

  try {
    await sqs.sendMessage({
      QueueUrl: process.env.QUEUE_URL,
      MessageBody: event.body
    }).promise();

    message = "Message accepted!";
  } catch (error) {
    console.error(error);
    message = error;
    statusCode = 500;
  }

  return {
    statusCode,
    body: JSON.stringify({
      message
    })
  };
};

module.exports.consumer = async (event) => {
  for (const record of event.Records) {
    console.log("Message Body: ", record.body);
  }
};
