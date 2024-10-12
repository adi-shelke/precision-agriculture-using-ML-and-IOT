import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  tabs: { id: string; label: string }[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  tabs,
  activeTab,
  setActiveTab,
  sidebarOpen,
  setSidebarOpen,
}) => {
  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-[#8dca3c] shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full sidebar-div"
      )}
    >
      <div className="flex items-center justify-between h-16 px-6 border-b">
        <h1 className="text-xl font-semibold text-[#dee42f]">Farm Dashboard</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
      <nav className="mt-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setSidebarOpen(false);
            }}
            className={cn(
              "flex items-center w-full px-6 py-3 text-left",
              activeTab === tab.id
                ? "bg-[#1a751a] text-white font-semibold border-white"
                : "text-white hover:bg-[#3f872e]"
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};
