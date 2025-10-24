import express, { urlencoded, json } from "express";
import { routes } from "./routes/index-with-swagger.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());

routes(app);

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Butikk API",
      description: "Swagger dokumentasjon av nettbutikken.",
      contact: {
        name: "NN",
      },
      servers: [`http://localhost:3030`],
    },
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(3030, () => {
  console.log(`Lytter på http://localhost:3030`);
});
