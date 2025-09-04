import estateflowLogo from "@/assets/estateflow-logo.png";
import { NavLink } from "react-router-dom";
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

export function Header() {
  return (
    <header className="bg-estate-bg-secondary border-b border-estate-border px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Logo and Title */}
        <div className="flex items-center gap-3">
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
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-estate-text-primary">Max</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end">
              <DropdownMenuLabel className="pb-2">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Max Mustermann</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem disabled>
                <div className="flex flex-col space-y-1 w-full">
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Rolle:</span>
                    <span className="text-xs">EDGE, Geschäftsführer</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-muted-foreground">Letzter Login:</span>
                    <span className="text-xs">Heute, 09:42 Uhr</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Status:</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs">Online</span>
                    </div>
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