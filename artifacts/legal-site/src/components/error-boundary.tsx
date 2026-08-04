import { Component, type ReactNode } from "react";
import { Link } from "wouter";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Catches any unhandled render error in the public page tree and shows a
 * recovery UI instead of leaving the screen blank.  Without this, a single
 * throw during a client-side navigation empties #root entirely.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: unknown) {
    // Log to console so it shows in browser dev tools / Replit logs
    console.error("[ErrorBoundary]", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="min-h-screen flex flex-col items-center justify-center gap-4 px-4"
          dir="ltr"
        >
          <h1 className="text-2xl font-serif font-bold text-foreground">
            Something went wrong
          </h1>
          <p className="text-muted-foreground text-center max-w-md">
            The page failed to load. Please try again or return to the home
            page.
          </p>
          <div className="flex gap-4">
            <button
              className="text-primary font-medium hover:underline"
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
            >
              Reload page
            </button>
            <Link href="/" className="text-primary font-medium hover:underline">
              Go to home
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
