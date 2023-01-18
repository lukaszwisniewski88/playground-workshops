import { useState } from "react";
import HookFormula from "./components/hookForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-12 container mx-auto flex flex-col gap-8 items-center">
      <h2 className="text-2xl">Hello! {count}</h2>
      <HookFormula />
    </div>
  );
}

export default App;
