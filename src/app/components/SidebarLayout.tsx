import { ReactNode, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard,
  ShoppingBag,
  FileText,
  Package,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  Sparkles,
} from 'lucide-react';
import { NotificationBell } from './NotificationBell';
import { Sheet, SheetContent, SheetTitle } from './ui/sheet';
import { Button } from './ui/button';

interface SidebarLayoutProps {
  children: ReactNode;
}

export function SidebarLayout({ children }: SidebarLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [isLgUp, setIsLgUp] = useState(true);

  const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/studio', label: 'Studio', icon: Sparkles },
    { path: '/catalog', label: 'Catalog', icon: ShoppingBag },
    { path: '/drafts', label: 'Drafts', icon: FileText },
    { path: '/orders', label: 'Orders', icon: Package },
  ];

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const sync = () => setIsLgUp(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const isActive = (path: string) => {
    if (path === '/studio') {
      return location.pathname === '/studio' || location.pathname.startsWith('/studio/');
    }
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const sidebarWidth = isCollapsed ? 72 : 240;

  const handleLogout = () => {
    logout();
    navigate('/');
    setSheetOpen(false);
  };

  const navLinkClass = (active: boolean, collapsed?: boolean) =>
    `flex items-center ${collapsed ? 'justify-center px-2' : 'gap-3 px-3'} rounded-xl py-2.5 text-[14px] font-medium transition-colors ${
      active
        ? 'bg-white/[0.08] text-ceriga-text'
        : 'text-ceriga-muted hover:bg-white/[0.04] hover:text-ceriga-text'
    }`;

  const NavLinks = ({ onNavigate, collapsed }: { onNavigate?: () => void; collapsed?: boolean }) => (
    <>
      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={navLinkClass(active, collapsed)}
              title={collapsed ? item.label : undefined}
            >
              <Icon className={`h-[18px] w-[18px] flex-shrink-0 ${active ? 'text-ceriga-accent' : ''}`} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-ceriga-separator p-3">
        <Link
          to="/settings"
          onClick={onNavigate}
          className={`${navLinkClass(isActive('/settings'), collapsed)} mb-1`}
          title={collapsed ? 'Settings' : undefined}
        >
          <Settings className={`h-[18px] w-[18px] flex-shrink-0 ${isActive('/settings') ? 'text-ceriga-accent' : ''}`} />
          {!collapsed && <span>Settings</span>}
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className={`${navLinkClass(false, collapsed)} w-full`}
          title={collapsed ? 'Log out' : undefined}
        >
          <LogOut className="h-[18px] w-[18px] flex-shrink-0" />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-dvh overflow-x-hidden bg-ceriga-bg pb-[env(safe-area-inset-bottom)]">
      {!isLgUp && (
        <header className="fixed left-0 right-0 top-0 z-40 flex h-12 items-center justify-between border-b border-ceriga-separator bg-ceriga-bg/80 px-4 pt-[env(safe-area-inset-top)] backdrop-blur-xl sm:px-5">
          <button
            type="button"
            onClick={() => setSheetOpen(true)}
            className="flex size-10 items-center justify-center rounded-full bg-ceriga-elevated text-ceriga-text hover:bg-ceriga-elevated-2"
            aria-label="Open menu"
          >
            <Menu className="size-5" strokeWidth={1.75} />
          </button>
          <Link to="/dashboard" className="font-display text-[17px] font-semibold tracking-tight text-ceriga-text">
            Ceriga
          </Link>
          <div className="flex items-center gap-2">
            <NotificationBell className="size-10 border-ceriga-border bg-ceriga-elevated shadow-none [&_svg]:size-5" />
            <Button asChild size="sm">
              <Link to="/catalog">Build</Link>
            </Button>
          </div>
        </header>
      )}

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="left"
          className="w-[min(300px,88vw)] border-ceriga-border bg-ceriga-surface p-0 text-ceriga-text [&>button]:text-ceriga-muted"
        >
          <SheetTitle className="sr-only">Main navigation</SheetTitle>
          <div className="flex h-full flex-col pt-10">
            <div className="border-b border-ceriga-separator px-5 py-4">
              <Link
                to="/dashboard"
                onClick={() => setSheetOpen(false)}
                className="font-display text-[17px] font-semibold tracking-tight"
              >
                Ceriga Studio
              </Link>
            </div>
            <NavLinks onNavigate={() => setSheetOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>

      <aside
        className={`${
          isCollapsed ? 'w-[72px]' : 'w-[240px]'
        } fixed left-0 top-0 z-40 hidden h-dvh flex-col border-r border-ceriga-separator bg-ceriga-surface transition-all duration-300 lg:flex`}
      >
        <div
          className={`${
            isCollapsed ? 'justify-center px-2 py-4' : 'justify-between px-4 py-4'
          } flex items-center border-b border-ceriga-separator`}
        >
          {!isCollapsed && (
            <Link to="/dashboard" className="font-display text-[15px] font-semibold tracking-tight text-ceriga-text">
              Ceriga Studio
            </Link>
          )}

          <button
            type="button"
            onClick={() => setIsCollapsed((prev) => !prev)}
            className={`flex size-8 items-center justify-center rounded-full bg-ceriga-elevated text-ceriga-muted hover:bg-ceriga-elevated-2 hover:text-ceriga-text ${
              isCollapsed ? 'mx-auto' : ''
            }`}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {isCollapsed && (
          <div className="flex justify-center border-b border-ceriga-separator px-2 py-3">
            <Link to="/dashboard" className="font-display text-[13px] font-semibold text-ceriga-text">
              CS
            </Link>
          </div>
        )}

        <NavLinks collapsed={isCollapsed} />
      </aside>

      <main
        className="min-h-dvh overflow-x-hidden transition-all duration-300 lg:pt-0"
        style={{
          marginLeft: isLgUp ? sidebarWidth : 0,
          paddingTop: isLgUp ? 0 : 'calc(3rem + env(safe-area-inset-top))',
        }}
      >
        {isLgUp && location.pathname !== '/dashboard' && (
          <div className="fixed right-6 top-5 z-30">
            <NotificationBell />
          </div>
        )}
        {children}
      </main>
    </div>
  );
}
