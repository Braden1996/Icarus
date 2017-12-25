export default interface ConfigSchema {
  DEBUG_JSON_SPACE: string | number;
}

export const defaultConfig: ConfigSchema = {
  DEBUG_JSON_SPACE: 2,
}
