import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ChangelogLoading() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-20 sm:pt-24 px-4 sm:px-6 pb-16 sm:pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="h-12 sm:h-14 md:h-16 w-64 sm:w-80 md:w-96 mx-auto mb-4 sm:mb-6 bg-foreground/5 rounded-lg animate-pulse" />
            <div className="h-6 sm:h-7 w-full max-w-3xl mx-auto mb-3 bg-foreground/5 rounded-lg px-4 animate-pulse" />
            <div className="h-4 w-full max-w-3xl mx-auto bg-foreground/5 rounded-lg px-4 animate-pulse" />
          </div>

          {/* Version Filter Skeleton */}
          <div className="mb-8 space-y-4">
            <div className="h-4 w-40 mb-3 bg-foreground/5 rounded animate-pulse" />
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              <div className="h-8 w-24 bg-foreground/5 rounded-lg shrink-0 animate-pulse" />
              <div className="h-8 w-20 bg-foreground/5 rounded-lg shrink-0 animate-pulse" />
              <div className="h-8 w-20 bg-foreground/5 rounded-lg shrink-0 animate-pulse" />
              <div className="h-8 w-20 bg-foreground/5 rounded-lg shrink-0 animate-pulse" />
            </div>
          </div>

          {/* Timeline Skeleton */}
          <div className="space-y-0">
            {[1, 2, 3].map((index) => (
              <div key={index} className="relative">
                {/* Timeline line */}
                {index < 3 && (
                  <div className="absolute left-4 top-8 h-full w-0.5 bg-primary/30 z-0" />
                )}

                <div className="relative flex gap-4">
                  {/* Date circle skeleton */}
                  <div className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-border/50 bg-card/50">
                    <div className="h-2 w-2 rounded-full bg-foreground/40" />
                  </div>

                  {/* Content skeleton */}
                  <div className="flex-1 space-y-2 pb-8">
                    {/* Date and version */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="h-4 w-24 bg-foreground/5 rounded animate-pulse" />
                      <div className="h-5 w-16 bg-foreground/5 rounded-full animate-pulse" />
                    </div>

                    {/* Title */}
                    <div className="h-6 w-3/4 bg-foreground/5 rounded animate-pulse" />

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      <div className="h-6 w-16 bg-foreground/5 rounded-md animate-pulse" />
                      <div className="h-6 w-20 bg-foreground/5 rounded-md animate-pulse" />
                      <div className="h-6 w-14 bg-foreground/5 rounded-md animate-pulse" />
                    </div>

                    {/* Features section */}
                    <div className="space-y-1">
                      <div className="h-3 w-20 bg-foreground/5 rounded animate-pulse" />
                      <ul className="space-y-1">
                        <li className="flex items-center gap-2">
                          <span className="text-2xl leading-none text-primary">•</span>
                          <div className="h-4 w-full max-w-md bg-foreground/5 rounded animate-pulse" />
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="text-2xl leading-none text-primary">•</span>
                          <div className="h-4 w-full max-w-sm bg-foreground/5 rounded animate-pulse" />
                        </li>
                      </ul>
                    </div>

                    {/* Body content skeleton */}
                    <div className="mt-4 space-y-2">
                      <div className="h-4 w-full bg-foreground/5 rounded animate-pulse" />
                      <div className="h-4 w-5/6 bg-foreground/5 rounded animate-pulse" />
                      <div className="h-4 w-4/5 bg-foreground/5 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
