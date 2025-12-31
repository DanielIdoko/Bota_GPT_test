import { Sequelize } from "sequelize";
import { DB_PASSWORD, DB_USERNAME } from "../config/env.js";

export const sequelize = new Sequelize("customer_service_db", DB_USERNAME, DB_PASSWORD, {
  host: "localhost",
  dialect: "postgres",
});

export const connectToDB = async () => {
  try {
    await sequelize.sync();
    console.log("Successfully connected to database");
  } catch (error) {
    console.error(error || "Unable to connect to the database");
  }
};
