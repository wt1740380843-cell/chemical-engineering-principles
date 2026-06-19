'use client'

import { useState, useCallback } from 'react'
import { SiteHeader, SiteFooter } from '@/components/site-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Gauge, Info } from 'lucide-react'
import Link from 'next/link'

export default function FrictionPage() {
  const [reynolds, setReynolds] = useState('50000')
  const [roughness, setRoughness] = useState('0.0002')
  const [diameter, setDiameter] = useState('0.05')
  const [length, setLength] = useState('10')
  const [velocity, setVelocity] = useState('1.5')
  const [result, setResult] = useState<{ lambda: number; hf: number } | null>(null)

  const calculate = useCallback(() => {
    const re = parseFloat(reynolds)
    const eps = parseFloat(roughness)
    const d = parseFloat(diameter)
    const l = parseFloat(length)
    const u = parseFloat(velocity)
    const g = 9.81

    if (re > 0 && d > 0 && l > 0 && u > 0) {
      let lambda: number
      if (re < 2000) {
        lambda = 64 / re
      } else {
        // Haaland approximation
        const term = -1.8 * Math.log10(((eps / d) / 3.7) ** 1.11 + 6.9 / re)
        lambda = (1 / term) ** 2
      }
      const hf = lambda * (l / d) * (u ** 2) / (2 * g)
      setResult({ lambda, hf })
    }
  }, [reynolds, roughness, diameter, length, velocity])

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
              <Gauge className="h-5 w-5 text-[#d97706]" />
            </div>
            <h1 className="text-3xl font-bold text-[#2c2a29]">流体阻力计算器</h1>
          </div>
          <p className="text-[#7c756e] mb-8">hf = λ · (l/d) · (u²/2g) &nbsp;—&nbsp; 直管沿程阻力损失计算</p>

          <div className="grid gap-8 lg:grid-cols-5">
            <Card className="lg:col-span-2 border-[#eae5db] shadow-sm">
              <CardHeader>
                <CardTitle className="text-base text-[#2c2a29]">输入参数</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-sm text-[#2c2a29]">雷诺数 Re</Label>
                  <Input
                    type="number"
                    value={reynolds}
                    onChange={(e) => setReynolds(e.target.value)}
                    className="border-[#eae5db] focus-visible:ring-[#d97706] bg-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-[#2c2a29]">粗糙度 ε (m)</Label>
                  <Input
                    type="number"
                    value={roughness}
                    onChange={(e) => setRoughness(e.target.value)}
                    className="border-[#eae5db] focus-visible:ring-[#d97706] bg-white"
                    placeholder="0.0002 (钢管)"
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
                  <Label className="text-sm text-[#2c2a29]">管长 l (m)</Label>
                  <Input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="border-[#eae5db] focus-visible:ring-[#d97706] bg-white"
                    placeholder="10"
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
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-5 rounded-xl border border-[#eae5db] bg-[#fbf9f6]">
                        <div className="text-xs text-[#7c756e] mb-1">摩擦系数 λ</div>
                        <div className="text-2xl font-bold text-[#2c2a29] font-mono">
                          {result.lambda.toFixed(4)}
                        </div>
                      </div>
                      <div className="p-5 rounded-xl border border-[#eae5db] bg-[#fbf9f6]">
                        <div className="text-xs text-[#7c756e] mb-1">阻力损失 hf (m 液柱)</div>
                        <div className="text-2xl font-bold text-[#d97706] font-mono">
                          {result.hf.toFixed(3)}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-[#eae5db] bg-white">
                      <span className="text-xs font-medium text-[#d97706] uppercase tracking-wider">详细计算</span>
                      <pre className="mt-2 text-sm font-mono text-[#7c756e] leading-relaxed">
                        λ = {result.lambda.toFixed(4)}{'\n'}
                        hf = λ · (l/d) · (u²/2g){'\n'}
                        &nbsp;&nbsp;= {result.lambda.toFixed(4)} × ({length}/{diameter}) × ({velocity}²/(2×9.81)){'\n'}
                        &nbsp;&nbsp;= {result.hf.toFixed(3)} m 液柱
                      </pre>
                    </div>

                    <div className="p-4 rounded-xl border border-[#eae5db] bg-[#fbf9f6]">
                      <span className="text-xs font-medium text-[#d97706] uppercase tracking-wider">参考：当量粗糙度 ε</span>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                        <div className="flex justify-between"><span className="text-[#7c756e]">拉拔钢管</span><span className="font-mono">0.000015 m</span></div>
                        <div className="flex justify-between"><span className="text-[#7c756e]">焊接钢管</span><span className="font-mono">0.0002 m</span></div>
                        <div className="flex justify-between"><span className="text-[#7c756e]">铸铁管</span><span className="font-mono">0.0003 m</span></div>
                        <div className="flex justify-between"><span className="text-[#7c756e]">混凝土管</span><span className="font-mono">0.001~0.01 m</span></div>
                      </div>
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