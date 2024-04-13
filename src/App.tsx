import Router from "./routes/index";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <>
      <Header />
      <Router />
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
