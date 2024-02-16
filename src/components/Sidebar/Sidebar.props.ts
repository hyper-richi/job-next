import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SidebarProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  regions?: IRegion[];
  showSidebar: boolean;
  onCloseSidebar: () => void;
  // onContentClick: (e: React.MouseEvent) => void;
  onCloseMobileRegionsModal: () => void;
}
