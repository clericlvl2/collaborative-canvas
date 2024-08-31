import config from "./config/env.js";
import app from "./server.js";

const PORT = config.port;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));