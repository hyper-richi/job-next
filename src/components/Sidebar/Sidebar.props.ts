import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { IRegion } from '../../..';

export interface SidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  regions?: IRegion[];
  showSidebar: boolean;
  onCloseSidebar: () => void;
  onCloseMobileRegionsModal: () => void;
}
