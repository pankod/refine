import { fieldImageTests } from "@refinedev/ui-tests";

import { ImageField } from "./";

describe("ImageField", () => {
  fieldImageTests.bind(this)(ImageField);

  // it("renders image with correct title", () => {
  //     const imageUrl = "http://placeimg.com/640/480/animals";
  //     const { getByTestId } = render(
  //         <ImageField value={imageUrl} data-testid="test-image" />,
  //     );

  //     expect(getByTestId("test-image").children[0]).toHaveProperty(
  //         "src",
  //         imageUrl,
  //     );
  // });
});
