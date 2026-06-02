import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Problems from "@/components/Problems";
import Transformation from "@/components/Transformation";
import Solutions from "@/components/Solutions";
import EvalForm from "@/components/EvalForm";
import Results from "@/components/Results";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Problems />
      <Transformation />
      <Solutions />
      <Results />
      <EvalForm />
      <CTA />
    </main>
  );
}
