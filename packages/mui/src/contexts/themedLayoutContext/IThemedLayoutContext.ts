export interface IThemedLayoutContext {
  siderCollapsed: boolean;
  setSiderCollapsed: (visible: boolean) => void;
  mobileSiderOpen: boolean;
  setMobileSiderOpen: (visible: boolean) => void;
  onSiderCollapsed?: (collapsed: boolean) => void;
}
