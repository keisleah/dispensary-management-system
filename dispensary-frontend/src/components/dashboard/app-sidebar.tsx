import { NavLink } from 'react-router-dom'
import { Home, Stethoscope, ClipboardList, User } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'

const navItems = [
  { title: 'Overview', url: '/dashboard', icon: Home, end: true },
  { title: 'Symptoms', url: '/dashboard/symptoms', icon: Stethoscope, end: false },
  { title: 'Visit history', url: '/dashboard/visits', icon: ClipboardList, end: false },
  { title: 'Profile', url: '/dashboard/profile', icon: User, end: false },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-4">
        <span className="font-display text-lg font-semibold text-ink">
          Student Dispensary
        </span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    render={
                      <NavLink
                        to={item.url}
                        end={item.end}
                        className={({ isActive }) =>
                          isActive ? 'bg-sage/60 text-brand font-medium' : ''
                        }
                      />
                    }
                  >
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}