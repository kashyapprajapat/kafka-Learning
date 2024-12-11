require('dotenv').config(); // Load environment variables from .env file
const { Kafka } = require("kafkajs");

const brokerIp = process.env.KAFKA_BROKER_IP;

if (!brokerIp) {
  console.error("Error: KAFKA_BROKER_IP environment variable is not set.");
  process.exit(1);
}

exports.Kafka = new Kafka({
  clientId: 'kafkalearning',
  brokers: [`${brokerIp}:9092`],
});
