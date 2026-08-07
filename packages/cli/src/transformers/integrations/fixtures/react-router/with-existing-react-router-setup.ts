export const WITH_EXISTING_REACT_ROUTER_SETUP_SOURCE = `
import { Refine, WelcomePage, ErrorComponent } from "@refinedev/core";

import routerProvider from "@refinedev/react-router";
import { BrowserRouter, Routes, Route } from "react-router";

function App() {
    return (
        <BrowserRouter>
            <Refine routerProvider={routerProvider}>
                <Routes>
                    <Route index element={<WelcomePage />} />
                    <Route path="*" element={<ErrorComponent />} />
                </Routes>
            </Refine>
        </BrowserRouter>
    );
}

export default App;
`.trim();
