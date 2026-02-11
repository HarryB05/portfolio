import Link from "next/link";
import LinkedInIcon from "./LinkedInIcon";
import GitHubIcon from "./GitHubIcon";
import NPMIcon from "./NPMIcon";
import packageJson from "../../package.json";

export default function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      icon: GitHubIcon,
      href: "https://github.com/HarryB05",
    },
    {
      name: "LinkedIn",
      icon: LinkedInIcon,
      href: "https://www.linkedin.com/in/harry-barnish",
    },
    {
      name: "NPM",
      icon: NPMIcon,
      href: "https://www.npmjs.com/~harryb05",
    },
  ];

  // Format the last updated date
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const lastUpdated = packageJson.lastUpdated
    ? formatDate(packageJson.lastUpdated)
    : null;

  return (
    <footer className="w-full py-6 text-center bg-background/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <p className="text-foreground/60 text-sm font-merriweather">
          Built by Harry Barnish
        </p>
        <div className="flex justify-center items-center gap-4">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-foreground/60 hover:text-primary transition-colors"
              title={social.name}
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </div>
        <div className="flex justify-center items-center gap-3 flex-wrap">
          {lastUpdated && (
            <p className="text-foreground/50 text-xs font-merriweather">
              Last updated: {lastUpdated}
            </p>
          )}
          <Link
            href="/changelog"
            className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary transition-colors hover:bg-primary/20 hover:border-primary/50 dark:bg-primary/20 dark:text-primary dark:hover:bg-primary/30"
            title="View changelog"
          >
            v{packageJson.version}
          </Link>
        </div>
      </div>
    </footer>
  );
} 