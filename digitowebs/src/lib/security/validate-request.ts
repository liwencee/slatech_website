import { NextRequest } from "next/server";
import { ZodSchema, ZodError, ZodIssue } from "zod";

type ValidationSuccess<T> = { success: true; data: T };
type ValidationError = { success: false; errors: ZodIssue[] };
type ValidationResult<T> = ValidationSuccess<T> | ValidationError;

export async function validateRequestBody<T>(
  request: NextRequest,
  schema: ZodSchema<T>
): Promise<ValidationResult<T>> {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    return { success: true, data };
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, errors: error.issues };
    }
    return {
      success: false,
      errors: [
        {
          code: "custom",
          message: "Invalid request body",
          path: [],
        },
      ],
    };
  }
}

export function validateQueryParams<T>(
  searchParams: URLSearchParams,
  schema: ZodSchema<T>
): ValidationResult<T> {
  try {
    const params = Object.fromEntries(searchParams.entries());
    const data = schema.parse(params);
    return { success: true, data };
  } catch (error) {
    if (error instanceof ZodError) {
      return { success: false, errors: error.issues };
    }
    return {
      success: false,
      errors: [
        {
          code: "custom",
          message: "Invalid query parameters",
          path: [],
        },
      ],
    };
  }
}
