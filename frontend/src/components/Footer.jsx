import { useState } from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../lib/config";
import Button from "../ui/Button";


export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    // No backend wired up yet — this just confirms the input locally.
    setSubscribed(true);
    setEmail("");
  }

  return (
    <footer className="border-t border-ink/10 bg-paper">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link to="/" className="font-display text-xl text-moss">
              {siteConfig.name}
            </Link>
            <p className="mt-4 max-w-sm text-sm text-ink/60">
              Join the mailing list for new updates and the occasional behind-the-scenes
              look at what we're cutting. No spam.
            </p>
            <form onSubmit={handleSubmit} className="mt-5 flex max-w-sm gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@gmail.com"
                className="w-full rounded-full border border-ink/15 bg-paper px-4 py-2 text-sm outline-none focus:border-moss"
              />
              <Button type="submit" size="md">
                Join
              </Button>
            </form>
            {subscribed && (
              <p className="mt-2 text-xs text-moss">You're on the list — thanks.</p>
            )}

            
          </div>

          {Object.entries(siteConfig.footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="font-mono text-xs uppercase tracking-widest text-ink/40">
                {heading}
              </p>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-sm text-ink/65 hover:text-ink">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-ink/10 pt-6 text-xs text-ink/45 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.</span>
          <a href="/#hero" className="hover:text-ink">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}