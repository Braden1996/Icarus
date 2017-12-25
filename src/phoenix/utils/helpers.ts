import { ScreenModels } from 'model/utils/QueryModel';
import PhoenixManagedWindow from './ManagedWindow';

export function getFocussedScreen(screenModels: ScreenModels) {
  const focussedScreen = Screen.main();
  if (focussedScreen === undefined) return;
  return screenModels[focussedScreen.hash()];
}

export function getFocussedWindow() {
  const focussedWindow = Window.focused();
  if (focussedWindow === undefined) return;
  return new PhoenixManagedWindow(focussedWindow);
}
