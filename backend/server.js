const app = require("./src/app");
const connectDB = require("./src/db/db");
const setupCronJobs = require("./src/cron/reminder.cron");

connectDB();
setupCronJobs();

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
