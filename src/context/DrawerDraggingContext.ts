import { createContext } from "react";

const DrawerDraggingContext = createContext({
  isDrawerDragging: false,
  setIsDrawerDragging: (isDragging: boolean) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
});

export default DrawerDraggingContext;
