import ScreenNode from './nodes/ScreenNode';
import WindowNode from './nodes/WindowNode';
import registerAllEvents from './events';
import registerAllInput from './input';
import { windowAdd } from './events/common';

function buildModel() {
  const screenModels = Screen.all().map(aScreen => {
    const screenNode = new ScreenNode(aScreen);

    for (let w of aScreen.windows()){
      windowAdd(screenNode, w);
    }

    return screenNode;
  });

  return screenModels;
}

export default function initialise() {
  const screenModels = buildModel();
  const screenModel = screenModels[0];
  const allEvents = registerAllEvents(screenModel);
  const allInput = registerAllInput(screenModel);
  Phoenix.log(JSON.stringify(screenModels));
}
