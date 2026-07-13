import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";

export const TextIconSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
  >
    <path
      d="M1.3125 2.25C1.26094 2.25 1.21875 2.29219 1.21875 2.34375V3C1.21875 3.05156 1.26094 3.09375 1.3125 3.09375H10.6875C10.7391 3.09375 10.7812 3.05156 10.7812 3V2.34375C10.7812 2.29219 10.7391 2.25 10.6875 2.25H1.3125Z"
      fill="black"
      fillOpacity="0.65"
    />
    <path
      d="M1.3125 5.57812C1.26094 5.57812 1.21875 5.62031 1.21875 5.67188V6.32812C1.21875 6.37969 1.26094 6.42188 1.3125 6.42188H10.6875C10.7391 6.42188 10.7812 6.37969 10.7812 6.32812V5.67188C10.7812 5.62031 10.7391 5.57812 10.6875 5.57812H1.3125Z"
      fill="black"
      fillOpacity="0.65"
    />
    <path
      d="M1.3125 8.90625C1.26094 8.90625 1.21875 8.94844 1.21875 9V9.65625C1.21875 9.70781 1.26094 9.75 1.3125 9.75H7.6875C7.73906 9.75 7.78125 9.70781 7.78125 9.65625V9C7.78125 8.94844 7.73906 8.90625 7.6875 8.90625H1.3125Z"
      fill="black"
      fillOpacity="0.65"
    />
  </svg>
);

export const TextIcon = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={TextIconSvg} {...props} />
);
