import { useState } from "react";
import Blog from "./components/Blog";

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const handleClick = () => setSignedIn(!signedIn);

  // console.log('Rendering App component');

  return (
    <main>
      <nav className="navbar">
        <button className="btn btn-danger" onClick={handleClick}>
          Sign Out
        </button>
      </nav>
      <Blog signedIn={signedIn} setSignedIn={setSignedIn} />
    </main>
  );
}

export default App;
