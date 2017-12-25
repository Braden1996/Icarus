import debug from './utils/debug';
import ModelConfigSchema from 'model/ConfigSchema';

export default interface ConfigSchema {
  DEBUG: ModelConfigSchema['DEBUG'];
  DEBUG_JSON_SPACE: string | number;
}

export const defaultConfig: ConfigSchema = {
  DEBUG: debug,
  DEBUG_JSON_SPACE: 2,
}
