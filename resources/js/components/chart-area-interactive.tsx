"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Incident } from "@/types"
import { Activity, TrendingUp, TrendingDown } from "lucide-react"

export const description = "An interactive area chart"

const chartConfig = {
  incidents: {
    label: "Incidents",
    color: "var(--primary)",
  },
  resolved: {
    label: "Résolus",
    color: "#10b981", // Emerald-500
  },
  pending: {
    label: "En attente",
    color: "#f59e0b", // Amber-500
  },
} satisfies ChartConfig

interface Props {
  chartData: Incident[]
}

export function ChartAreaInteractive({chartData}: Props) {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  // Transformer les données pour le graphique
  const transformData = (data: Incident[], range: string) => {
    const now = new Date()
    let days = 90
    if (range === "30d") days = 30
    if (range === "7d") days = 7
    
    const startDate = new Date(now)
    startDate.setDate(startDate.getDate() - days)
    
    // Grouper par jour
    const dailyData: Record<string, { date: string, incidents: number, resolved: number, pending: number }> = {}
    
    data.forEach(item => {
      const date = new Date(item.created_at)
      if (date >= startDate) {
        const dateKey = date.toISOString().split('T')[0]
        
        if (!dailyData[dateKey]) {
          dailyData[dateKey] = {
            date: dateKey,
            incidents: 0,
            resolved: 0,
            pending: 0
          }
        }
        
        dailyData[dateKey].incidents++
        if (item.statut === 'Résolu' || item.statut === 'Terminé') {
          dailyData[dateKey].resolved++
        } else if (item.statut === 'En attente') {
          dailyData[dateKey].pending++
        }
      }
    })
    
    // Convertir en tableau et trier
    return Object.values(dailyData)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map(item => ({
        ...item,
        date: new Date(item.date).toLocaleDateString('fr-FR', { 
          month: 'short', 
          day: 'numeric' 
        })
      }))
  }

  const chartDataTransformed = transformData(chartData, timeRange)

  // Calculer les statistiques
  const totalIncidents = chartDataTransformed.reduce((sum, day) => sum + day.incidents, 0)
  const totalResolved = chartDataTransformed.reduce((sum, day) => sum + day.resolved, 0)
  const growthRate = chartDataTransformed.length > 1 
    ? ((chartDataTransformed[chartDataTransformed.length - 1].incidents - chartDataTransformed[0].incidents) / chartDataTransformed[0].incidents * 100).toFixed(1)
    : "0"

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-blue-50 dark:from-slate-800 dark:to-slate-900/50">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl text-gray-900 dark:text-white">
              <Activity className="h-5 w-5 text-blue-500" />
              Activité des incidents
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              <span className="hidden md:inline">Évolution des incidents sur la période sélectionnée</span>
              <span className="md:hidden">Période sélectionnée</span>
            </CardDescription>
          </div>
          <CardAction>
            <ToggleGroup
              type="single"
              value={timeRange}
              onValueChange={setTimeRange}
              variant="outline"
              className="hidden md:flex *:data-[slot=toggle-group-item]:!px-4"
            >
              <ToggleGroupItem 
                value="90d" 
                className="data-[state=on]:bg-gradient-to-r data-[state=on]:from-blue-500 data-[state=on]:to-cyan-500 data-[state=on]:text-white"
              >
                3 mois
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="30d"
                className="data-[state=on]:bg-gradient-to-r data-[state=on]:from-emerald-500 data-[state=on]:to-green-500 data-[state=on]:text-white"
              >
                30 jours
              </ToggleGroupItem>
              <ToggleGroupItem 
                value="7d"
                className="data-[state=on]:bg-gradient-to-r data-[state=on]:from-purple-500 data-[state=on]:to-indigo-500 data-[state=on]:text-white"
              >
                7 jours
              </ToggleGroupItem>
            </ToggleGroup>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger
                className="w-full md:w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate md:hidden"
                size="sm"
                aria-label="Select a value"
              >
                <SelectValue placeholder="Last 3 months" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="90d" className="rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    3 derniers mois
                  </div>
                </SelectItem>
                <SelectItem value="30d" className="rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                    30 derniers jours
                  </div>
                </SelectItem>
                <SelectItem value="7d" className="rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                    7 derniers jours
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </CardAction>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {/* Stats en haut du graphique */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="p-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Total incidents</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalIncidents}</div>
          </div>
          <div className="p-3 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/30 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Taux de résolution</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {totalIncidents > 0 ? Math.round((totalResolved / totalIncidents) * 100) : 0}%
            </div>
          </div>
          <div className="p-3 bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 rounded-lg">
            <div className="text-sm text-gray-600 dark:text-gray-400">Croissance</div>
            <div className="flex items-center gap-1">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">{growthRate}%</span>
              {parseFloat(growthRate) >= 0 ? (
                <TrendingUp className="h-4 w-4 text-green-500" />
              ) : (
                <TrendingDown className="h-4 w-4 text-red-500" />
              )}
            </div>
          </div>
        </div>

        {/* Graphique responsive */}
        <div className="w-full h-[300px] md:h-[250px]">
          <ChartContainer
            config={chartConfig}
            className="w-full h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartDataTransformed}>
                <defs>
                  <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorResolved" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="#e5e7eb" 
                  strokeOpacity={0.3}
                  vertical={false}
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={isMobile ? 50 : 30}
                  fontSize={isMobile ? 10 : 12}
                  tickFormatter={(value) => {
                    return value
                  }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  fontSize={isMobile ? 10 : 12}
                />
                <ChartTooltip
                  content={
                    <ChartTooltipContent
                      className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 shadow-lg"
                      labelStyle={{ color: '#6b7280', fontSize: '12px' }}
                      formatter={(value, name) => {
                        const formattedValue = typeof value === 'number' ? value.toFixed(0) : value
                        let color = '#3b82f6'
                        if (name === 'Résolus') color = '#10b981'
                        if (name === 'En attente') color = '#f59e0b'
                        
                        return [
                          <span key={name} className="font-semibold text-gray-900 dark:text-white">
                            {formattedValue}
                          </span>,
                          <span key={`${name}-label`} className="ml-2" style={{ color }}>
                            {name}
                          </span>
                        ]
                      }}
                    />
                  }
                />
                <Area
                  type="monotone"
                  dataKey="incidents"
                  stroke="#3b82f6"
                  fill="url(#colorIncidents)"
                  strokeWidth={2}
                  activeDot={{ r: 6, fill: "#3b82f6" }}
                />
                <Area
                  type="monotone"
                  dataKey="resolved"
                  stroke="#10b981"
                  fill="url(#colorResolved)"
                  strokeWidth={2}
                  activeDot={{ r: 6, fill: "#10b981" }}
                />
                <Area
                  type="monotone"
                  dataKey="pending"
                  stroke="#f59e0b"
                  fill="url(#colorPending)"
                  strokeWidth={2}
                  activeDot={{ r: 6, fill: "#f59e0b" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* Légende */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Incidents totaux</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gradient-to-r from-emerald-500 to-green-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Résolus</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">En attente</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}