import "reflect-metadata";
import { config as readEnvConfig } from "dotenv";
import { bootstrapGQL } from "./infrastructure/gql";

readEnvConfig();
bootstrapGQL();