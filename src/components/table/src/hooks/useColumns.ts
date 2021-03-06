import { BasicTableProps } from '../types/table';
import { PaginationProps } from '../types/pagination';
import { unref, ComputedRef, computed } from 'compatible-vue';
import { isBoolean } from '@/utils/is/index';
import { PAGE_SIZE } from '../const';

export function useColumns(
  propsRef: ComputedRef<BasicTableProps>,
  getPaginationRef: ComputedRef<false | PaginationProps>
) {
  const getColumnsRef = computed(() => {
    const props = unref(propsRef);
    const {
      columns = [],
      showIndexColumn,
      indexColumnProps,
      ellipsis,
      actionColumn,
      isTreeTable,
    } = props;

    if (showIndexColumn && !isTreeTable) {
      if (!columns) {
        throw new Error('columns is null');
      }
      const hasIndex = columns.find((column) => column.flag === 'INDEX');
      !hasIndex &&
        columns.unshift({
          flag: 'INDEX',
          width: 50,
          title: '序号',
          align: 'center',
          customRender: (text: string, record: any, index: number) => {
            const getPagination = unref(getPaginationRef);
            if (isBoolean(getPagination)) {
              return `${index + 1}`;
            }
            const { current = 1, pageSize = PAGE_SIZE } = getPagination;
            const currentIndex = (current - 1) * pageSize + index + 1;
            return currentIndex;
          },
          ...indexColumnProps,
        });
    }

    if (ellipsis) {
      columns.map((item) => {
        const { key, dataIndex } = item;
        if (!key) {
          item.key = dataIndex;
        }
        if (!isBoolean(item.ellipsis)) {
          Object.assign(item, {
            ellipsis,
          });
        }
      });
    }

    if (actionColumn) {
      const hasIndex = columns.find((column) => column.flag === 'ACTION');
      !hasIndex &&
        columns.push({
          fixed: 'right',
          ...actionColumn,
          flag: 'ACTION',
        });
    }
    return columns;
  });
  return { getColumnsRef };
}
