import Header from "./components/Header";
import Hero from "./components/Hero";
import ContagemRegressiva from "./components/ContagemRegressiva";
import Formulario from "./components/Formulario";
import Footer from "./components/Footer";
import NavMobile from "./components/NavMobile";
import "./App.css";

function App() {
  return (
    <div className="bg-surface text-on-surface font-body-md antialiased min-h-screen flex flex-col relative overflow-x-hidden">
      <Header />

      <main className="flex-grow pt-20">
        <Hero />
        <ContagemRegressiva />
        <Formulario />
      </main>

      <Footer />
      <NavMobile />
    </div>
  );
}

export default App;
