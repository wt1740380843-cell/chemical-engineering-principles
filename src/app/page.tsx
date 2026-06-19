import Link from 'next/link'
import { SiteHeader, SiteFooter } from '@/components/site-layout'
import { chapters } from '@/lib/chapters'
import { ArrowRight, BookOpen, Calculator, GraduationCap, Beaker } from 'lucide-react'
import { Button } from '@/components/ui/button'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '化工原理 — 系统化学习平台',
  description: '基于夏清《化工原理》第二版知识体系，覆盖流体流动、传热、传质等核心章节的在线学习平台',
}

const stats = [
  { label: '核心章节', value: '9 章', icon: BookOpen },
  { label: '交互工具', value: '3 个', icon: Calculator },
  { label: '自测题目', value: '10 题', icon: GraduationCap },
]

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#fbf9f6] border-b border-[#eae5db]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,#f5efe6_0%,transparent_60%)]" />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 sm:py-24">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d97706] text-white">
                  <Beaker className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-[#d97706] tracking-wider uppercase">
                  化工原理
                </span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-[#2c2a29] sm:text-5xl">
                系统化学习化工原理
              </h1>
              <p className="mt-4 text-lg text-[#7c756e] leading-relaxed max-w-xl">
                基于夏清《化工原理》第二版知识体系，覆盖动量传递、热量传递、质量传递三大核心，
                配合交互式计算工具与自测练习，构建完整的化工知识框架。
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/chapters">
                  <Button className="bg-[#d97706] hover:bg-[#d97706]/90 text-white shadow-sm gap-2">
                    <BookOpen className="h-4 w-4" />
                    开始学习
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/tools">
                  <Button variant="outline" className="border-[#eae5db] text-[#2c2a29] hover:bg-[#f5efe6] gap-2">
                    <Calculator className="h-4 w-4" />
                    计算工具
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-[#eae5db] bg-white">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="grid grid-cols-3 gap-8 sm:gap-12">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="h-5 w-5 text-[#d97706] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#2c2a29]">{stat.value}</div>
                  <div className="text-sm text-[#7c756e]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Chapter Grid */}
        <section className="py-16 bg-[#fbf9f6]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-[#2c2a29]">课程章节</h2>
                <p className="text-sm text-[#7c756e] mt-1">九大核心章节，系统化学习路径</p>
              </div>
              <Link
                href="/chapters"
                className="hidden sm:flex items-center gap-1 text-sm font-medium text-[#d97706] hover:text-[#d97706]/80 transition-colors"
              >
                查看全部
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {chapters.map((chapter) => (
                <Link key={chapter.slug} href={`/chapters/${chapter.slug}`}>
                  <div className="group h-full rounded-xl border border-[#eae5db] bg-white p-5 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 hover:border-[#d97706]/30 cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f5efe6] text-lg">
                        {chapter.icon}
                      </span>
                      <span className="text-[11px] font-medium text-[#7c756e] bg-[#fbf9f6] px-2.5 py-1 rounded-full border border-[#eae5db]">
                        第{chapter.number}章
                      </span>
                    </div>
                    <h3 className="text-base font-semibold text-[#2c2a29] group-hover:text-[#d97706] transition-colors">
                      {chapter.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-[#7c756e] line-clamp-2 leading-relaxed">
                      {chapter.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#eae5db]">
                      <span className="text-xs text-[#7c756e]">
                        {chapter.topics.length} 个知识点
                      </span>
                      <span className="flex items-center text-xs font-medium text-[#d97706]">
                        开始学习
                        <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white border-t border-[#eae5db] py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-lg mx-auto">
              <GraduationCap className="h-10 w-10 text-[#d97706] mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-[#2c2a29]">检验你的学习成果</h2>
              <p className="mt-2 text-sm text-[#7c756e] leading-relaxed">
                完成每个章节的学习后，可以通过自测练习巩固知识点，查漏补缺
              </p>
              <div className="mt-6 flex justify-center gap-4">
                <Link href="/quiz">
                  <Button className="bg-[#d97706] hover:bg-[#d97706]/90 text-white gap-2">
                    <GraduationCap className="h-4 w-4" />
                    开始自测
                  </Button>
                </Link>
                <Link href="/tools">
                  <Button variant="outline" className="border-[#eae5db] text-[#2c2a29] hover:bg-[#f5efe6] gap-2">
                    <Calculator className="h-4 w-4" />
                    计算工具
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}