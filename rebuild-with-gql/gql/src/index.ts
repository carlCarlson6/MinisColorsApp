import "reflect-metadata";

import { config as readEnvConfig } from "dotenv";
readEnvConfig();

import { bootstrap } from "./app/infrastructure/gql";

bootstrap();