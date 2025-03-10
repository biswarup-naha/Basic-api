import app from "./src/app.js";

const PORT=process.env.PORT || 3000;
(
    function () {
        try {
            app.listen(PORT, () => console.log(`server is running on: http://localhost:${PORT}/api/v1`));
        } catch (error) {
            console.log(error);
        }
    }
)();