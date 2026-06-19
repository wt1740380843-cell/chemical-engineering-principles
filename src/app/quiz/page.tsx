'use client'

import { useState } from 'react'
import { SiteHeader, SiteFooter } from '@/components/site-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { GraduationCap, CheckCircle2, XCircle, ArrowRight, ArrowLeft, RotateCcw } from 'lucide-react'

const questions = [
  {
    id: 1,
    question: '流体在圆管中层流流动时，摩擦系数 λ 与雷诺数 Re 的关系是？',
    options: ['λ = 64/Re', 'λ = 0.3164/Re^0.25', 'λ = 0.0056 + 0.5/Re^0.32', 'λ 与 Re 无关'],
    answer: 0,
    explanation: '层流状态下（Re < 2000），摩擦系数 λ = 64/Re，由哈根-泊肃叶方程推导得出。',
  },
  {
    id: 2,
    question: '离心泵在启动前必须灌满液体，否则会发生什么现象？',
    options: ['气蚀', '气缚', '喘振', '倒灌'],
    answer: 1,
    explanation: '离心泵启动前若泵内存在空气，由于空气密度远小于液体，无法产生足够的压差将液体吸入泵内，这一现象称为"气缚"。',
  },
  {
    id: 3,
    question: '在精馏操作中，最小回流比 R_min 对应的操作状态是？',
    options: ['操作线与平衡线相切', '操作线与对角线重合', '操作线经过 q 线与平衡线交点', '操作线斜率为无穷大'],
    answer: 2,
    explanation: '最小回流比时，精馏段操作线与平衡线在 q 线与平衡线交点处相交（或相切），此时所需理论板数为无穷多。',
  },
  {
    id: 4,
    question: '逆流换热器相比并流换热器，在相同进出口温度下的最大优势是？',
    options: ['对数平均温差更大', '传热系数更高', '结构更简单', '不易结垢'],
    answer: 0,
    explanation: '逆流布置下，冷热流体的温差在换热器全长上分布更均匀，对数平均温差 ΔT_m 更大，从而在相同换热面积下可传递更多热量。',
  },
  {
    id: 5,
    question: '在填料吸收塔中，发生"液泛"现象的根本原因是？',
    options: ['气速过大阻碍液体下流', '液体粘度过大', '填料层高度不够', '吸收剂用量不足'],
    answer: 0,
    explanation: '液泛是指上升气体速度过大时将填料层中下降的液体托住甚至倒流，导致塔内积液、压降急剧增大的现象。',
  },
  {
    id: 6,
    question: '傅里叶导热定律 q = -λ(dT/dx) 中的负号表示？',
    options: ['热流方向与温度梯度方向相反', '热量从低温传向高温', '导热系数为负值', '温度随时间递减'],
    answer: 0,
    explanation: '负号表示热量传递方向与温度升高方向相反——热量从高温区向低温区传递。',
  },
  {
    id: 7,
    question: '离心泵的轴功率 N 与转速 n 的定量关系是？',
    options: ['N ∝ n', 'N ∝ n²', 'N ∝ n³', 'N ∝ n^0.5'],
    answer: 2,
    explanation: '由离心泵的比例定律，轴功率 N 与转速 n 的立方成正比（N ∝ n³），因此变频调速可大幅节能。',
  },
  {
    id: 8,
    question: '在换热器中，污垢热阻对总传热系数 K 的影响是？',
    options: ['使 K 值降低', '使 K 值升高', '对 K 无影响', '使 K 值先升后降'],
    answer: 0,
    explanation: '污垢层具有较大的热阻，使总传热系数 K = 1/(1/hᵢ + R_f + 1/hₒ) 降低，严重时需要定期清洗。',
  },
  {
    id: 9,
    question: '双组分溶液中，相对挥发度 α 越大，则表示？',
    options: ['两组分越容易分离', '两组分越难分离', '两组分沸点越接近', '溶液越接近理想溶液'],
    answer: 0,
    explanation: '相对挥发度 α 越大，汽液平衡线越偏离对角线，表明两组分的挥发度差异越大，越容易通过蒸馏分离。',
  },
  {
    id: 10,
    question: '在恒速干燥阶段，干燥速率主要取决于？',
    options: ['物料表面水分汽化速率', '物料内部水分扩散速率', '物料厚度', '物料初始含水率'],
    answer: 0,
    explanation: '恒速干燥阶段，物料表面保持充分湿润，干燥速率完全由外部传质传热条件（空气温度、湿度、流速）控制，即表面水分汽化速率主导。',
  },
]

type AnswerStatus = 'pending' | 'correct' | 'wrong'

export default function QuizPage() {
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [answers, setAnswers] = useState<AnswerStatus[]>(Array(questions.length).fill('pending'))

  const q = questions[current]

  const handleSelect = (idx: number) => {
    if (submitted) return
    setSelected(idx)
  }

  const handleSubmit = () => {
    if (selected === null) return
    const correct = selected === q.answer
    const newAnswers = [...answers]
    newAnswers[current] = correct ? 'correct' : 'wrong'
    setAnswers(newAnswers)
    setSubmitted(true)
  }

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1)
      setSelected(null)
      setSubmitted(false)
    }
  }

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1)
      setSelected(null)
      setSubmitted(false)
    }
  }

  const handleReset = () => {
    setCurrent(0)
    setSelected(null)
    setSubmitted(false)
    setAnswers(Array(questions.length).fill('pending'))
  }

  const correctCount = answers.filter((a) => a === 'correct').length
  const answeredCount = answers.filter((a) => a !== 'pending').length
  const isAllDone = answeredCount === questions.length

  return (
    <>
      <SiteHeader />
      <main className="flex-1 bg-[#fbf9f6]">
        <section className="border-b border-[#eae5db] bg-white">
          <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5efe6]">
                <GraduationCap className="h-5 w-5 text-[#d97706]" />
              </div>
              <h1 className="text-3xl font-bold text-[#2c2a29]">自测练习</h1>
            </div>
            <p className="text-[#7c756e]">
              共 {questions.length} 题，覆盖化工原理各章节核心知识点
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
          {isAllDone ? (
            <Card className="border-[#eae5db] shadow-sm">
              <CardHeader className="text-center pb-4">
                <GraduationCap className="h-12 w-12 text-[#d97706] mx-auto mb-2" />
                <CardTitle className="text-2xl text-[#2c2a29]">练习完成！</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-6">
                <div>
                  <div className="text-5xl font-bold text-[#d97706]">{correctCount}/{questions.length}</div>
                  <div className="text-sm text-[#7c756e] mt-1">正确率 {Math.round(correctCount / questions.length * 100)}%</div>
                </div>

                <div className="space-y-3 text-left">
                  {questions.map((q, idx) => (
                    <div key={q.id} className={`p-3 rounded-lg border text-sm ${
                      answers[idx] === 'correct'
                        ? 'border-green-200 bg-green-50'
                        : answers[idx] === 'wrong'
                        ? 'border-red-200 bg-red-50'
                        : 'border-[#eae5db] bg-white'
                    }`}>
                      <div className="flex items-start gap-2">
                        {answers[idx] === 'correct' ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                        ) : answers[idx] === 'wrong' ? (
                          <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                        ) : (
                          <span className="h-4 w-4 rounded-full border-2 border-[#eae5db] mt-0.5 shrink-0" />
                        )}
                        <div>
                          <span className="font-medium text-[#2c2a29]">第{q.id}题：</span>
                          <span className="text-[#7c756e]">{q.question}</span>
                          <div className="mt-1 text-xs text-[#7c756e]">
                            {answers[idx] !== 'pending' && `✅ 答案：${q.options[q.answer]}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Button onClick={handleReset} className="bg-[#d97706] hover:bg-[#d97706]/90 text-white gap-2 shadow-sm">
                  <RotateCcw className="h-4 w-4" />
                  重新开始
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {/* Progress */}
              <div className="flex items-center justify-between text-sm text-[#7c756e]">
                <span>第 {current + 1} / {questions.length} 题</span>
                <span>已答 {answeredCount} 题 · 正确 {correctCount} 题</span>
              </div>
              <div className="h-2 rounded-full bg-[#eae5db] overflow-hidden">
                <div
                  className="h-full bg-[#d97706] rounded-full transition-all duration-300"
                  style={{ width: `${((answeredCount) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question card */}
              <Card className="border-[#eae5db] shadow-sm">
                <CardContent className="pt-8 px-6 sm:px-8">
                  <div className="text-xs text-[#d97706] font-semibold uppercase tracking-wider mb-2">
                    第 {q.id} 题
                  </div>
                  <p className="text-lg font-semibold text-[#2c2a29] mb-6 leading-relaxed">
                    {q.question}
                  </p>
                  <div className="space-y-2">
                    {q.options.map((opt, idx) => {
                      let className = 'w-full text-left p-4 rounded-xl border text-sm transition-all '

                      if (submitted && idx === q.answer) {
                        className += 'border-green-300 bg-green-50 text-green-800 font-medium '
                      } else if (submitted && selected === idx && idx !== q.answer) {
                        className += 'border-red-300 bg-red-50 text-red-700 '
                      } else if (selected === idx) {
                        className += 'border-[#d97706] bg-[#d97706]/5 text-[#d97706] font-medium '
                      } else {
                        className += 'border-[#eae5db] bg-white text-[#2c2a29] hover:bg-[#f5efe6] hover:border-[#d97706]/30 '
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelect(idx)}
                          className={className}
                          disabled={submitted}
                        >
                          <span className="text-xs text-[#7c756e] mr-2 font-mono">
                            {String.fromCharCode(65 + idx)}.
                          </span>
                          {opt}
                          {submitted && idx === q.answer && (
                            <CheckCircle2 className="inline h-4 w-4 text-green-600 ml-2 -mt-0.5" />
                          )}
                          {submitted && selected === idx && idx !== q.answer && (
                            <XCircle className="inline h-4 w-4 text-red-500 ml-2 -mt-0.5" />
                          )}
                        </button>
                      )
                    })}
                  </div>

                  {submitted && (
                    <div className="mt-6 p-4 rounded-xl bg-[#f5efe6] border border-[#eae5db]">
                      <span className="text-xs font-medium text-[#d97706] uppercase tracking-wider">解析</span>
                      <p className="mt-1 text-sm text-[#2c2a29] leading-relaxed">
                        {q.explanation}
                      </p>
                    </div>
                  )}

                  <div className="mt-6 flex items-center justify-between">
                    <Button
                      variant="ghost"
                      onClick={handlePrev}
                      disabled={current === 0}
                      className="text-sm text-[#7c756e] hover:text-[#d97706] hover:bg-[#f5efe6] gap-1"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      上一题
                    </Button>

                    {!submitted ? (
                      <Button
                        onClick={handleSubmit}
                        disabled={selected === null}
                        className="bg-[#d97706] hover:bg-[#d97706]/90 text-white disabled:opacity-50 shadow-sm"
                      >
                        提交答案
                      </Button>
                    ) : (
                      <Button
                        onClick={handleNext}
                        disabled={current === questions.length - 1}
                        className="bg-[#d97706] hover:bg-[#d97706]/90 text-white gap-1 shadow-sm"
                      >
                        下一题
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </>
  )
}