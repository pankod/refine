import type { Express } from "express";
import { SERVER_PORT } from "./constants";
import { bold, cyanBright } from "chalk";
import http from "http";

export const setupServer = (app: Express, onError: () => void) => {
  const server = http.createServer(app);

  server
    .on("error", (error: any) => {
      if (error?.code === "EADDRINUSE") {
        console.error(
          `\n${cyanBright.bold("\u2717 ")}${bold(
            "Refine Devtools server",
          )} (http) failed to start. Port ${SERVER_PORT} is already in use.\n`,
        );
        console.info(
          `${cyanBright.bold(
            "\u2139 ",
          )}You can change the port by setting the ${bold(
            "REFINE_DEVTOOLS_PORT",
          )} environment variable.`,
        );
      } else {
        console.error(
          `\n${cyanBright.bold("\u2717 ")}${bold(
            "error from Refine Devtools",
          )}`,
          error,
        );
      }
      server.close(() => {
        if (__DEVELOPMENT__) {
          console.log("Process terminated");
        }
      });
      onError();
    })
    .on("listening", () => {
      console.log(
        `\n${cyanBright.bold("\u2713 ")}${bold(
          "Refine Devtools",
        )} is running at port ${cyanBright.bold(SERVER_PORT)}\n`,
      );
    });

  process.on("SIGTERM", () => {
    server.close(() => {
      if (__DEVELOPMENT__) {
        console.log("Process terminated");
      }
    });
  });

  server.listen(SERVER_PORT, undefined, undefined, () => {
    if (__DEVELOPMENT__) {
      console.log(`Server started on PORT ${SERVER_PORT}`);
    }
  });

  return server;
};
