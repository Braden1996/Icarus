import ScreenNode from './nodes/ScreenNode';
import WindowNode from './nodes/WindowNode';
import registerAllEvents from './events';

function buildModel() {
  const screenModels = Screen.all().map(aScreen => {
    const screenNode = new ScreenNode(aScreen);

    // It seems that for some apps (e.g. Google Chrome) we detect two windows.
    // We filter these out - perhaps a more robust fix is necessary?
    const actualWindows = aScreen.windows()
      .filter(w => w.isVisible() || w.isMinimized());

    for (let w of actualWindows){
      screenNode.addChild(new WindowNode(w));
    }

    return screenNode;
  });

  return screenModels;
}

export default function initialise() {
  const screenModels = buildModel();
  const screenModel = screenModels[0];
  const allEvents = registerAllEvents(screenModel);
  Phoenix.log(JSON.stringify(screenModels));
}
