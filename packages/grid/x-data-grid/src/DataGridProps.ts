import { GridInputComponentProps } from '../../_modules_/grid/GridComponentProps';

export const MAX_PAGE_SIZE = 100;

/**
 * The grid component react props interface.
 */
export type DataGridProps = Omit<
  GridInputComponentProps,
  | 'apiRef'
  | 'checkboxSelectionVisibleOnly'
  | 'disableColumnResize'
  | 'disableColumnReorder'
  | 'disableMultipleColumnsFiltering'
  | 'disableMultipleColumnsSorting'
  | 'disableMultipleSelection'
  | 'disableChildrenFiltering'
  | 'disableChildrenSorting'
  | 'disableColumnPinning'
  | 'throttleRowsMs'
  | 'hideFooterRowCount'
  | 'options'
  | 'onRowsScrollEnd'
  | 'scrollEndThreshold'
  | 'pinnedColumns'
  | 'onPinnedColumnsChange'
  | 'treeData'
  | 'getTreeDataPath'
  | 'groupingColDef'
  | 'defaultGroupingExpansionDepth'
  | 'signature'
> & {
  pagination?: true;
};
