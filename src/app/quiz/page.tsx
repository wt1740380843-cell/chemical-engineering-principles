'use client'

import { useState } from 'react'
import { SiteHeader, SiteFooter } from '@/components/site-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { GraduationCap, CheckCircle2, XCircle, RotateCcw, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface Question {
  id: number
  chapter: string
  question: string
  options: string[]
  answer: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    chapter: '流体流动',
    question: '雷诺数 Re 的物理意义是？',
    options: [
      '惯性力与黏性力的比值',
      '压力与重力的比值',
      '动能与位能的比值',
      '表面张力与黏性力的比值',
    ],
    answer: 0,
    explanation:
      '雷诺数 Re = duρ/μ，表示惯性力与黏性力的比值。Re 越小，黏性力主导，流动趋于层流；Re 越大，惯性力主导，流动趋于湍流。',
  },
  {
    id: 2,
    chapter: '流体流动',
    question: '当 Re ≤ 2000 时，流体流动状态为？',
    options: ['湍流', '层流', '过渡流', '旋流'],
    answer: 1,
    explanation:
      'Re ≤ 2000 为层流区，流体分层流动，质点沿轴向做规则运动。层流时摩擦系数 λ = 64/Re。',
  },
  {
    id: 3,
    chapter: '传热',
    question: '傅里叶定律描述的是哪种传热方式？',
    options: ['热辐射', '对流传热', '热传导', '相变传热'],
    answer: 2,
    explanation:
      '傅里叶定律 q = -λ·dT/dx 描述热传导的基本规律，表示单位时间内通过单位面积的热量与温度梯度成正比。',
  },
  {
    id: 4,
    chapter: '传热',
    question: '增大对流传热系数 α 最有效的工程措施是？',
    options: ['增大壁面厚度', '降低流体流速', '增加流体湍动程度', '减小换热面积'],
    answer: 2,
    explanation:
      '增加流体湍动程度（提高流速或加装扰流元件）能减薄边界层厚度，有效提高对流传热系数 α。',
  },
  {
    id: 5,
    chapter: '蒸馏',
    question: '精馏操作中，回流比 R 的定义是？',
    options: [
      '回流液量 / 馏出液量',
      '馏出液量 / 回流液量',
      '塔顶产品 / 进料量',
      '塔底产品 / 进料量',
    ],
    answer: 0,
    explanation: '回流比 R = L/D，即回流液量 L 与馏出液量 D 之比。回流比越大，分离效果越好，但能耗也越大。',
  },
  {
    id: 6,
    chapter: '蒸馏',
    question: '在精馏塔中，进料热状态参数 q = 1 表示？',
    options: ['冷液进料', '饱和液体进料', '饱和蒸汽进料', '气液混合物进料'],
    answer: 1,
    explanation:
      'q = 1 表示饱和液体进料。q > 1 为冷液进料，q = 0 为饱和蒸汽进料。q 值越大，提馏段负荷相对越大。',
  },
  {
    id: 7,
    chapter: '吸收',
    question: '亨利定律适用于描述？',
    options: [
      '固体在液体中的溶解度',
      '气体在液体中的溶解度（稀溶液）',
      '液体在气体中的挥发度',
      '固体在气体中的升华',
    ],
    answer: 1,
    explanation:
      '亨利定律 p* = Ex 描述稀溶液条件下，溶质在气液两相间的平衡关系。E 为亨利系数，随温度升高而增大。',
  },
  {
    id: 8,
    chapter: '流体输送机械',
    question: '离心泵启动前需进行的操作是？',
    options: ['关闭出口阀', '全开出口阀', '打开放空阀', '关闭进口阀'],
    answer: 0,
    explanation:
      '离心泵启动前应关闭出口阀，以降低启动功率，防止电机过载。启动后再逐渐打开出口阀调节流量。',
  },
  {
    id: 9,
    chapter: '非均相物系分离',
    question: 'Stokes 公式适用于哪种沉降条件？',
    options: ['湍流区沉降', '层流区沉降', '过渡区沉降', '所有区域'],
    answer: 1,
    explanation:
      'Stokes 公式 ut = d²(ρs - ρ)g/(18μ) 适用于层流区（Rep ≤ 2），此时颗粒沉降阻力主要为黏性阻力。',
  },
  {
    id: 10,
    chapter: '干燥',
    question: '恒速干燥阶段，干燥速率主要取决于？',
    options: [
      '物料内部水分扩散速率',
      '外部传质条件（温度、湿度、风速）',
      '物料厚度',
      '物料密度',
    ],
    answer: 1,
    explanation:
      '恒速干燥阶段，物料表面保持湿润，干燥速率由外部传质条件（空气温度、湿度、流速等）控制，与物料性质无关。',
  },
]

export default function QuizPage() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null))

  const question = questions[current]
  const isLast = current === questions.length - 1

  function handleSubmit() {
    if (selected === null) return
    const newAnswers = [...answers]
    newAnswers[current] = selected
    setAnswers(newAnswers)

    if (selected === question.answer) {
      setScore(score + 1)
    }
    setSubmitted(true)
  }

  function handleNext() {
    if (isLast) {
      setFinished(true)
    } else {
      setCurrent(current + 1)
      setSelected(answers[current + 1])
      setSubmitted(false)
    }
  }

  function handlePrev() {
    if (current > 0) {
      setCurrent(current - 1)
      setSelected(answers[current - 1])
      setSubmitted(false)
    }
  }

  function restart() {
    setCurrent(0)
    setSelected(null)
    setSubmitted(false)
    setScore(0)
    setFinished(false)
    setAnswers(new Array(questions.length).fill(null))
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <>
        <SiteHeader />
        <main className="flex-1">
          <section className="py-16">
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
              <GraduationCap className="h-16 w-16 text-[#0B4F6C] mx-auto mb-6" />
              <h1 className="text-3xl font-bold text-slate-800 mb-2">练习完成！</h1>
              <div className="text-6xl font-bold text-[#0B4F6C] my-6">{score}/{questions.length}</div>
              <div className="text-lg text-muted-foreground mb-2">
                正确率 {percentage}%
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3 mb-8 max-w-sm mx-auto">
                <div
                  className="bg-[#0B4F6C] h-3 rounded-full transition-all"
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="space-y-3 text-left mb-8">
                {questions.map((q, i) => (
                  <div key={q.id} className={`p-3 rounded-lg border flex items-start gap-3 ${
                    answers[i] === q.answer
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}>
                    {answers[i] === q.answer
                      ? <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                      : <XCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
                    }
                    <div>
                      <div className="text-sm font-medium text-slate-800">{q.question}</div>
                      <div className="text-xs text-muted-foreground mt-1">{q.explanation}</div>
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={restart} className="bg-[#0B4F6C] hover:bg-[#0B4F6C]/90 gap-2">
                <RotateCcw className="h-4 w-4" />
                重新练习
              </Button>
            </div>
          </section>
        </main>
        <SiteFooter />
      </>
    )
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="border-b bg-slate-50/80">
          <div className="mx-auto max-w-4xl px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-[#0B4F6C]">首页</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-slate-700 font-medium">自测练习</span>
            </div>
          </div>
        </div>

        <section className="py-10">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              <GraduationCap className="h-6 w-6 text-[#0B4F6C]" />
              <h1 className="text-2xl font-bold text-slate-800">自测练习</h1>
            </div>
            <p className="text-muted-foreground mb-8">共 {questions.length} 题，覆盖各章节核心知识点</p>

            <Card className="border-slate-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-[#1B9AAA] bg-[#1B9AAA]/10 px-2.5 py-1 rounded-full">
                      {question.chapter}
                    </span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {current + 1} / {questions.length}
                  </span>
                </div>
                <CardTitle className="mt-4 text-lg text-slate-800">
                  {question.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selected?.toString() ?? ''}
                  onValueChange={(v) => !submitted && setSelected(parseInt(v))}
                  className="space-y-3"
                >
                  {question.options.map((opt, idx) => {
                    let className = 'flex items-center space-x-2 rounded-lg border p-4 cursor-pointer transition-colors'
                    if (submitted) {
                      if (idx === question.answer) {
                        className += ' border-green-300 bg-green-50'
                      } else if (idx === selected && idx !== question.answer) {
                        className += ' border-red-300 bg-red-50'
                      } else {
                        className += ' border-slate-200 opacity-60'
                      }
                    } else {
                      className += ' border-slate-200 hover:bg-slate-50'
                    }
                    return (
                      <Label key={idx} className={className}>
                        <RadioGroupItem value={idx.toString()} disabled={submitted} />
                        <span className="text-sm text-slate-700">{opt}</span>
                      </Label>
                    )
                  })}
                </RadioGroup>

                {submitted && (
                  <Alert className={`mt-4 ${
                    selected === question.answer
                      ? 'border-green-200 bg-green-50'
                      : 'border-red-200 bg-red-50'
                  }`}>
                    {selected === question.answer
                      ? <CheckCircle2 className="h-4 w-4 text-green-600" />
                      : <XCircle className="h-4 w-4 text-red-500" />
                    }
                    <AlertTitle className={`text-sm font-medium ${
                      selected === question.answer ? 'text-green-800' : 'text-red-800'
                    }`}>
                      {selected === question.answer ? '回答正确！' : '回答错误'}
                    </AlertTitle>
                    <AlertDescription className="text-sm text-muted-foreground mt-1">
                      {question.explanation}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex items-center justify-between mt-6">
                  <Button
                    variant="outline"
                    onClick={handlePrev}
                    disabled={current === 0}
                  >
                    上一题
                  </Button>

                  <div className="flex gap-2">
                    {!submitted ? (
                      <Button onClick={handleSubmit} disabled={selected === null} className="bg-[#0B4F6C] hover:bg-[#0B4F6C]/90">
                        提交答案
                      </Button>
                    ) : (
                      <Button onClick={handleNext} className="bg-[#0B4F6C] hover:bg-[#0B4F6C]/90 gap-2">
                        {isLast ? '查看结果' : '下一题'}
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}