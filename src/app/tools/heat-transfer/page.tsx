'use client'

import { useState } from 'react'
import { SiteHeader, SiteFooter } from '@/components/site-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Thermometer, Info } from 'lucide-react'
import Link from 'next/link'

const heatCases = [
  {
    label: '水—水换热（强制对流）',
    range: '800 ~ 1500 W/(m²·K)',
    hi: 1000,
    ho: 1200,
  },
  {
    label: '水—油换热',
    range: '100 ~ 300 W/(m²·K)',
    hi: 800,
    ho: 200,
  },
  {
    label: '水—空气换热（水侧）',
    range: '10 ~ 60 W/(m²·K)',
    hi: 1000,
    ho: 30,
  },
  {
    label: '气体—气体换热',
    range: '10 ~ 50 W/(m²·K)',
    hi: 30,
    ho: 25,
  },
  {
    label: '蒸汽冷凝加热水',
    range: '1000 ~ 4000 W/(m²·K)',
    hi: 5000,
    ho: 1200,
  },
]

const wallResistance = 0.0001

export default function HeatTransferPage() {
  const [selectedCase, setSelectedCase] = useState<number | null>(null)
  const [manualHi, setManualHi] = useState('')
  const [manualHo, setManualHo] = useState('')
  const [showManual, setShowManual] = useState(false)

  const getK = (hi: number, ho: number) => {
    return 1 / (1 / hi + wallResistance + 1 / ho)
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
              <Thermometer className="h-5 w-5 text-[#d97706]" />
            </div>
            <h1 className="text-3xl font-bold text-[#2c2a29]">传热系数估算</h1>
          </div>
          <p className="text-[#7c756e] mb-8">
            1/K = 1/hᵢ + R_w + 1/hₒ &nbsp;—&nbsp; 典型换热工况对流传热系数范围
          </p>

          <div className="grid gap-8 lg:grid-cols-5">
            <Card className="lg:col-span-2 border-[#eae5db] shadow-sm">
              <CardHeader>
                <CardTitle className="text-base text-[#2c2a29]">选择工况</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {heatCases.map((hc, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedCase(idx)
                      setShowManual(false)
                    }}
                    className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${
                      selectedCase === idx
                        ? 'border-[#d97706] bg-[#d97706]/5 text-[#d97706] font-medium'
                        : 'border-[#eae5db] bg-white text-[#2c2a29] hover:bg-[#f5efe6] hover:border-[#d97706]/30'
                    }`}
                  >
                    <div className="font-medium">{hc.label}</div>
                    <div className="text-xs text-[#7c756e] font-mono mt-0.5">{hc.range}</div>
                  </button>
                ))}

                <div className="pt-4 border-t border-[#eae5db]">
                  <button
                    onClick={() => {
                      setShowManual(true)
                      setSelectedCase(null)
                    }}
                    className={`w-full text-left p-3 rounded-lg border text-sm transition-all ${
                      showManual
                        ? 'border-[#d97706] bg-[#d97706]/5'
                        : 'border-[#eae5db] bg-white hover:bg-[#f5efe6]'
                    }`}
                  >
                    <span className="font-medium text-[#2c2a29]">手动输入</span>
                  </button>
                </div>

                {showManual && (
                  <div className="space-y-3 pt-3">
                    <div>
                      <label className="block text-xs text-[#7c756e] mb-1">对流传热系数 hᵢ (W/m²·K)</label>
                      <input
                        type="number"
                        value={manualHi}
                        onChange={(e) => setManualHi(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-[#eae5db] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]/30"
                        placeholder="500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#7c756e] mb-1">对流传热系数 hₒ (W/m²·K)</label>
                      <input
                        type="number"
                        value={manualHo}
                        onChange={(e) => setManualHo(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-[#eae5db] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#d97706]/30"
                        placeholder="800"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="lg:col-span-3 border-[#eae5db] shadow-sm">
              <CardHeader>
                <CardTitle className="text-base text-[#2c2a29]">传热系数分析</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedCase === null && !showManual ? (
                  <div className="flex flex-col items-center justify-center py-12 text-[#7c756e]">
                    <Info className="h-10 w-10 mb-3" />
                    <p className="text-sm">选择左侧工况或手动输入参数</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {(showManual && manualHi && manualHo) || selectedCase !== null ? (
                      <>
                        {(selectedCase !== null) && (
                          <div className="p-5 rounded-xl border border-[#eae5db] bg-[#fbf9f6]">
                            <div className="flex justify-between items-center mb-3">
                              <span className="text-sm font-medium text-[#2c2a29]">{heatCases[selectedCase].label}</span>
                              <span className="text-xs font-mono text-[#7c756e] bg-white px-2 py-0.5 rounded border border-[#eae5db]">
                                {heatCases[selectedCase].range}
                              </span>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <div className="text-xs text-[#7c756e]">hᵢ (管内)</div>
                                <div className="text-lg font-bold text-[#d97706] font-mono">{heatCases[selectedCase].hi}</div>
                              </div>
                              <div>
                                <div className="text-xs text-[#7c756e]">hₒ (管外)</div>
                                <div className="text-lg font-bold text-[#d97706] font-mono">{heatCases[selectedCase].ho}</div>
                              </div>
                              <div>
                                <div className="text-xs text-[#7c756e]">总传热系数 K</div>
                                <div className="text-lg font-bold text-[#2c2a29] font-mono">
                                  {getK(heatCases[selectedCase].hi, heatCases[selectedCase].ho).toFixed(1)}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {showManual && manualHi && manualHo && (
                          <div className="p-5 rounded-xl border border-[#eae5db] bg-[#fbf9f6]">
                            <div className="grid grid-cols-3 gap-4">
                              <div>
                                <div className="text-xs text-[#7c756e]">hᵢ (管内)</div>
                                <div className="text-lg font-bold text-[#d97706] font-mono">{manualHi}</div>
                              </div>
                              <div>
                                <div className="text-xs text-[#7c756e]">hₒ (管外)</div>
                                <div className="text-lg font-bold text-[#d97706] font-mono">{manualHo}</div>
                              </div>
                              <div>
                                <div className="text-xs text-[#7c756e]">总传热系数 K</div>
                                <div className="text-lg font-bold text-[#2c2a29] font-mono">
                                  {getK(parseFloat(manualHi) || 0, parseFloat(manualHo) || 0).toFixed(1)}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="p-4 rounded-xl border border-[#eae5db] bg-white">
                          <span className="text-xs font-medium text-[#d97706] uppercase tracking-wider">传热阻力构成</span>
                          <div className="mt-3 space-y-2">
                            {(() => {
                              const hi = selectedCase !== null ? heatCases[selectedCase].hi : parseFloat(manualHi) || 0
                              const ho = selectedCase !== null ? heatCases[selectedCase].ho : parseFloat(manualHo) || 0
                              const ri = 1/hi
                              const rw = wallResistance
                              const ro = 1/ho
                              const total = ri + rw + ro
                              const bar = (v: number) => `${(v/total * 100).toFixed(1)}%`
                              return (
                                <>
                                  <div className="flex items-center gap-3 text-sm">
                                    <span className="w-20 text-[#7c756e]">管内热阻 Rᵢ</span>
                                    <div className="flex-1 h-3 rounded-full bg-[#f5efe6] overflow-hidden">
                                      <div className="h-full bg-[#d97706] rounded-full" style={{ width: bar(ri) }} />
                                    </div>
                                    <span className="w-16 text-right font-mono text-xs">{bar(ri)}</span>
                                  </div>
                                  <div className="flex items-center gap-3 text-sm">
                                    <span className="w-20 text-[#7c756e]">壁面热阻 R_w</span>
                                    <div className="flex-1 h-3 rounded-full bg-[#f5efe6] overflow-hidden">
                                      <div className="h-full bg-[#7c756e] rounded-full" style={{ width: bar(rw) }} />
                                    </div>
                                    <span className="w-16 text-right font-mono text-xs">{bar(rw)}</span>
                                  </div>
                                  <div className="flex items-center gap-3 text-sm">
                                    <span className="w-20 text-[#7c756e]">管外热阻 Rₒ</span>
                                    <div className="flex-1 h-3 rounded-full bg-[#f5efe6] overflow-hidden">
                                      <div className="h-full bg-[#1b9aaa] rounded-full" style={{ width: bar(ro) }} />
                                    </div>
                                    <span className="w-16 text-right font-mono text-xs">{bar(ro)}</span>
                                  </div>
                                </>
                              )
                            })()}
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-[#7c756e]">
                        <p className="text-sm">请填写手动输入的 hᵢ 和 hₒ 值</p>
                      </div>
                    )}
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