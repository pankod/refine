export const WITH_COMPONENT_IMPORTS_SOURCE = `
import { Refine, WelcomePage } from "@refinedev/core";

import { UseListExample, UseOneExample, UseUpdateExample } from 'examples';

function App() {
    return (
        <Refine>
            <WelcomePage />
            <UseListExample />
            <UseOneExample />
            <UseUpdateExample />
        </Refine>
    );
}

export default App;
`.trim();
