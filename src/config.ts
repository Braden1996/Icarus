import ConfigSchema, { defaultConfig } from './model/ConfigSchema';

const CONFIG: ConfigSchema = Object.assign({}, defaultConfig, {
  DEBUG_ENABLED: true,
});

export default CONFIG;
