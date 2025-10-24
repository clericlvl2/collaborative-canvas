import Config from "./config/env";
import app from "./server";

const PORT: number = Config.Port.Api;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});