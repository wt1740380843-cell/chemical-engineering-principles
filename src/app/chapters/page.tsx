import { SiteHeader, SiteFooter } from '@/components/site-layout'
import { chapters } from '@/lib/chapters'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
        <section className="bg-gradient-to-br from-slate-50 to-white border-b">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="h-6 w-6 text-[#0B4F6C]" />
              <h1 className="text-3xl font-bold text-slate-800">课程章节</h1>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              共 {chapters.length} 章，覆盖化工原理全部核心内容，从基础到深入循序渐进
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {chapters.map((chapter) => (
                <Link key={chapter.slug} href={`/chapters/${chapter.slug}`}>
                  <Card className="group h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-slate-200 hover:border-[#1B9AAA]/30 cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B4F6C]/10 text-2xl">
                          {chapter.icon}
                        </div>
                        <Badge variant="outline" className="text-[#1B9AAA] border-[#1B9AAA]/30">
                          第{chapter.number}章
                        </Badge>
                      </div>
                      <CardTitle className="mt-4 text-lg text-slate-800 group-hover:text-[#0B4F6C] transition-colors">
                        {chapter.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {chapter.description.length > 100
                          ? chapter.description.slice(0, 100) + '...'
                          : chapter.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {chapter.topics.length} 个知识点
                        </span>
                        <div className="flex items-center text-sm text-[#0B4F6C] font-medium">
                          <span>开始学习</span>
                          <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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