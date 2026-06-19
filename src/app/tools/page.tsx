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
    badge: 'Re = duρ/μ',
  },
  {
    slug: 'friction',
    name: '流体阻力计算器',
    description: '计算直管沿程阻力损失，支持层流和湍流条件下的摩擦系数计算',
    icon: Gauge,
    badge: 'hf = λ(l/d)(u²/2g)',
  },
  {
    slug: 'heat-transfer',
    name: '传热系数估算',
    description: '估算法计算对流传热系数和总传热系数，辅助换热器设计',
    icon: Thermometer,
    badge: 'α 典型范围',
  },
]

export default function ToolsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-[#eae5db] bg-[#fbf9f6]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5efe6]">
                <Calculator className="h-5 w-5 text-[#d97706]" />
              </div>
              <h1 className="text-3xl font-bold text-[#2c2a29]">化工计算工具</h1>
            </div>
            <p className="text-[#7c756e] max-w-2xl">
              嵌入核心公式的交互式计算器，辅助理解化工原理中的关键计算
            </p>
          </div>
        </section>

        <section className="py-12 bg-[#fbf9f6]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <Link key={tool.slug} href={`/tools/${tool.slug}`}>
                  <div className="group h-full rounded-xl border border-[#eae5db] bg-white p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-[#d97706]/30 cursor-pointer">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f5efe6] text-[#d97706] mb-3">
                      <tool.icon className="h-5 w-5" />
                    </div>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-base font-semibold text-[#2c2a29] group-hover:text-[#d97706] transition-colors">
                        {tool.name}
                      </h3>
                    </div>
                    <span className="inline-block text-[10px] font-mono text-[#7c756e] bg-[#fbf9f6] px-2 py-0.5 rounded border border-[#eae5db] mb-2">
                      {tool.badge}
                    </span>
                    <p className="text-sm text-[#7c756e] leading-relaxed">
                      {tool.description}
                    </p>
                    <div className="mt-4 pt-3 border-t border-[#eae5db]">
                      <span className="flex items-center text-xs font-medium text-[#d97706]">
                        开始计算
                        <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
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