import { ChakraProvider } from "@chakra-ui/react";
import ProductScreen from "./screens/ProductScreen";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductScreen />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
