import ConfigSchema, { defaultConfig } from './utils/ConfigSchema';

const CONFIG: ConfigSchema = Object.assign({
  DEBUG_ENABLED: true,
}, defaultConfig);

export default CONFIG;
