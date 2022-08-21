import "reflect-metadata";

import { config as readEnvConfig } from "dotenv";
readEnvConfig();

import { bootstrapGQL } from "./paints/infrastructure/gql";

bootstrapGQL();