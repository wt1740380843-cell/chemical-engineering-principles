import { SiteHeader, SiteFooter } from '@/components/site-layout'
import { chapters } from '@/lib/chapters'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '课程章节',
  description: '化工原理九大核心章节：从流体流动到干燥技术，系统化学习路径',
}

export default function ChaptersPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-[#eae5db] bg-[#fbf9f6]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f5efe6]">
                <BookOpen className="h-5 w-5 text-[#d97706]" />
              </div>
              <h1 className="text-3xl font-bold text-[#2c2a29]">课程章节</h1>
            </div>
            <p className="text-[#7c756e] max-w-2xl">
              共 {chapters.length} 章，覆盖化工原理全部核心内容，从基础到深入循序渐进
            </p>
          </div>
        </section>

        <section className="py-12 bg-[#fbf9f6]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
      </main>
      <SiteFooter />
    </>
  )
}