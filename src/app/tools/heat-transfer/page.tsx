'use client'

import { useState } from 'react'
import { SiteHeader, SiteFooter } from '@/components/site-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Thermometer, Info } from 'lucide-react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

const flowTypes: Record<string, { label: string; hint: string; range: [number, number] }> = {
  'water-turbulent': { label: '水 - 湍流', hint: '强制对流，水在管内湍流', range: [2000, 10000] },
  'water-laminar': { label: '水 - 层流', hint: '强制对流，水在管内层流', range: [100, 2000] },
  'air-turbulent': { label: '空气 - 湍流', hint: '强制对流，空气在管内湍流', range: [30, 300] },
  'air-laminar': { label: '空气 - 层流', hint: '强制对流，空气在管内层流', range: [5, 30] },
  'oil-turbulent': { label: '油类 - 湍流', hint: '强制对流，油在管内湍流', range: [100, 1500] },
  'steam-cond': { label: '蒸汽冷凝', hint: '膜状冷凝', range: [5000, 15000] },
  'water-boil': { label: '水沸腾', hint: '核状沸腾', range: [2500, 25000] },
}

export default function HeatTransferCalculator() {
  const [flowType, setFlowType] = useState('water-turbulent')
  const [customAlpha, setCustomAlpha] = useState('')
  const [result, setResult] = useState<{
    alpha: number
    range: string
  } | null>(null)

  function estimate() {
    const type = flowTypes[flowType]
    if (!type) return

    const avg = (type.range[0] + type.range[1]) / 2
    const rangeStr = `${type.range[0]} ~ ${type.range[1]} W/(m²·K)`

    setResult({
      alpha: Math.round(avg),
      range: rangeStr,
    })
  }

  function calculateCustom() {
    const val = parseFloat(customAlpha)
    if (!val || val <= 0) return
    setResult({
      alpha: val,
      range: '用户自定义输入',
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
              <span className="text-slate-700 font-medium">传热系数估算</span>
            </div>
          </div>
        </div>

        <section className="py-10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-6">
              <Thermometer className="h-6 w-6 text-[#0B4F6C]" />
              <div>
                <h1 className="text-2xl font-bold text-slate-800">传热系数估算器</h1>
                <p className="text-sm text-muted-foreground">估算对流传热系数 α 的典型范围</p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              <Card className="border-slate-200">
                <CardHeader>
                  <CardTitle className="text-base text-slate-800">选择工况</CardTitle>
                  <CardDescription>选择换热类型估算传热系数范围</CardDescription>
                </CardHeader>
                <CardContent className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="flow-type">换热类型</Label>
                    <Select value={flowType} onValueChange={setFlowType}>
                      <SelectTrigger id="flow-type">
                        <SelectValue placeholder="选择类型" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(flowTypes).map(([key, val]) => (
                          <SelectItem key={key} value={key}>{val.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {flowTypes[flowType] && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {flowTypes[flowType].hint}
                      </p>
                    )}
                  </div>
                  <Button onClick={estimate} className="w-full bg-[#0B4F6C] hover:bg-[#0B4F6C]/90">
                    估算传热系数
                  </Button>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-muted-foreground">或手动输入</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom-alpha">对流传热系数 α (W/(m²·K))</Label>
                    <div className="flex gap-2">
                      <Input
                        id="custom-alpha"
                        type="number"
                        value={customAlpha}
                        onChange={(e) => setCustomAlpha(e.target.value)}
                        placeholder="如: 5000"
                      />
                      <Button variant="outline" onClick={calculateCustom}>确认</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                {result && (
                  <Card className="border-slate-200">
                    <CardHeader>
                      <CardTitle className="text-base text-slate-800">估算结果</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-4">
                        <div className="text-sm text-muted-foreground">对流传热系数 α</div>
                        <div className="text-3xl font-bold text-slate-800 font-mono mt-1">
                          {result.alpha}
                          <span className="text-base font-normal text-muted-foreground"> W/(m²·K)</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          典型范围：{result.range}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <Card className="border-slate-200 bg-slate-50">
                  <CardHeader>
                    <CardTitle className="text-sm text-slate-800">典型传热系数范围参考</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground space-y-1.5">
                    <p>• 水-水换热：1000 ~ 2500 W/(m²·K)</p>
                    <p>• 蒸汽-水换热：2000 ~ 4000 W/(m²·K)</p>
                    <p>• 空气-空气换热：10 ~ 50 W/(m²·K)</p>
                    <p>• 油-水换热：200 ~ 1000 W/(m²·K)</p>
                    <p>• 含不凝气蒸汽冷凝：显著降低</p>
                  </CardContent>
                </Card>

                <Alert className="border-slate-200 bg-slate-50">
                  <Info className="h-4 w-4 text-[#0B4F6C]" />
                  <AlertTitle className="text-sm font-medium text-slate-800">提示</AlertTitle>
                  <AlertDescription className="text-sm text-muted-foreground mt-1">
                    以上为典型估算值范围。实际传热系数受流速、温度、污垢热阻等因素影响，
                    精确设计需参考详细关联式（如 Dittus-Boelter、Sieder-Tate 等）。
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}