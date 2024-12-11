const { Kafka } = require("./client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = Kafka.producer();

  console.log("Connecting Producer");

  await producer.connect();
  console.log("Producer Connect Successfully..");

  rl.setPrompt(">");
  rl.prompt();

  rl.on("line", async function (line) {
    const [riderName, location] = line.split(" ");

    // Validate input
    if (!riderName || !location) {
      console.log("Invalid input. Please enter in the format: riderName location");
      rl.prompt();
      return;
    }

    try {
      await producer.send({
        topic: "rider-updated",
        messages: [
          {
            partition: location.toLowerCase() === "north" ? 0 : 1,
            key: "location-update",
            value: JSON.stringify({ name: riderName, loc: location }),
          },
        ],
      });
      console.log(`Message sent: RiderName=${riderName}, Location=${location}`);
    } catch (err) {
      console.error("Error sending message:", err);
    }

    rl.prompt();
  }).on("close", async () => {
    console.log("Closing producer...");
    await producer.disconnect();
    process.exit(0);
  });
}

init();
