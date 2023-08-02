/**
 * Retrieves the option from the options object or from an environment variable. If neither is available, the default value is returned.
 * @param options - The options object that may contain the option value.
 * @param optionName - The name of the option in the options object.
 * @param envVarName - The name of the environment variable that may contain the option value.
 * @param defaultValue - The default value to return if the option is not found in options or environment variables.
 * @returns The value of the option retrieved from the options object or environment variable, or the default value if neither is available.
 */
export const getOptionOrEnv = (
  options: any,
  optionName: string,
  envVarName: string,
  defaultValue: string | number | null
) => {
  if (
    optionName in options &&
    typeof options[optionName] === "string" &&
    options[optionName] !== ""
  ) {
    return options[optionName] ?? process.env[envVarName];
  } else if (process.env[envVarName] != undefined) {
    return process.env[envVarName];
  } else {
    return defaultValue;
  }
}

/**
 * Exits the process with an error message if the given value is null or undefined.
 * @param value - The value to check.
 * @param errorMessage - The error message to print before exiting the process.
 */
export const exitIfNull = (value: any, errorMessage: string) => {
  if (!value) {
    console.error(errorMessage);
    process.exit(1);
  }
}
