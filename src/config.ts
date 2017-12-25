import ModelConfigSchema, {
  defaultConfig as defaultModelConfig
} from './model/ConfigSchema';
import PhoenixConfigSchema, {
  defaultConfig as defaultPhoenixConfig
} from './phoenix/ConfigSchema';

interface ConfigScheme extends ModelConfigSchema, PhoenixConfigSchema {}

const CONFIG: ConfigScheme = Object.assign(
  {},
  defaultModelConfig,
  defaultPhoenixConfig,
  {
    DEBUG_ENABLED: true,
  }
);

export default CONFIG;
