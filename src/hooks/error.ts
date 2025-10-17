import { useEffect } from "react";
import toast from "react-hot-toast";

interface UseErrorProps {
  error: unknown;
  isError: boolean;
  entity?: string;
  operation?: string;
  cb?: () => void;
}

// Helper function to get user-friendly error messages
const getErrorMessage = (
  error: unknown,
  entity?: string,
  operation?: string
): string => {
  if (!error) return "Something went wrong. Please try again.";

  // Type guard to check if error has expected properties
  const errorObj = error as {
    message?: string;
    status?: number;
    response?: {
      status?: number;
      statusText?: string;
      data?: { message?: string; error?: string };
    };
  };

  // Check response status first
  const status = errorObj.status || errorObj.response?.status;
  const responseMessage =
    errorObj.response?.data?.message || errorObj.response?.data?.error;
  const message = errorObj.message || responseMessage;

  // Network/Connection errors
  if (
    message?.toLowerCase().includes("fetch") ||
    message?.toLowerCase().includes("network")
  ) {
    return "Unable to connect to the server. Please check your internet connection.";
  }

  // API rate limit errors (429 or 403)
  if (
    status === 429 ||
    status === 403 ||
    message?.toLowerCase().includes("rate limit")
  ) {
    return "Too many requests. Please wait a moment and try again.";
  }

  // Authentication errors (401)
  if (status === 401 || message?.toLowerCase().includes("unauthorized")) {
    return "Authentication failed. Please refresh the page and try again.";
  }

  // Not found errors (404)
  if (status === 404) {
    const entityName = entity || "content";
    return `The requested ${entityName} was not found.`;
  }

  // Server errors (5xx)
  if (status && status >= 500) {
    return "Server is temporarily unavailable. Please try again later.";
  }

  // Bad request errors (400)
  if (status === 400) {
    return message || "Invalid request. Please check your input and try again.";
  }

  // Search specific errors
  if (operation === "search" || message?.toLowerCase().includes("search")) {
    return "Search failed. Please try a different search term.";
  }

  // Load specific errors
  if (operation === "load" || operation === "fetch") {
    const entityName = entity || "data";
    return `Failed to load ${entityName}. Please try again.`;
  }

  // Upload specific errors
  if (operation === "upload") {
    return "Upload failed. Please check your file and try again.";
  }

  // Delete specific errors
  if (operation === "delete") {
    const entityName = entity || "item";
    return `Failed to delete ${entityName}. Please try again.`;
  }

  // Update specific errors
  if (operation === "update") {
    const entityName = entity || "item";
    return `Failed to update ${entityName}. Please try again.`;
  }

  // Create specific errors
  if (operation === "create") {
    const entityName = entity || "item";
    return `Failed to create ${entityName}. Please try again.`;
  }

  // Generic error message with custom message if available
  return message || "Something went wrong. Please try again.";
};

const useError = ({ error, isError, entity, operation, cb }: UseErrorProps) => {
  useEffect(() => {
    if (isError && error) {
      const errorMessage = getErrorMessage(error, entity, operation);

      // Show error toast
      toast.error(errorMessage);

      // Log error for debugging
      console.error(`Error in ${operation || "operation"}:`, error);

      // Execute callback if provided
      if (cb) {
        cb();
      }
    }
  }, [error, isError, entity, operation, cb]);
};

export default useError;
