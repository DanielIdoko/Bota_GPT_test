import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../db";

const ChatModel = sequelize.define("Chat", {
  instructions: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  input: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export default ChatModel;
