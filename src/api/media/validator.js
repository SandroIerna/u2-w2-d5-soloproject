import { checkSchema, validationResult } from "express-validator";
import createHttpError from "http-errors";

const mediaSchema = {
  title: {
    in: ["body"],
    isString: { errorMessage: "Title is required & should be a string" },
  },
  year: {
    in: ["body"],
    isNumeric: { errorMessage: "Year is required & should be a number" },
  },
  type: {
    in: ["body"],
    isString: { errorMessage: "Type is required & should be a string" },
  },
  poster: {
    in: ["body"],
    isString: { errorMessage: "Poster is required & should be a string" },
  },
};

export const checkMediaSchema = checkSchema(mediaSchema);

export const detectBadRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    next(createHttpError(400, "Not found", { errorsList: errors.array() }));
  }
};
