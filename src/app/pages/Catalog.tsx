import { useState, useEffect } from "react";
import { Link, useLocation, useSearchParams } from "react-router";
import { getProductsByCategory } from "../data/products";
import type { Product } from "../data/products";
import { ArrowUpRight, Layers, Package } from "lucide-react";
import { productGridClass, productGridStyle } from "../styles/productGrid";
import { Button } from "../components/ui/button";
import { CatalogGridSkeleton } from "../components/CatalogGridSkeleton";
import { cn } from "../components/ui/utils";

const categories = ["All", "Tops", "Bottoms", "Outerwear", "Dresses"];

export function Catalog() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const builderFlow = (location.state as { builderFlow?: string } | null)?.builderFlow;
  const techpackSpecFlow =
    searchParams.get("flow") === "techpack-spec" || builderFlow === "techpack-spec";
  const packagingOnly =
    builderFlow === "packaging-only" || builderFlow === "packaging";
  const [selectedCategory, setSelectedCategory] = useState("All");
  const filteredProducts = getProductsByCategory(selectedCategory);
  const [catalogReady, setCatalogReady] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setCatalogReady(true), 320);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="min-h-dvh overflow-x-hidden bg-ceriga-bg px-[max(1.25rem,env(safe-area-inset-left))] py-6 pr-[max(1.25rem,env(safe-area-inset-right))] sm:px-6 md:px-8 md:py-8">
      <div className="mb-8">
        <p className="mb-2 text-[14px] font-medium text-ceriga-accent">Product library</p>
        <h1 className="font-display text-[clamp(1.75rem,4vw,2.25rem)] font-semibold tracking-tight text-ceriga-text">
          Product catalog
        </h1>
        <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ceriga-muted">
          {packagingOnly
            ? "Packaging opens in its own workspace — no garment pick. Use Studio → Design packaging, or open it below."
            : techpackSpecFlow
              ? "Pick a garment template, then complete measurements and construction — upload artwork first, without on-shirt placement editing."
              : "Choose a garment to start building your custom tech pack."}
        </p>
        {packagingOnly && (
          <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-ceriga-accent/20 bg-ceriga-accent-muted p-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <Package className="mt-0.5 h-5 w-5 shrink-0 text-ceriga-accent" />
              <p className="text-[14px] leading-relaxed text-ceriga-muted">
                Skip the grid — go straight to the packaging canvas. You can still browse products below for reference.
              </p>
            </div>
            <Button asChild className="shrink-0">
              <Link to="/packaging">Open packaging</Link>
            </Button>
          </div>
        )}
      </div>

      <div className="scrollbar-dark mb-6 flex flex-nowrap items-center gap-2 overflow-x-auto border-b border-ceriga-separator pb-5 sm:flex-wrap">
        {categories.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "shrink-0 rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors",
                active
                  ? "bg-ceriga-accent text-white"
                  : "border border-ceriga-border text-ceriga-muted hover:border-ceriga-border-strong hover:text-ceriga-text",
              )}
            >
              {cat}
            </button>
          );
        })}
        <span className="ml-auto shrink-0 pl-2 text-[13px] text-ceriga-subtle">
          {filteredProducts.length} items
        </span>
      </div>

      {!catalogReady ? (
        <CatalogGridSkeleton />
      ) : (
        <div className={productGridClass} style={productGridStyle}>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              builderFlow={builderFlow}
              packagingOnly={packagingOnly}
              techpackSpecFlow={techpackSpecFlow}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ProductCard({
  product,
  packagingOnly,
  techpackSpecFlow,
}: {
  product: Product;
  builderFlow?: string;
  packagingOnly: boolean;
  techpackSpecFlow: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "flex flex-col overflow-hidden rounded-2xl border bg-ceriga-surface transition-all duration-200",
        hovered
          ? "border-ceriga-border-strong shadow-[var(--ceriga-shadow-md)]"
          : "border-ceriga-border",
      )}
    >
      <div className="relative aspect-[3/2] overflow-hidden bg-ceriga-bg">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          decoding="async"
          className={cn(
            "h-full w-full object-cover transition-transform duration-500",
            hovered ? "scale-[1.03]" : "scale-100",
          )}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ceriga-surface/80" />
        <div className="absolute bottom-3 left-3 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-medium text-ceriga-text backdrop-blur-md">
          {product.garmentType}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-1 font-display text-[15px] font-semibold text-ceriga-text">{product.name}</h3>
        <p className="mb-4 line-clamp-2 flex-1 text-[13px] leading-relaxed text-ceriga-muted">
          {product.description}
        </p>

        <div className="mb-4 flex items-start gap-2 rounded-xl border border-ceriga-border bg-ceriga-elevated p-3">
          <Layers className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ceriga-subtle" />
          <p className="text-[12px] leading-relaxed text-ceriga-muted">
            Build measurements, fabrics, construction, and artwork in the guided tech pack flow.
          </p>
        </div>

        <Link
          to={
            packagingOnly
              ? "/packaging"
              : techpackSpecFlow
                ? `/builder/${product.id}?flow=techpack-spec`
                : `/builder/${product.id}`
          }
          state={
            packagingOnly
              ? { builderFlow: "packaging-only" }
              : techpackSpecFlow
                ? { builderFlow: "techpack-spec" }
                : undefined
          }
          className={cn(
            "flex items-center justify-center gap-1.5 rounded-full py-2.5 text-[13px] font-medium transition-colors",
            hovered
              ? "bg-ceriga-accent text-white"
              : "border border-ceriga-border text-ceriga-muted hover:text-ceriga-text",
          )}
        >
          {packagingOnly ? "Open workspace" : "Configure"}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </div>
  );
}
