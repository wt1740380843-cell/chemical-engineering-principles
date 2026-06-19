'use client'

import { useState } from 'react'
import { SiteHeader, SiteFooter } from '@/components/site-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Droplets, Info } from 'lucide-react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function ReynoldsCalculator() {
  const [density, setDensity] = useState('1000')
  const [velocity, setVelocity] = useState('1.0')
  const [diameter, setDiameter] = useState('0.05')
  const [viscosity, setViscosity] = useState('0.001')
  const [result, setResult] = useState<{
    re: number
    regime: string
    color: string
    desc: string
  } | null>(null)

  function calculate() {
    const ρ = parseFloat(density)
    const u = parseFloat(velocity)
    const d = parseFloat(diameter)
    const μ = parseFloat(viscosity)

    if (!ρ || !u || !d || !μ || μ === 0) return

    const re = (ρ * u * d) / μ
    let regime: string
    let color: string
    let desc: string

    if (re <= 2000) {
      regime = '层流 (Laminar)'
      color = 'text-blue-600 bg-blue-50 border-blue-200'
      desc = '流体分层流动，质点沿轴向做规则运动，无径向混合。适合粘度大的流体或低速小管径条件。'
    } else if (re >= 4000) {
      regime = '湍流 (Turbulent)'
      color = 'text-red-600 bg-red-50 border-red-200'
      desc = '流体质点做不规则运动，存在强烈的径向混合与涡旋。传热传质效率高，但流动阻力大。'
    } else {
      regime = '过渡区 (Transition)'
      color = 'text-amber-600 bg-amber-50 border-amber-200'
      desc = '流动状态不稳定，介于层流与湍流之间。实际工程设计应避免在此区域操作。'
    }

    setResult({ re: Math.round(re * 100) / 100, regime, color, desc })
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="border-b bg-slate-50/80">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-[#0B4F6C]">首页</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/tools" className="hover:text-[#0B4F6C]">计算工具</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-slate-700 font-medium">雷诺数计算器</span>
            </div>
          </div>
        </div>

        <section className="py-10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <Droplets className="h-6 w-6 text-[#0B4F6C]" />
              <div>
                <h1 className="text-2xl font-bold text-slate-800">雷诺数计算器</h1>
                <p className="text-sm text-muted-foreground">Re = duρ/μ — 判断流体流动状态</p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="text-base text-slate-800">输入参数</CardTitle>
                  <CardDescription>请输入流体物性与管道条件</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="density">流体密度 ρ (kg/m³)</Label>
                    <Input
                      id="density"
                      type="number"
                      step="0.1"
                      value={density}
                      onChange={(e) => setDensity(e.target.value)}
                      placeholder="1000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="velocity">流速 u (m/s)</Label>
                    <Input
                      id="velocity"
                      type="number"
                      step="0.01"
                      value={velocity}
                      onChange={(e) => setVelocity(e.target.value)}
                      placeholder="1.0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="diameter">管道内径 d (m)</Label>
                    <Input
                      id="diameter"
                      type="number"
                      step="0.001"
                      value={diameter}
                      onChange={(e) => setDiameter(e.target.value)}
                      placeholder="0.05"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="viscosity">流体粘度 μ (Pa·s)</Label>
                    <Input
                      id="viscosity"
                      type="number"
                      step="0.0001"
                      value={viscosity}
                      onChange={(e) => setViscosity(e.target.value)}
                      placeholder="0.001"
                    />
                  </div>
                  <Button onClick={calculate} className="w-full bg-[#0B4F6C] hover:bg-[#0B4F6C]/90">
                    计算雷诺数
                  </Button>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {result && (
                  <>
                    <Card className="border-slate-200">
                      <CardHeader>
                        <CardTitle className="text-base text-slate-800">计算结果</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-4">
                          <div className="text-4xl font-bold text-slate-800 font-mono">
                            Re = {result.re.toLocaleString()}
                          </div>
                          <div className={`mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-full border ${result.color}`}>
                            <Info className="h-4 w-4" />
                            <span className="font-medium">{result.regime}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Alert className="border-slate-200 bg-slate-50">
                      <Info className="h-4 w-4 text-[#0B4F6C]" />
                      <AlertTitle className="text-sm font-medium text-slate-800">流动状态说明</AlertTitle>
                      <AlertDescription className="text-sm text-muted-foreground mt-1">
                        {result.desc}
                      </AlertDescription>
                    </Alert>
                  </>
                )}

                <Card className="border-slate-200 bg-slate-50">
                  <CardHeader>
                    <CardTitle className="text-sm text-slate-800">参考值</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-1.5">
                    <p>• 常温水的密度 ≈ 1000 kg/m³，粘度 ≈ 0.001 Pa·s</p>
                    <p>• 空气密度 ≈ 1.2 kg/m³，粘度 ≈ 1.8×10⁻⁵ Pa·s</p>
                    <p>• Re ≤ 2000：层流；Re ≥ 4000：湍流</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}