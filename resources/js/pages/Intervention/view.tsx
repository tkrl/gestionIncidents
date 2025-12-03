import { AppSidebar } from '@/components/app-sidebar';
import Nav from '@/components/Nav';
import { NavMain } from '@/components/nav-main';
import { NavSecondary } from '@/components/nav-secondary';
import { NavUser } from '@/components/nav-user';
import { SectionCards } from '@/components/section-cards';
import { SiteHeader } from '@/components/site-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from '@/components/ui/sidebar';
import UserTable from '@/components/UserTable';
import incident from '@/routes/incident';
import { Incident, User } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { IconChartBar, IconDashboard, IconFolder, IconInnerShadowTop, IconListDetails, IconUsers } from '@tabler/icons-react';
import { TechnicienSidebar } from '@/components/technicientSidebar';
import { NavDocuments } from '@/components/nav-documents';
import { useState } from 'react';

interface Props {
    interventions: Incident[];
    user: User
}

let color: string

export default function view({ interventions, user }: Props) {

    const [filter, setFilter] = useState('En cours')

    const handleChange = () => {
        setFilter(filter)
    }

    const data = {
        navMain: [
            {
                name: "En cours",
                url: "#",
                icon: IconDashboard,
                filter: 'En cours',
            },
            {
                name: "Terminé",
                url: "#",
                icon: IconUsers,
                filter: 'Terminé'
            },
            {
                name: "Résolu",
                url: "#",
                icon: IconFolder,
                filter: 'Résolu'
            },
        ],
    }

    const filterIncidnets = interventions.filter(item => item.statut === filter)
    
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
               <Sidebar collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>

      <SidebarGroupLabel>Mes incidents</SidebarGroupLabel>
      <SidebarMenu>
        {data.navMain.map((item) => (
          <SidebarMenuItem  key={item.name}>
            
            <SidebarMenuButton  className={item.filter === filter ? 'bg-gray-300 hover:bg-gray-300' : 'hover:bg-gray-300'} asChild>
              <a href={item.url} onClick={() => setFilter(item.filter)}>
                <item.icon />
                <span>{item.name}</span>
                
              </a>
        </SidebarMenuButton>
        </SidebarMenuItem>))}
      </SidebarMenu>
        

      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
            <SidebarInset>
                <SiteHeader titre={`Incidents ${filter}`}/>
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            
                            <div className="px-4 lg:px-6 flex flex-wrap gap-7">
                                {filterIncidnets.map((intervention) => (

                                    <Card className="w-full max-w-85" key={intervention.id}>
                                        <CardHeader>
                                            {intervention.image ? (
                                                <div className="h-40 rounded-md object-cover">{intervention.image}</div>
                                            ) : (
                                                <div className="flex h-40  items-center justify-center rounded-md bg-gray-300">
                                                    <p>Pas d'image</p>
                                                </div>
                                            )}
                                        </CardHeader>
                                        <CardContent>
                                            <CardTitle>{intervention.titre}</CardTitle>
                                            <CardDescription>{intervention.description}</CardDescription>
                                            <CardAction>
                                                {intervention.statut === 'En cours' ? <Link href={`/intervention/view/${intervention.id}`} >
                                                    <Button className='cursor-pointer'>Terminer</Button>
                                                </Link> : <p>{intervention.statut}</p>}
                                            </CardAction>

                                        </CardContent>
                                        <CardFooter className='flex justify-between'>
                                            {intervention.priorite === 'elevée' && <Badge className='capitalize bg-red-500'>{intervention.priorite}</Badge>}
                                            {intervention.priorite === 'moyenne' && <Badge className='capitalize bg-yellow-500'>{intervention.priorite}</Badge>}
                                            {intervention.priorite === 'basse' && <Badge className='capitalize bg-green-500'>{intervention.priorite}</Badge>}

                                            <p className='capitalize'>{intervention.categorie.nom}</p>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}

