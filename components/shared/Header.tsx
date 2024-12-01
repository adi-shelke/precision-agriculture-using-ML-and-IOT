import { Bell, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ setSidebarOpen }) => {
  return (
    <header className="flex justify-between items-center h-16 px-6 bg-gradient-to-br from-[#4a6320] via-[#849e30] to-[#2e5b1b] border-b">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden"
      >
        <Menu className="h-6 w-6" />
      </Button>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Soil moisture low</DropdownMenuItem>
            <DropdownMenuItem>New crop recommendation available</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button>
          Settings
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </header>
  );
};
