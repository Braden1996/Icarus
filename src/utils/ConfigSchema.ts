import ModelConfigSchema, {
  defaultConfig as defaultModelConfig
} from "../model/utils/ConfigSchema";

export default interface ConfigSchema extends ModelConfigSchema {
  DEBUG_ENABLED: boolean;
}

export const defaultConfig: ModelConfigSchema = Object.assign({
  DEBUG_ENABLED: false,
}, defaultModelConfig);
