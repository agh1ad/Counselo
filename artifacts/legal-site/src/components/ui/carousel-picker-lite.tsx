import * as React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselOptions = {
  align?: "start" | "center" | "end";
  direction?: "ltr" | "rtl";
  loop?: boolean;
  axis?: "x" | "y";
};

type CarouselProps = {
  opts?: CarouselOptions;
  plugins?: unknown;
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void;
};

export type CarouselApi = {
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollSnapList: () => number[];
  canScrollPrev: () => boolean;
  canScrollNext: () => boolean;
};

type CarouselContextProps = CarouselProps & {
  viewportRef: React.MutableRefObject<HTMLDivElement | null>;
  setViewport: (node: HTMLDivElement | null) => void;
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  nativeScrolling: boolean;
};

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);
  if (!context) throw new Error("useCarousel must be used within a <Carousel />");
  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins: _plugins,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const viewportRef = React.useRef<HTMLDivElement | null>(null);
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const activeRef = React.useRef(false);
    const currentIndexRef = React.useRef(0);
    const [nativeScrolling, setNativeScrolling] = React.useState(false);
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const setRootRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        rootRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      },
      [ref],
    );

    const getItems = React.useCallback((): HTMLElement[] => {
      const track = viewportRef.current?.firstElementChild;
      if (!(track instanceof HTMLElement)) return [];
      return Array.from(track.children).filter((child): child is HTMLElement => child instanceof HTMLElement);
    }, []);

    const scrollToIndex = React.useCallback(
      (nextIndex: number) => {
        if (!activeRef.current) return;
        const items = getItems();
        if (items.length <= 1) return;
        const normalized = ((nextIndex % items.length) + items.length) % items.length;
        currentIndexRef.current = normalized;
        items[normalized]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "start",
        });
      },
      [getItems],
    );

    const scrollPrev = React.useCallback(
      () => scrollToIndex(currentIndexRef.current - 1),
      [scrollToIndex],
    );
    const scrollNext = React.useCallback(
      () => scrollToIndex(currentIndexRef.current + 1),
      [scrollToIndex],
    );

    const api = React.useMemo<CarouselApi>(
      () => ({
        scrollPrev,
        scrollNext,
        scrollSnapList: () => getItems().map((_, index) => index),
        canScrollPrev: () => getItems().length > 1,
        canScrollNext: () => getItems().length > 1,
      }),
      [getItems, scrollNext, scrollPrev],
    );

    React.useEffect(() => {
      // The first client render intentionally matches the prerendered Embla DOM.
      // Native scrolling is enabled only after hydration, avoiding any markup
      // mismatch while retaining touch/trackpad interaction without Embla.
      setNativeScrolling(true);
      const hasMultiple = getItems().length > 1;
      setCanScrollPrev(hasMultiple);
      setCanScrollNext(hasMultiple);
      setApi?.(api);

      const root = rootRef.current;
      if (!root || typeof IntersectionObserver === "undefined") {
        activeRef.current = true;
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          activeRef.current = entries.some((entry) => entry.isIntersecting);
        },
        { rootMargin: "200px 0px" },
      );
      observer.observe(root);
      return () => observer.disconnect();
    }, [api, getItems, setApi]);

    const handleKeyDown = React.useCallback(
      (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          opts?.direction === "rtl" ? scrollNext() : scrollPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          opts?.direction === "rtl" ? scrollPrev() : scrollNext();
        }
      },
      [opts?.direction, scrollNext, scrollPrev],
    );

    return (
      <CarouselContext.Provider
        value={{
          viewportRef,
          setViewport: (node) => {
            viewportRef.current = node;
          },
          opts,
          orientation,
          setApi,
          scrollPrev,
          scrollNext,
          canScrollPrev,
          canScrollNext,
          nativeScrolling,
        }}
      >
        <div
          ref={setRootRef}
          onKeyDownCapture={handleKeyDown}
          className={cn("relative", className)}
          role="region"
          aria-roledescription="carousel"
          {...props}
        >
          {children}
        </div>
      </CarouselContext.Provider>
    );
  },
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { setViewport, orientation, nativeScrolling } = useCarousel();

  const setCombinedRef = React.useCallback(
    (node: HTMLDivElement | null) => {
      setViewport(node);
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [ref, setViewport],
  );

  return (
    <div
      ref={setCombinedRef}
      className="overflow-hidden"
      data-picker-native-carousel={nativeScrolling ? "true" : undefined}
      style={
        nativeScrolling && orientation === "horizontal"
          ? {
              overflowX: "auto",
              overflowY: "hidden",
              scrollbarWidth: "none",
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }
          : undefined
      }
    >
      <div
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className,
        )}
        {...props}
      />
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, style, ...props }, ref) => {
  const { orientation, nativeScrolling } = useCarousel();

  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className,
      )}
      style={
        nativeScrolling && orientation === "horizontal"
          ? { ...style, scrollSnapAlign: "start" }
          : style
      }
      {...props}
    />
  );
});
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute  h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full",
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
        className,
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRight className="h-4 w-4" />
      <span className="sr-only">Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = "CarouselNext";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
};
