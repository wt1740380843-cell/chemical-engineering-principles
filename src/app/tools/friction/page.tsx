'use client'

import { useState } from 'react'
import { SiteHeader, SiteFooter } from '@/components/site-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Gauge, Info } from 'lucide-react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function FrictionCalculator() {
  const [reynolds, setReynolds] = useState('10000')
  const [roughness, setRoughness] = useState('0.0001')
  const [diameter, setDiameter] = useState('0.05')
  const [length, setLength] = useState('10')
  const [velocity, setVelocity] = useState('1.0')
  const [result, setResult] = useState<{
    lambda: number
    hf: number
    regime: string
  } | null>(null)

  function calculate() {
    const Re = parseFloat(reynolds)
    const ε = parseFloat(roughness)
    const d = parseFloat(diameter)
    const L = parseFloat(length)
    const u = parseFloat(velocity)

    if (!Re || Re <= 0 || !d || !L || !u) return

    let lambda: number
    let regime: string

    if (Re <= 2000) {
      // 层流：理论解
      lambda = 64 / Re
      regime = '层流 (64/Re)'
    } else {
      // 湍流：Colebrook 公式迭代近似 (Haaland 公式)
      const ε_d = ε / d
      const a = -1.8 * Math.log10((ε_d / 3.7) ** 1.11 + 6.9 / Re)
      lambda = (1 / a) ** 2
      regime = '湍流 (Colebrook-Haaland)'
    }

    // 达西-魏斯巴赫公式
    const hf = lambda * (L / d) * (u ** 2 / (2 * 9.81))

    setResult({
      lambda: Math.round(lambda * 10000) / 10000,
      hf: Math.round(hf * 1000) / 1000,
      regime,
    })
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
              <span className="text-slate-700 font-medium">流体阻力计算器</span>
            </div>
          </div>
        </div>

        <section className="py-10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <Gauge className="h-6 w-6 text-[#0B4F6C]" />
              <div>
                <h1 className="text-2xl font-bold text-slate-800">流体阻力计算器</h1>
                <p className="text-sm text-muted-foreground">hf = λ·(l/d)·(u²/2g) — 直管沿程阻力损失</p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="text-base text-slate-800">输入参数</CardTitle>
                  <CardDescription>雷诺数可通过雷诺数计算器获得</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="reynolds">雷诺数 Re</Label>
                    <Input
                      id="reynolds"
                      type="number"
                      value={reynolds}
                      onChange={(e) => setReynolds(e.target.value)}
                      placeholder="10000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="roughness">管壁粗糙度 ε (m)</Label>
                    <Input
                      id="roughness"
                      type="number"
                      step="0.00001"
                      value={roughness}
                      onChange={(e) => setRoughness(e.target.value)}
                      placeholder="0.0001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="diameter_f">管道内径 d (m)</Label>
                    <Input
                      id="diameter_f"
                      type="number"
                      step="0.001"
                      value={diameter}
                      onChange={(e) => setDiameter(e.target.value)}
                      placeholder="0.05"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="length_f">管长 L (m)</Label>
                    <Input
                      id="length_f"
                      type="number"
                      step="0.1"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="velocity_f">流速 u (m/s)</Label>
                    <Input
                      id="velocity_f"
                      type="number"
                      step="0.01"
                      value={velocity}
                      onChange={(e) => setVelocity(e.target.value)}
                      placeholder="1.0"
                    />
                  </div>
                  <Button onClick={calculate} className="w-full bg-[#0B4F6C] hover:bg-[#0B4F6C]/90">
                    计算阻力损失
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
                      <CardContent className="space-y-4">
                        <div className="text-center py-2">
                          <div className="text-sm text-muted-foreground">沿程阻力损失 hf</div>
                          <div className="text-3xl font-bold text-slate-800 font-mono">
                            {result.hf} m
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">(米流体柱高度)</div>
                        </div>
                        <div className="border-t pt-4 grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">摩擦系数 λ</div>
                            <div className="font-mono font-medium text-slate-800">{result.lambda}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">计算方法</div>
                            <div className="font-medium text-slate-800">{result.regime}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Alert className="border-slate-200 bg-slate-50">
                      <Info className="h-4 w-4 text-[#0B4F6C]" />
                      <AlertTitle className="text-sm font-medium text-slate-800">说明</AlertTitle>
                      <AlertDescription className="text-sm text-muted-foreground mt-1">
                        湍流区使用 Haaland 公式近似 Colebrook 方程，精度满足工程计算要求。
                        层流区使用理论解 λ = 64/Re。结果未包含局部阻力。
                      </AlertDescription>
                    </Alert>
                  </>
                )}

                <Card className="border-slate-200 bg-slate-50">
                  <CardHeader>
                    <CardTitle className="text-sm text-slate-800">参考粗糙度</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-1.5">
                    <p>• 光滑管（铜管、玻璃管）：ε ≈ 1.5×10⁻⁶ m</p>
                    <p>• 钢管：ε ≈ 0.05~0.1 mm</p>
                    <p>• 铸铁管：ε ≈ 0.2~0.5 mm</p>
                    <p>• 混凝土管：ε ≈ 0.3~3 mm</p>
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