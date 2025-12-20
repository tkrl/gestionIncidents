import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarFooter,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

import { chartData, Incident, User } from "@/types"
import IncidentTable from "@/components/IncidentTable"
import UserTable from "@/components/UserTable"
import { NavUser } from "@/components/nav-user"


interface Props {
  users: User[]
  user: User
}

export default function Utilisateurs({ users, user}: Props) {


  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar  user={user}/>

      <SidebarInset>
        <SiteHeader titre="Utilisateurs"/>
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <UserTable data={users} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
