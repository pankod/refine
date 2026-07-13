---
title: How to implement a date picker in React
description: We’ll show you how to implement a date picker using the ‘react-datepicker’ library and how to customize the functionality for your use case.
slug: react-date-picker
authors: irakli_tchigladze
category: "Ecosystem / Integrations"
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-03-react-date-picker/social-2.png
hide_table_of_contents: false
last_update: 2024-11-13
---

**This article was last updated on November 12, 2024, to add sections for Accessibility Considerations, Internationalization and Localization, Performance Optimization, and Testing Date Pickers.**

## Introduction

Having a date picker that is simple, intuitive and consistent may be necessary to ensure users have a good experience using your web application.

Building a date picker in React is more difficult than it looks. Even a simple calendar that lets users choose a date is fairly difficult to build from scratch. Task gets especially difficult when you want to include advanced features like selecting a range of dates.

Fortunately, the React community has come up with various libraries that provide easy-to-use, customizable, and consistent date pickers for your projects.

In this article, we’ll show you how to implement a date picker using the ‘react-datepicker’ library and how to customize the date picker’s appearance and functionality for your use case.

[`react-datepicker`](https://www.npmjs.com/package/react-datepicker) is a lightweight library with a lot of features.

To build a simple React date picker, all you need to do is import the custom component and set two props. Advanced features require only a little more time.

## Create a Datepicker

### Setup

In this article, we’ll use **react-datepicker** in a live environment CodeSandbox.

You can use npm to install the package in an existing project:

```shell
npm install react-datepicker
```

Once installed, import the custom **DatePicker** component in the file where you want to use it.

```tsx
import DatePicker from "react-datepicker";
```

You also need to import CSS styles to display elements in all their beauty.

```tsx
import "react-datepicker/dist/react-datepicker.css";
```

### Create a basic date picker

**DatePicker** is a controlled component. In other words, the selected date is stored in the state and the date picker gets its value from the state. So we need to initialize the state.

In class components, we initialize a state object and use the **setState()** method to update it.

In functional components, we have the **useState()** hook that creates a state variable and the function to update it. In this case, a state variable will hold the selected date.

The **react-datepicker** library exports a custom component by default. When you import it, you can choose any name you want. In this case, we named it **DatePicker**.

Every **DatePicker** component must have at least two props to work:

1. **selected** - set to the selected date, stored in the state. It is similar to **value** prop on `**<input>**` elements.
2. **onChange** - set to a callback function with one argument, which stands for the date selected by the user. The function body should call the updater function returned by the **useState** hook to update the state.

```tsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
export default function App() {
  const [date, setDate] = useState(new Date());
  return (
    <div>
      <DatePicker selected={date} onChange={(date) => setDate(date)} />
    </div>
  );
}
```

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-03-react-date-picker/first.gif" alt="Date picker basic selection" />

<br/>

As simple as that, users can select a date. Try it yourself on [CodeSandbox](https://codesandbox.io/s/white-fast-3ewybj?file=/src/App.js).

## Implement Common Features

### Set initial date

In class components, you set a default date when the state object is initialized.

In functional components, we can set a default date by passing a date value as an argument to the **useState()** hook. For example, **useState(new Date())** will set it to today (the current date).

Sometimes it’s better to have no default date at all. You can add a placeholder text to help users pick the right date. Simply set the **placeholderText** prop on the custom component.

When the user picks a date, the **onChange** event handler will update the state.

### Select a range of dates

Selecting a range of dates is a very common and useful feature - for booking accommodation, a round-trip, or any other purpose.

#### Select range within one component

By default, one DatePicker component selects a single date value.

```tsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
export default function App() {
  const [date, setDate] = useState(new Date());
  return (
    <div>
      <DatePicker selected={date} onChange={(date) => setDate(date)} />
    </div>
  );
}
```

You can modify the event handler to select a range of dates. The function will accept an array of two values - **startDate** and **endDate** and select the dates between them.

So far we’ve only created one state variable. So our component is not equipped to store two dates. We need to create new **startDate** and **endDate** state variables to store the beginning and end of the range of dates. We’ll also create functions to update them.

```tsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
export default function App() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  return (
    <div>
      <DatePicker selected={date} onChange={(date) => setDate(date)} />
    </div>
  );
}
```

We’ll need to change the event handler as well. When users select a range of values, the argument passed to the function won’t be a single value - but an array of two dates.

We need to destructure the array to get both the start and end of the range. Then we can update their corresponding state variables.

```tsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";

export default function App() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleChange = (range) => {
    const [startDate, endDate] = range;
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <div>
      <DatePicker selected={date} onChange={handleChange} />
    </div>
  );
}
```

When selecting a single date, it was possible to write an inline event handler, like so:

```tsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";
export default function App() {
  const [date, setDate] = useState(new Date());
  return (
    <div>
      <DatePicker selected={date} onChange={(date) => setDate(date)} />
    </div>
  );
}
```

Selecting a range of dates makes **handleChange** a bit more complex, so it can’t be an inline event handler. You’ll need to define it outside the tsx and reference it as the value of the **onChange** prop.

```tsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";

export default function App() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleChange = (range) => {
    const [startDate, endDate] = range;
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <div>
      <DatePicker selected={date} onChange={handleChange} />
    </div>
  );
}
```

Next, we need to add **startDate**, **endDate**, and **selectsRange** props to the custom component.

Set **startDate** and **endDate** props to their respective state values. **selectsRange** is simply a boolean prop.

```tsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";

export default function App() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const handleChange = (range) => {
    const [startDate, endDate] = range;
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
      />
    </div>
  );
}
```

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-03-react-date-picker/select_range%20.gif" alt="Date range selection" />

<br/>

#### Using two separate components

You can also use two DatePicker components to select the range. One component will select the start, and another the end.

We still need to create state variables **startDate** and **endDate**.

Let’s say the first component selects a start date. Set the **selectsStart** prop to specify its purpose. Set **selected** and **startDate** props to values from the state, and **onChange** to a simple handler that updates the **startDate** state variable.

```tsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";

export default function App() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  return (
    <div>
      <DatePicker
        selectsStart
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        startDate={startDate}
      />
    </div>
  );
}
```

Next, we need a second **DatePicker** component with a **selectsEnd** prop to specify that it selects the end of the range.

The component should get its values from the state. So **selected** and **endDate** props should be set to the **endDate** state variable.
The **onChange** function should update the **endDate** state variable.

```tsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";

export default function App() {
  const [date, setDate] = useState(new Date());
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  return (
    <div>
      <DatePicker
        selectsStart
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        startDate={startDate}
      />
      <DatePicker
        selectsEnd
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        endDate={endDate}
        startDate={startDate}
        minDate={startDate}
      />
    </div>
  );
}
```

The React date picker that selects the end should have a **startDate** prop as well.

Also, have the **minDate** prop set to the start date. This will ensure that users can’t select an end date that comes earlier than the start date.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-03-react-date-picker/two-datepickers.png" alt="Two date pickers for range" />

<br/>

### Select time

Allow users to select both date and time by adding the **showTimeSelect** prop to your DatePicker.

This could be a useful use case for booking appointments or meetings.

**showTimeSelect** will allow users to select time intervals (9:00, 9:30, 10:00, etc). Set the **timeIntervals** prop to show 15-minute or 5-minute intervals instead.

**minTime** and **maxTime** props allow you to disable times before or after a certain time.

For example, set **minTime** to 12:30, and **maxTime** to 19:00. Users will only be able to select times from 12:30 to 7 pm.

```tsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";

export default function App() {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <DatePicker
        showTimeSelect
        minTime={new Date(0, 0, 0, 12, 30)}
        maxTime={new Date(0, 0, 0, 19, 0)}
        selected={date}
        onChange={(date) => setDate(date)}
      />
    </div>
  );
}
```

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-03-react-date-picker/time-mintime.png" alt="Date and time selection with min and max" />

<br/>

Set the **dateFormat** prop to display both date and time within the field.

For example:

```tsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";

export default function App() {
  const [date, setDate] = useState(new Date());

  return (
    <div>
      <DatePicker
        showTimeSelect
        minTime={new Date(0, 0, 0, 12, 30)}
        maxTime={new Date(0, 0, 0, 19, 0)}
        selected={date}
        onChange={(date) => setDate(date)}
        dateFormat="MMMM d, yyyy h:mmaa"
      />
    </div>
  );
}
```

If you want users to enter their own time instead of selecting it, replace the **showTimeSelect** with the **showTimeInput** boolean prop.

### Conditionally disable dates

Use **filterDate** prop to conditionally disable dates in the calendar. Set its value to a callback function that returns a condition.

Users will be able to select only dates that meet the condition. Dates that do not meet the condition will be disabled.

For example, here’s a function that returns **false** for dates less than (earlier than) today, and **true** for higher (later) dates.

You can similarly check if the date is a weekend, a weekday, or a holiday, or disable dates based on any other condition.

```tsx
import React, { useState } from "react";
import DatePicker from "react-datepicker";

export default function App() {
  const [date, setDate] = useState(new Date());

  const weekend = (date) => new Date() < date;

  return (
    <div>
      <DatePicker
        showTimeSelect
        filterDate={weekend}
        selected={date}
        onChange={(date) => setDate(date)}
      />
    </div>
  );
}
```

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-03-react-date-picker/disable_dates.png" alt="Disabled dates example" />

<br/>

For example, you might want to disable past dates so users can’t select them when booking accommodation or flights.

You can also use **minDate** and **maxDate** props to disable all dates before or after a certain date.

**filterTime** prop allows you to conditionally disable time values. For example, disable out-of-office hours.

### Other options

Let’s see how to implement various other features.

#### className

You can set **className** to customize the appearance of the custom DatePicker component.

#### calendarClassName

You can use the **calendarClassName** prop to customize the appearance of the calendar itself. Increase font size, padding, background color, etc.

#### highlightDates

Set the **highlightDates** prop to an array of date values that should be highlighted.

#### isClearable

Simply add the **isClearable** prop to the date picker to display a button to reset the selected date.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-03-react-date-picker/is_clearable.png" alt="Clearable date picker control" />

<br/>

#### locale

Use the **locale** prop to specify the date locale. For example, use English (British) instead of the default US locale.

#### dayClassName

**dayClassName** prop allows you to customize the appearance of each day in the calendar.

You can pass it a callback function that returns a ternary operator. **dayClassName** will apply the className only if the day meets a condition.

#### timeClassName

This prop allows you to customize the appearance of time selections.

Set the **timeClassName** prop to a callback function that returns a ternary operator. It will apply the **className** value if the time meets a condition.

#### dateFormat

The value of the **dateFormat** prop specifies the format of date values.

#### minDate

Set the minimum date, all dates earlier than **minDate** will be disabled.

#### excludeDates

Set **excludeDates** prop to an array of date values that should be excluded. All other dates will be included.

#### includeDates

Set **includeDates** prop to an array of date values that should be included. All other dates will be excluded.

#### excludeDateIntervals

Set the value of the **excludeDateIntervals** prop to an array of objects with two properties: **start** and **end**. The array can have multiple intervals. All dates outside of intervals will be included.

#### includeDateIntervals

Just like the previous prop, the value of **includeDateIntervals** should be an array of objects (intervals) with two properties: **start** and **end**.

Date intervals specified in the array will be included. All dates outside of these intervals will be disabled.

#### disabled

Add this boolean prop to disable your datepicker. It works similarly to HTML elements’ **disabled** attribute.

#### shouldCloseOnSelect

By default, the calendar closes when the user selects a date. If you want the calendar to stay open, set the **shouldCloseOnSelect** prop to true.

#### showMonthDropdown and showYearDropdown

Sometimes users need to select dates far ahead of time. **showMonthDropdown** and **showYearDropdown** props allow users to select dates from specific months or years in the future.

#### showMonthYearPicker

Allow users to pick months and years instead of specific dates.

#### monthsShown

By default, a date picker shows a calendar where users can select a date. Use the **monthsShown** prop to specify the number of months that should display simultaneously. For example, setting **monthsShown** to 3 will allow users to select dates (or ranges) from 90 days.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog-yearly/2023/2023-05-03-react-date-picker/monthsshown.png" alt="Multiple months displayed" />

<br/>

## Accessibility Considerations

I just wanted to share a few thoughts on how to make our date picker implementation accessible for all users. Accessibility is key, and here are a few key things we should bear in mind:

### Keyboard Navigation

- Ensure that the date picker is browsable and selectable using a keyboard, which in turn shall include browsing of dates by arrow keys, selection of date by pressing Enter, and closing the date picker by pressing Esc.
- Proper focus management should be ensured so that the date picker is an active element when open and on closing, the focus should get back to the element which triggers it.

### ARIA Attributes

- Use ARIA attributes like `aria-label` for buttons, `role="dialog"` on the date picker container, and `aria-live` on content that is dynamically updated.
- Ensure each date cell contains an `aria-label` that describes the date, for example, "July 17, 2024".

### Screen Reader Support

- Make sure the date picker is correctly announced by screen readers, with proper instruction and feedback on interaction.
- Tested with popular screen readers like JAWS, NVDA, and VoiceOver.

### High Contrast Mode

- Ensure that the date picker can be seen and used properly when in high contrast mode. This is especially of value to a visually impaired user.
- Test with Windows High Contrast mode and its counterparts in other operating systems.

### Color Contrast

- Ensure the presence of enough color contrast between elements such as text and interactive components. Contrast ratio should meet WCAG guidelines, while at the minimum, normal text should have a 4.5:1 contrast ratio.
- Make use of tools such as the Chrome DevTools Accessibility Pane or contrast checkers to verify online.

### Responsive Design

- Ensure that the date picker is usable on every screen size, from the smallest mobile screen to a large tablet. Tap-target sizes and hit areas need to be decently sized.
- Test on multiple devices and orientations for an acceptable experience.

### Clear Instructions

- Offer clear error messages and instructions. If a user has made an invalid selection, such as choosing an invalid date, explain to them the reason it's invalid and how to correct the mistake.
- It may guide users with inline instructions or tooltips about how to select a date.

With these accessibility features, we can be sure that the date picker accommodates each and every one, regardless of their abilities. So let's go over these points once again, and then let's implement them in our date picker component and test thoroughly.

## Internationalization and Localization

There are some key issues in the area of Internationalization (i18n) and Localization (l10n) that I would like to raise as they relate to our date picker implementation. For the date picker, let's customize it for different languages and regions so users all over the world can share a common experience.

### Language Support

- Be able to translate the date picker to other languages. Use libraries or frameworks that support i18n, such as `react-i18next` or `react-intl`.
- All static text, such as names of the months, names of days, and any textual instructions, should be translatable.

### Date Formats

- Date format depends on locale, e.g., MM/DD/YYYY in the United States, DD/MM/YYYY in Europe. Datepicker should locale user's machine settings.
- Use a locale-aware library like `date-fns` or `moment.js` for date formatting and parsing.

### Number Formats

- Ensure that numeric values like years are formatted with respect to the locale being used while considering different systems of numerals.

### Right-to-Left (RTL) Support

- Some of the languages that read RTL are Arabic and Hebrew. There should be RTL layout support for date pickers so that a natural user reading and interacting experience can be maintained.
- Test the date picker within an RTL layout for elements alignment and usability.

### Locale-Specific Holidays and Weekends

- In other cultures, weekends might not take place on Saturday and Sunday. For instance, in some Middle Eastern countries, the weekend takes place on Friday and Saturday.
- Shows local holidays and weekends as per the user's locale.

### Time Zone Awareness

- If the date picker includes time entry, make sure that it properly supports time zones. Users should see the local time in their time zone.
- Make use of libraries such as `moment-timezone` for time zone conversions.

### Cultural Sensitivities

- Be mindful of cultural differences and sensitivities. Some colors, icons, and symbols have different connotations depending on the culture and the people.
- Ensure that the user interface of the date picker does not face any of these differences.

## Testing Date Pickers

Thoroughly testing date pickers ensures they work well for all users across different devices, browsers, and scenarios. Here are some best practices and code examples for testing date pickers:

### Snapshot Testing

Snapshot tests help ensure the date picker renders correctly and that changes are intentional. When using libraries like `react-datepicker`, wrap the component in a simple test to capture its initial state.

```javascript
import { render } from "@testing-library/react";
import DatePicker from "react-datepicker";

test("renders DatePicker correctly", () => {
  const { asFragment } = render(<DatePicker />);
  expect(asFragment()).toMatchSnapshot();
});
```

### Testing User Interactions

Testing user interactions, such as opening the calendar, selecting dates, and clearing selections, is crucial. @testing-library/react is useful for simulating these interactions.

```tsx
import { render, fireEvent } from "@testing-library/react";
import DatePicker from "react-datepicker";
import React, { useState } from "react";

function DatePickerWrapper() {
  const [date, setDate] = useState(null);
  return <DatePicker selected={date} onChange={setDate} />;
}

test("opens calendar and selects a date", () => {
  const { getByPlaceholderText, getByText } = render(<DatePickerWrapper />);
  const input = getByPlaceholderText("Select a date");

  fireEvent.click(input); // Open the calendar
  fireEvent.click(getByText("15")); // Select the 15th

  expect(input.value).toContain("15"); // Verify the date selection
});
```

### Keyboard Accessibility

Ensuring accessibility means verifying that the date picker can be navigated via keyboard. Users should be able to open it, navigate dates with arrow keys, select a date with Enter, and close it with Esc.

```tsx
test("date picker is accessible via keyboard", () => {
  const { getByPlaceholderText } = render(<DatePickerWrapper />);
  const input = getByPlaceholderText("Select a date");

  input.focus();
  fireEvent.keyDown(input, { key: "Enter" }); // Open the calendar
  fireEvent.keyDown(input, { key: "ArrowRight" }); // Move to the next day
  fireEvent.keyDown(input, { key: "Enter" }); // Select date

  expect(input.value).not.toBe(""); // Verify that a date is selected
});
```

### Boundary Testing

Testing boundary values, such as minimum and maximum selectable dates, prevents users from selecting out-of-range dates.

```tsx
function DatePickerWithBounds() {
  const [date, setDate] = useState(null);
  return (
    <DatePicker
      selected={date}
      onChange={setDate}
      minDate={new Date("2024-01-01")}
      maxDate={new Date("2024-12-31")}
      placeholderText="Select a date"
    />
  );
}

test("disables out-of-range dates", () => {
  const { getByPlaceholderText } = render(<DatePickerWithBounds />);
  const input = getByPlaceholderText("Select a date");

  fireEvent.click(input); // Open the calendar
  const prevYearDate = new Date("2023-12-31").toLocaleDateString();
  const nextYearDate = new Date("2025-01-01").toLocaleDateString();

  expect(input.value).not.toContain(prevYearDate);
  expect(input.value).not.toContain(nextYearDate);
});
```

### Testing Localization

For date pickers supporting multiple languages, ensure they display correctly across different locales. This includes checking date format, day names, and month names.

```tsx
import { render, fireEvent } from "@testing-library/react";
import DatePicker from "react-datepicker";
import { fr } from "date-fns/locale";

test("displays date in French locale", () => {
  const { getByPlaceholderText } = render(
    <DatePicker locale={fr} placeholderText="Sélectionner une date" />,
  );
  const input = getByPlaceholderText("Sélectionner une date");

  fireEvent.click(input); // Open the calendar
  expect(input).toBeInTheDocument(); // Verify input in the French locale
});
```

## Performance Optimization

I also wanted to touch on some critical aspects of optimization in performance that we should consider for our date picker, taking care that it runs in the most efficient manner and responds properly to user input. This would greatly improve the user experience—most importantly, for users with low-end devices or slow connections.

### Lazy Loading

- Load the components and data only when needed, like the date picker component should be loaded when only the user interacts with the input field.
- Use React's `React.lazy` with a `Suspense` wrapper to get component-level code-splitting.

```tsx
import React, { Suspense, lazy } from "react";

const DatePicker = lazy(() => import("./DatePicker"));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <DatePicker />
      </Suspense>
    </div>
  );
}

export default App;
```

### Avoid Minimize Re-renders

- Guarantee minimal re-rendering in the date picker component. The `React.memo` implementation takes care of this.
- Avoid passing a new object or function reference as a prop, it is better to avoid it because it will make re-renders.

```tsx
import React, { useState, memo } from "react";

const DatePicker = memo(({ selectedDate, onDateChange }) => {
  return <input type="date" value={selectedDate} onChange={onDateChange} />;
});

function App() {
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <div>
      <DatePicker selectedDate={date} onDateChange={handleDateChange} />
    </div>
  );
}

export default App;
```

### Efficient State Management

- Keep the state as minimal as possible. Store only values that are required to support the functionality of the date picker.
- Use the `useCallback` and `useMemo` hooks to memoize functions and values for preventing unnecessary calculations.

```tsx
import React, { useState, useCallback, useMemo } from "react";

function DatePicker({ selectedDate, onDateChange }) {
  return <input type="date" value={selectedDate} onChange={onDateChange} />;
}

function App() {
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));

  const handleDateChange = useCallback((e) => {
    setDate(e.target.value);
  }, []);

  const formattedDate = useMemo(() => {
    return new Date(date).toLocaleDateString();
  }, [date]);

  return (
    <div>
      <DatePicker selectedDate={date} onDateChange={handleDateChange} />
      <p>Selected Date: {formattedDate}</p>
    </div>
  );
}

export default App;
```

### Virtualization

- If the date picker is rich in numbers of items, for example, years or months, use virtualization of visible items. The huge positive impact can be realized in reducing the loading time and scrolling performance at the start.
- Leverage libraries like `react-window` or `react-virtualized` for virtualization.

```tsx
import React from "react";
import { FixedSizeList as List } from "react-window";

const items = Array.from({ length: 1000 }, (_, index) => `Item ${index + 1}`);

function DatePicker() {
  return (
    <List height={150} itemCount={items.length} itemSize={35} width={300}>
      {({ index, style }) => <div style={style}>{items[index]}</div>}
    </List>
  );
}

export default DatePicker;
```

### Debouncing

- For user input that triggers heavy computation or API calls (e.g., searching for dates or input validation), you'll want to debounce so the operations don't get called too frequently.
- Implement a debounce function that triggers the search after a predefined period of time in which a user has stopped typing.

```tsx
import React, { useState } from "react";
import { debounce } from "lodash";

function DatePicker() {
  const [date, setDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleDateChange = (e) => {
    setDate(e.target.value);
    debouncedSearch(e.target.value);
  };

  const debouncedSearch = debounce((term) => {
    // Simulate an API call
    console.log("Searching for:", term);
  }, 300);

  return (
    <div>
      <input type="date" value={date} onChange={handleDateChange} />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}

export default DatePicker;
```

### Code Splitting

- Code split into small bundles to ensure the load time for the first instance. Use in-built support in React for code-splitting with React.lazy and dynamic imports.
- Analyze the bundle size with tools like Webpack Bundle Analyzer and optimize the build configuration based on the analysis.

```tsx
import React, { Suspense, lazy } from "react";

const DatePicker = lazy(() => import("./DatePicker"));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <DatePicker />
      </Suspense>
    </div>
  );
}

export default App;
```

### Optimized Event Handling

- Do not add many event listeners; it is expensive in terms of performance. Use event delegation when possible.
- Batch state updates and handle multiple events within one handler in order to cut on re-renders.

```tsx
import React, { useState, useEffect } from "react";

function DatePicker() {
  const [date, setDate] = useState(new Date().toISOString().substr(0, 10));

  useEffect(() => {
    const handleResize = () => {
      console.log("Window resized");
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  return (
    <div>
      <input type="date" value={date} onChange={handleDateChange} />
    </div>
  );
}

export default DatePicker;
```

## Internationalization and Localization

To make our date picker user-friendly for people around the world, it’s essential to consider internationalization (i18n) and localization (l10n). This helps ensure that users in various regions and languages find the date picker intuitive and easy to use.

### Language Support

Allowing the date picker to be translated into multiple languages makes it more accessible. Libraries like `react-i18next` or `react-intl` help manage translations, such as for month names, day names, and any instructional text.

```javascript
import { useTranslation } from "react-i18next";

function DatePickerWithTranslation() {
  const { t } = useTranslation();

  return (
    <DatePicker
      placeholderText={t("Select a date")}
      // Add more translated text as needed
    />
  );
}
```

### Date Formats

Different countries use different date formats (e.g., MM/DD/YYYY in the U.S. vs. DD/MM/YYYY in Europe). Libraries like date-fns or moment.js can format dates based on the user’s region.

```tsx
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { enUS, fr } from "date-fns/locale";

function LocalizedDatePicker() {
  const [date, setDate] = useState(new Date());

  return (
    <DatePicker
      selected={date}
      onChange={setDate}
      locale={fr} // Set locale to French (example)
      dateFormat="P" // Adjust format based on locale
    />
  );
}
```

### Right-to-Left (RTL) Support

For languages like Arabic and Hebrew that read right-to-left, the date picker should adapt to an RTL layout for a better user experience.

```tsx
import DatePicker from "react-datepicker";
import { useEffect } from "react";

function RTLDatePicker() {
  useEffect(() => {
    document.body.dir = "rtl"; // Set the page to RTL layout
    return () => (document.body.dir = "ltr"); // Reset on cleanup
  }, []);

  return <DatePicker placeholderText="تحديد التاريخ" />; // Arabic placeholder
}
```

### Local Holidays and Weekends

Weekends vary by country (e.g., Friday and Saturday in some Middle Eastern countries). Customize the date picker to highlight weekends or block specific dates based on regional preferences.

```tsx
import DatePicker from "react-datepicker";

function WeekendDatePicker() {
  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 5 || day === 6; // Assuming Friday and Saturday are weekends
  };

  return <DatePicker filterDate={isWeekend} placeholderText="Select a date" />;
}
```

### Time Zone Awareness

For date pickers that include time selection, support for time zones is essential. Libraries like moment-timezone manage time zone conversions, ensuring users see the correct local time.

```tsx
import DatePicker from "react-datepicker";
import moment from "moment-timezone";

function TimeZoneDatePicker() {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (selectedDate) => {
    const localDate = moment(selectedDate).tz("America/New_York"); // Example timezone
    setDate(localDate);
  };

  return (
    <DatePicker
      selected={date}
      onChange={handleDateChange}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      dateFormat="MMMM d, yyyy h:mm aa"
      placeholderText="Select date and time"
    />
  );
}
```

## Conclusion

Date pickers are sometimes a web application’s most important feature. In this article, we showed how to create basic React date picker using **react-datepicker** package, implementing advanced features and their possible use cases.

Hopefully our article has helped you make best use of the ‘react-datepicker’ package to create datepickers in a short time.
