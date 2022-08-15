import "reflect-metadata";

import { config as readEnvConfig } from "dotenv";
readEnvConfig();

import { bootstrap } from "./paints/infrastructure/gql";

bootstrap();