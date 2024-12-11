import { NextFunction, Request, Response } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  const methodColor = "\x1b[34m";
  const urlColor = "\x1b[32m";
  const resetColor = "\x1b[0m";

  console.log(
    `${methodColor}${req.method}${resetColor} ${urlColor}${req.url}${resetColor}`
  );

  next();
};

export default logger;