import type {
  FilterDropdownProps,
  MapValueEvent,
} from "../../components/table/components";
import dayjs from "dayjs";

/**
 * It is a mapper function for the <DatePicker.RangePicker /> filter.
 * when the `event` is:
 * - `"value"`: It converts the `selectedKeys` to Dayjs objects to be used in the `<DatePicker.RangePicker />` component.
 * - `"onChange"`, It converts the Dayjs objects to ISO 8601 string format to be used in the Refine(data-provider, syncWithLocation etc.) filter.
 * @see {@link https://refine.dev/docs/ui-integrations/ant-design/components/filter-dropdown/#rangepickerfiltermapper} for more details.
 * @example
 * ```tsx
 * <Table.Column
 *   dataIndex="createdAt"
 *   title="Date & Time"
 *   filterDropdown={(props) => (
 *     <FilterDropdown
 *       {...props}
 *       mapValue={(selectedKeys, event) => {
 *         return rangePickerFilterMapper(selectedKeys, event);
 *       }}
 *     >
 *       <DatePicker.RangePicker />
 *     </FilterDropdown>
 *   )}
 * />
 * ```
 */
export const rangePickerFilterMapper = (
  selectedKeys: FilterDropdownProps["selectedKeys"],
  event: MapValueEvent,
) => {
  if (!selectedKeys) {
    return selectedKeys;
  }

  if (event === "value") {
    return selectedKeys.map((key) => {
      if (typeof key === "string") {
        return dayjs(key);
      }

      return key;
    });
  }

  if (event === "onChange") {
    if (selectedKeys.every(dayjs.isDayjs)) {
      return selectedKeys.map((date: any) => dayjs(date).toISOString());
    }
  }

  return selectedKeys;
};
