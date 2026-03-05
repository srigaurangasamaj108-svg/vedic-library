import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-surface py-16 mt-24">
      <div className="max-w-screen-xl mx-auto px-10 grid md:grid-cols-4 gap-10 text-sm">

        <div>
          <h3 className="font-serif text-lg mb-3 text-accent">
            Vedic Library
          </h3>
          <p className="text-muted">
            Preserving, systematizing and presenting the Vedic knowledge tradition.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-accent">Library</h4>
          <ul className="space-y-2 text-muted">
            <li><Link href="/library/bg">Bhagavad-gītā</Link></li>
            <li><Link href="/library">All Texts</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-accent">Research</h4>
          <ul className="space-y-2 text-muted">
            <li><Link href="/research">Indian Knowledge Library</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-accent">Support</h4>
          <ul className="space-y-2 text-muted">
            <li><Link href="/donate">Donate</Link></li>
          </ul>
        </div>

      </div>

      <div className="text-center text-xs text-muted mt-12">
        © {new Date().getFullYear()} Vedic Library
      </div>
    </footer>
  );
}
