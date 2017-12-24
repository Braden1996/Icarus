import ModelConfigSchema, {
  defaultConfig as defaultModelConfig
} from "../model/utils/ConfigSchema";

export default interface ConfigSchema extends ModelConfigSchema {
  DEBUG_ENABLED: boolean;
  DEBUG_JSON_SPACE: string | number;
}

export const defaultConfig: ConfigSchema =
  Object.assign({}, defaultModelConfig, {
    DEBUG_ENABLED: false,
    DEBUG_JSON_SPACE: 2,
  });
