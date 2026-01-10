import { Github, Package } from "lucide-react";
import LinkedInIcon from "./LinkedInIcon";
import packageJson from "../../package.json";

export default function Footer() {
  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/HarryB05",
    },
    {
      name: "LinkedIn",
      icon: LinkedInIcon,
      href: "https://www.linkedin.com/in/harry-barnish",
    },
    {
      name: "NPM",
      icon: Package,
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
        {lastUpdated && (
          <p className="text-foreground/50 text-xs font-merriweather">
            Last updated: {lastUpdated}
          </p>
        )}
      </div>
    </footer>
  );
} 