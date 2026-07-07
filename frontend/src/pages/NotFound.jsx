import { Link } from "react-router-dom";
import Button from "../ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-6 py-32 text-center">
      <p className="font-mono text-xs uppercase tracking-widest text-clay">404</p>
      <h1 className="mt-3 font-display text-4xl text-ink">This page didn't make the cut.</h1>
      <p className="mt-4 text-ink/65">
        The page you're looking for doesn't exist, or moved somewhere else.
      </p>
      <Button href="/" className="mt-8">
        Back to home
      </Button>
      <Link to="/portfolio" className="mt-4 text-sm text-ink/55 hover:text-ink">
        Or browse the portfolio →
      </Link>
    </div>
  );
}
