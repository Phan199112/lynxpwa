import hoc from './hoc';
import component from './component';
import { ItemType as MiniItemType } from './CollapsibleNav/MiniNavLinks';

export type ItemType = {
  name: string,
  image?: string,
  path?: string,
  icon?: React.ComponentType,
  subNavItems?: MiniItemType[],
};

export {
  hoc as default,
  component,
};
