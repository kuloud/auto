import Rating from "@/components/rating/Rating";

import { HeroUIProvider } from "@heroui/react";

function App() {
  return (
    <HeroUIProvider>
      <Rating />
    </HeroUIProvider>
  );
}

export default App;
