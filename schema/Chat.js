import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../database/db.js";

const ChatModel = sequelize.define("Chat", {
  instructions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  input: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  aiResponse: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default ChatModel;
