/**
 * Code will be generated to be ready to copy and paste into a live environment.
 * But, `react-live` with `noInline={true}` will not work with this code and require `render` method to be called with the component.
 * This function will use the component name and the code and append the `render` method to the code.
 */
export const prepareLiveCode = (code?: string, componentName?: string) => {
  return `
    ${code ?? ""}
    
    render(typeof ${componentName} !== "undefined" ? <${componentName} /> : <></>);
    `;
};
