import { NavLink } from 'react-router-dom'
import { Users, Stethoscope, Pill } from 'lucide-react'
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
  { title: 'Students', url: '/admin/students', icon: Users, end: false },
  { title: 'Symptoms queue', url: '/admin/symptoms', icon: Stethoscope, end: false },
  { title: 'Inventory', url: '/admin/inventory', icon: Pill, end: false },
]

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-4">
        <span className="font-display text-lg font-semibold text-ink">Admin</span>
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