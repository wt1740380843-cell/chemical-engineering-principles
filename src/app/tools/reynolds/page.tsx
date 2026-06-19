'use client'

import { useState, useCallback } from 'react'
import { SiteHeader, SiteFooter } from '@/components/site-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Droplets, Info } from 'lucide-react'
import Link from 'next/link'

export default function ReynoldsPage() {
  const [density, setDensity] = useState('998')
  const [velocity, setVelocity] = useState('1.5')
  const [diameter, setDiameter] = useState('0.05')
  const [viscosity, setViscosity] = useState('0.001')
  const [result, setResult] = useState<number | null>(null)

  const calculate = useCallback(() => {
    const rho = parseFloat(density)
    const u = parseFloat(velocity)
    const d = parseFloat(diameter)
    const mu = parseFloat(viscosity)
    
    if (rho && u && d && mu && mu > 0) {
      const re = (rho * u * d) / mu
      setResult(re)
    }
  }, [density, velocity, diameter, viscosity])

  const getFlowStatus = (re: number) => {
    if (re < 2000) return { text: '层流 (Laminar)', color: 'text-green-600', bg: 'bg-green-50 border-green-200' }
    if (re < 4000) return { text: '过渡流 (Transition)', color: 'text-amber-600', bg: 'bg-amber-50 border-amber-200' }
    return { text: '湍流 (Turbulent)', color: 'text-red-600', bg: 'bg-red-50 border-red-200' }
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-[#fbf9f6]">
        <div className="border-b border-[#eae5db] bg-white">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <Link href="/tools" className="inline-flex items-center gap-1 text-sm text-[#7c756e] hover:text-[#d97706] transition-colors">
              <ArrowLeft className="h-4 w-4" />
              返回工具列表
            </Link>
          </div>
        </div>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5efe6]">
              <Droplets className="h-5 w-5 text-[#d97706]" />
            </div>
            <h1 className="text-3xl font-bold text-[#2c2a29]">雷诺数计算器</h1>
          </div>
          <p className="text-[#7c756e] mb-8">Re = ρ · u · d / μ &nbsp;—&nbsp; 判断流体流动状态</p>

          <div className="grid gap-8 lg:grid-cols-5">
            <Card className="lg:col-span-2 border-[#eae5db] shadow-sm">
              <CardHeader>
                <CardTitle className="text-base text-[#2c2a29]">输入参数</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-sm text-[#2c2a29]">密度 ρ (kg/m³)</Label>
                  <Input
                    type="number"
                    value={density}
                    onChange={(e) => setDensity(e.target.value)}
                    className="border-[#eae5db] focus-visible:ring-[#d97706] bg-white"
                    placeholder="998 (水)"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-[#2c2a29]">流速 u (m/s)</Label>
                  <Input
                    type="number"
                    value={velocity}
                    onChange={(e) => setVelocity(e.target.value)}
                    className="border-[#eae5db] focus-visible:ring-[#d97706] bg-white"
                    placeholder="1.5"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-[#2c2a29]">管径 d (m)</Label>
                  <Input
                    type="number"
                    value={diameter}
                    onChange={(e) => setDiameter(e.target.value)}
                    className="border-[#eae5db] focus-visible:ring-[#d97706] bg-white"
                    placeholder="0.05"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-[#2c2a29]">动力粘度 μ (Pa·s)</Label>
                  <Input
                    type="number"
                    value={viscosity}
                    onChange={(e) => setViscosity(e.target.value)}
                    className="border-[#eae5db] focus-visible:ring-[#d97706] bg-white"
                    placeholder="0.001 (水, 20°C)"
                  />
                </div>
                <Button
                  onClick={calculate}
                  className="w-full bg-[#d97706] hover:bg-[#d97706]/90 text-white shadow-sm"
                >
                  计算
                </Button>
              </CardContent>
            </Card>

            <Card className="lg:col-span-3 border-[#eae5db] shadow-sm">
              <CardHeader>
                <CardTitle className="text-base text-[#2c2a29]">计算结果</CardTitle>
              </CardHeader>
              <CardContent>
                {result === null ? (
                  <div className="flex flex-col items-center justify-center py-12 text-[#7c756e]">
                    <Info className="h-10 w-10 mb-3" />
                    <p className="text-sm">输入参数后点击"计算"查看结果</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="p-6 rounded-xl border border-[#eae5db] bg-[#fbf9f6]">
                      <div className="text-xs text-[#7c756e] mb-1">雷诺数 Re</div>
                      <div className="text-3xl font-bold text-[#2c2a29] font-mono">
                        {result.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                      </div>
                    </div>

                    <div className={`p-5 rounded-xl border ${getFlowStatus(result).bg}`}>
                      <div className="text-xs text-[#7c756e] mb-1">流动状态</div>
                      <div className={`text-lg font-bold ${getFlowStatus(result).color}`}>
                        {getFlowStatus(result).text}
                      </div>
                      <p className="text-sm text-[#7c756e] mt-2">
                        {result < 2000
                          ? '层流：流体呈平行层状流动，黏性力主导'
                          : result < 4000
                          ? '过渡流：流态不稳定，处于层流向湍流的过渡区'
                          : '湍流：流体呈无序涡旋运动，惯性力主导'}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl border border-[#eae5db] bg-white">
                      <span className="text-xs font-medium text-[#d97706] uppercase tracking-wider">计算依据</span>
                      <pre className="mt-2 text-sm font-mono text-[#7c756e]">
                        Re = {density} × {velocity} × {diameter} / {viscosity}
                        {'\n'}= {result.toLocaleString(undefined, { maximumFractionDigits: 1 })}
                      </pre>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}