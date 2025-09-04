import estateflowLogo from "@/assets/estateflow-logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Lock, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  onChatReset?: () => void;
}

export function Header({ onChatReset }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
    onChatReset?.();
  };
  return (
    <header className="bg-estate-bg-secondary border-b border-estate-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Logo and Title */}
        <div 
          className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleLogoClick}
        >
          <img src={estateflowLogo} alt="EstateFlow Logo" className="w-10 h-10 rounded-lg" />
          <h1 className="text-2xl font-bold text-estate-text-primary">Prism</h1>
        </div>

        {/* Right side - Navigation and User */}
        <div className="flex items-center gap-6">
          {/* Navigation Links */}
          <NavLink 
            to="/ueber-uns" 
            className={({ isActive }) => 
              `text-sm font-medium transition-colors hover:text-estate-purple ${
                isActive ? 'text-estate-purple' : 'text-estate-text-secondary'
              }`
            }
          >
            Über
          </NavLink>
          
          <NavLink 
            to="/wissen" 
            className={({ isActive }) => 
              `text-sm font-medium transition-colors hover:text-estate-purple ${
                isActive ? 'text-estate-purple' : 'text-estate-text-secondary'
              }`
            }
          >
            Wissen
          </NavLink>

          {/* Security Lock Icon */}
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center">
                <Lock className="h-4 w-4 text-muted-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sichere Umgebung</p>
            </TooltipContent>
          </Tooltip>

          {/* User Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="" alt="Max" />
                  <AvatarFallback className="bg-estate-purple text-primary-foreground">
                    JW
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-estate-text-primary">Joachim</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end">
              <DropdownMenuLabel className="pb-2">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Joachim Wintzer</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>
                <div className="flex flex-col space-y-1 w-full">
                  <div className="text-xs">Managing Director, EDGE</div>
                  <div className="text-xs text-muted-foreground">Heute, 09:42 Uhr</div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs">Online</span>
                  </div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}