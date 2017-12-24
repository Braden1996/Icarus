import ConfigSchema, { defaultConfig } from './utils/ConfigSchema';

const CONFIG: ConfigSchema = Object.assign({}, defaultConfig, {
  DEBUG_ENABLED: true,
});

export default CONFIG;
