import { SiteHeader, SiteFooter } from '@/components/site-layout'
import { Calculator, Droplets, Gauge, Thermometer } from 'lucide-react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '计算工具',
  description: '化工原理在线计算工具：雷诺数计算、流体阻力计算、传热系数估算等',
}

const tools = [
  {
    slug: 'reynolds',
    name: '雷诺数计算器',
    description: '计算流体在管道中流动的雷诺数，判断流动状态（层流/湍流）',
    icon: Droplets,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    slug: 'friction',
    name: '流体阻力计算器',
    description: '计算直管沿程阻力损失，支持层流和湍流条件下的摩擦系数计算',
    icon: Gauge,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    slug: 'heat-transfer',
    name: '传热系数估算',
    description: '估算法计算对流传热系数和总传热系数，辅助换热器设计',
    icon: Thermometer,
    color: 'from-orange-500 to-red-500',
  },
]

export default function ToolsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-slate-50 to-white border-b">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              <Calculator className="h-6 w-6 text-[#0B4F6C]" />
              <h1 className="text-3xl font-bold text-slate-800">化工计算工具</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              嵌入核心公式的交互式计算器，辅助理解化工原理中的关键计算
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <Link key={tool.slug} href={`/tools/${tool.slug}`}>
                  <Card className="group h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-slate-200 cursor-pointer overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${tool.color}`} />
                    <CardHeader>
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-[#0B4F6C]">
                        <tool.icon className="h-6 w-6" />
                      </div>
                      <CardTitle className="mt-4 text-lg text-slate-800 group-hover:text-[#0B4F6C] transition-colors">
                        {tool.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {tool.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-[#0B4F6C] font-medium">
                        <span>开始计算</span>
                        <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}