import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router";
import {
  Plus,
  MoreVertical,
  Clock,
  ArrowRight,
  Layers,
  TrendingUp,
} from "lucide-react";
import imgBlueTshirt from "figma:asset/f00825900c95df312eb3b002c75207b61c243d55.png";
import { productGridClass, productGridStyle } from "../styles/productGrid";
import { builderPath, type ProjectFlowType } from "../lib/projectFlow";
import { Button } from "../components/ui/button";
import { DashboardLiveChat } from "../components/DashboardLiveChat";
import { NotificationBell } from "../components/NotificationBell";

export function Dashboard() {
  const { user } = useAuth();

  const projects: Array<{
    id: string;
    productId: string;
    flowType: ProjectFlowType;
    name: string;
    garmentType: string;
    status: string;
    progress: number;
    lastEdited: string;
    image: string;
    color: string;
    season: string;
  }> = [
    {
      id: "1",
      productId: "hd-001",
      flowType: "techpack",
      name: "Oversized Hoodie",
      garmentType: "Hoodie",
      status: "In Progress",
      progress: 65,
      lastEdited: "2 hours ago",
      image: imgBlueTshirt,
      color: "#3B82F6",
      season: "FW25",
    },
    {
      id: "2",
      productId: "tr-001",
      flowType: "packaging",
      name: "Cargo Pants",
      garmentType: "Trousers",
      status: "In Progress",
      progress: 40,
      lastEdited: "5 hours ago",
      image: imgBlueTshirt,
      color: "#10B981",
      season: "FW25",
    },
    {
      id: "3",
      productId: "sw-001",
      flowType: "techpack",
      name: "Crewneck Sweatshirt",
      garmentType: "Sweatshirt",
      status: "Completed",
      progress: 100,
      lastEdited: "1 day ago",
      image: imgBlueTshirt,
      color: "#8B5CF6",
      season: "SS25",
    },
    {
      id: "4",
      productId: "ts-001",
      flowType: "manufacturer",
      name: "Graphic Tee",
      garmentType: "T-Shirt",
      status: "In Progress",
      progress: 25,
      lastEdited: "3 days ago",
      image: imgBlueTshirt,
      color: "#EF4444",
      season: "SS25",
    },
  ];

  const avgProgress = Math.round(
    projects.reduce((acc, p) => acc + p.progress, 0) / projects.length,
  );
  const completed = projects.filter((p) => p.status === "Completed").length;
  const inProgress = projects.filter((p) => p.status === "In Progress").length;

  return (
    <div className="min-h-dvh overflow-x-hidden bg-ceriga-bg p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="mb-8 flex items-center justify-between gap-3 sm:mb-10">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-ceriga-accent-muted">
            <Layers className="h-4 w-4 text-ceriga-accent" />
          </div>
          <span className="text-[14px] font-medium text-ceriga-muted">Tech pack studio</span>
        </div>
        <div className="hidden lg:flex">
          <NotificationBell />
        </div>
      </div>

      <div className="mb-10">
        <p className="mb-3 text-[14px] font-medium text-ceriga-accent">Overview</p>
        <h1 className="font-display text-[clamp(2rem,4vw,3rem)] font-semibold tracking-tight text-ceriga-text">
          {user?.name ? `Welcome back, ${user.name}.` : "Welcome back."}
        </h1>
        <p className="mt-3 max-w-md text-[17px] leading-relaxed text-ceriga-muted">
          Build production-ready garment tech packs with clarity and speed.
        </p>
      </div>

      <div className="mb-10 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: "Total projects", value: projects.length, sub: "All time" },
          { label: "In progress", value: inProgress, sub: "Active" },
          { label: "Completed", value: completed, sub: "Finished" },
          { label: "Average progress", value: `${avgProgress}%`, sub: "Across all" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-ceriga-border bg-ceriga-surface p-5"
          >
            <p className="mb-3 text-[12px] font-medium text-ceriga-subtle">{s.label}</p>
            <p className="font-display text-3xl font-semibold tracking-tight text-ceriga-text">
              {s.value}
            </p>
            <p className="mt-2 text-[13px] text-ceriga-muted">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight text-ceriga-text">
            Projects
          </h2>
          <p className="mt-1 text-[14px] text-ceriga-muted">
            {projects.length} garments · {inProgress} active
          </p>
        </div>
        <Link
          to="/catalog"
          className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-medium text-ceriga-accent transition-opacity hover:opacity-80"
        >
          Browse catalog
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mb-6 h-px bg-ceriga-separator" />

      <div className={productGridClass} style={productGridStyle}>
        <Link
          to="/catalog"
          className="group flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-ceriga-border-strong bg-transparent p-6 text-center transition-all hover:border-ceriga-accent/40 hover:bg-ceriga-accent-muted sm:min-h-[240px]"
        >
          <div className="mb-4 flex size-12 items-center justify-center rounded-xl border border-ceriga-border bg-ceriga-elevated">
            <Plus className="h-5 w-5 text-ceriga-muted" />
          </div>
          <p className="text-[15px] font-medium text-ceriga-text">New project</p>
          <p className="mt-1.5 max-w-[180px] text-[13px] leading-relaxed text-ceriga-muted">
            Start a garment and build a tech pack from scratch.
          </p>
        </Link>

        {projects.map((project) => {
          const isCompleted = project.status === "Completed";

          return (
            <div
              key={project.id}
              className="group overflow-hidden rounded-2xl border border-ceriga-border bg-ceriga-surface transition-all duration-200 hover:border-ceriga-border-strong"
            >
              <div className="relative aspect-[3/2] overflow-hidden bg-ceriga-elevated">
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}18 0%, transparent 60%)`,
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-ceriga-surface to-transparent" />

                <div className="absolute inset-0 flex items-start justify-center pb-2 pt-0">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="h-full w-full scale-[1.15] object-contain object-[center_top] transition-transform duration-500 group-hover:scale-[1.18]"
                    style={{
                      filter: `hue-rotate(${getHueForColor(project.color)}deg) saturate(0.9)`,
                    }}
                  />
                </div>

                <div className="absolute left-3 top-3 z-20">
                  <span
                    className={`rounded-full px-2.5 py-1 text-[12px] font-medium ${
                      isCompleted
                        ? "bg-emerald-500/15 text-emerald-300"
                        : "bg-amber-500/15 text-amber-200"
                    }`}
                  >
                    {isCompleted ? "Complete" : "In progress"}
                  </span>
                </div>

                <div className="absolute right-3 top-3 z-20">
                  <span className="rounded-full bg-black/40 px-2.5 py-1 text-[12px] font-medium text-ceriga-muted backdrop-blur-md">
                    {project.season}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-[15px] font-medium leading-tight text-ceriga-text">
                      {project.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-1 text-ceriga-subtle">
                      <Clock className="h-3 w-3" />
                      <span className="text-[12px]">{project.lastEdited}</span>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full border border-ceriga-border bg-ceriga-elevated px-2 py-1 text-[11px] font-medium text-ceriga-muted">
                    {project.garmentType}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-[12px] text-ceriga-subtle">Progress</span>
                    <span
                      className={`text-[12px] font-medium ${
                        isCompleted ? "text-emerald-300" : "text-ceriga-text"
                      }`}
                    >
                      {project.progress}%
                    </span>
                  </div>
                  <div className="relative h-1 w-full overflow-hidden rounded-full bg-ceriga-elevated">
                    <div
                      className="absolute left-0 top-0 h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${project.progress}%`,
                        background: isCompleted ? "#34C759" : "var(--ceriga-accent)",
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link to={builderPath(project.productId, project.flowType)} className="flex-1">
                    <Button className="h-9 w-full text-[13px]">Open</Button>
                  </Link>
                  <button
                    type="button"
                    className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-ceriga-border bg-ceriga-elevated text-ceriga-muted transition-colors hover:text-ceriga-text"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex items-center justify-between">
        <p className="text-[13px] text-ceriga-subtle">
          {projects.length} projects · last updated just now
        </p>
        <button
          type="button"
          className="flex items-center gap-1.5 text-[13px] text-ceriga-subtle transition-opacity hover:opacity-70"
        >
          <TrendingUp className="h-3.5 w-3.5" />
          Analytics
        </button>
      </div>

      <DashboardLiveChat />
    </div>
  );
}

function getHueForColor(color: string): number {
  const colorMap: Record<string, number> = {
    "#3B82F6": 0,
    "#10B981": 60,
    "#8B5CF6": -40,
    "#EF4444": 140,
  };
  return colorMap[color] || 0;
}
