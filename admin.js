const { Kafka } = require("./client");



async function init() {
    const admin = Kafka.admin();
    console.log("Admin Connecting....");
    admin.connect();
    console.log("Admin Connection Sucessfully..");

   console.log('Creating Topics: [rider-updated]');
   await admin.createTopics({
        topics:[{
            topic: "rider-updated",         // Topic name 
            numPartitions:2,               // North India & South India
        }]
    })

    console.log('Topics Created: [rider-updated]');
    
    
    //disconnect the Admin
    await admin.disconnect();
    console.log("Admin discoonet succesfully.")

}

init();