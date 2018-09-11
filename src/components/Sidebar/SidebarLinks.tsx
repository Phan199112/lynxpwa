import * as React from 'react';
import { default as GridOnIcon } from '@material-ui/icons/GridOn';
import { default as SwapHorzIcon } from '@material-ui/icons/SwapHoriz';
import VerticalNav, { ItemType } from '../VerticalNav';
import { ColorKeysType } from '../../styles/colors';

const items: ItemType[] = [
  { name: 'Redir DB', icon: SwapHorzIcon, path: '/databases' },
  { name: 'Referrals', icon: GridOnIcon, path: '/referrals' },
];

type PropsType = { isMiniActive?: boolean, color: ColorKeysType };

const SidebarLinks = (props: PropsType) => (
  <VerticalNav {...props} items={items} />
);

export default SidebarLinks;
