import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SiteHeader, SiteFooter } from '@/components/site-layout'
import { chapters, getChapterBySlug, getAdjacentChapters } from '@/lib/chapters'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, ArrowRight, ChevronRight, Calculator, GraduationCap } from 'lucide-react'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return chapters.map((c) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const chapter = getChapterBySlug(slug)
  if (!chapter) return { title: '章节未找到' }
  return {
    title: `${chapter.name} - 化工原理`,
    description: chapter.description,
  }
}

export default async function ChapterPage({ params }: Props) {
  const { slug } = await params
  const chapter = getChapterBySlug(slug)
  if (!chapter) notFound()

  const { prev, next } = getAdjacentChapters(slug)

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b bg-slate-50/80">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-[#0B4F6C]">首页</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/chapters" className="hover:text-[#0B4F6C]">课程章节</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-slate-700 font-medium">{chapter.name}</span>
            </div>
          </div>
        </div>

        {/* Chapter header */}
        <section className="bg-gradient-to-br from-[#0B4F6C]/5 to-white border-b">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl">{chapter.icon}</span>
              <div>
                <div className="text-xs font-medium text-[#1B9AAA] uppercase tracking-wider">
                  第 {chapter.number} 章
                </div>
                <h1 className="text-3xl font-bold text-slate-800">{chapter.name}</h1>
              </div>
            </div>
            <p className="text-muted-foreground max-w-3xl text-base leading-relaxed">
              {chapter.description}
            </p>
            <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#1B9AAA]" />
                {chapter.topics.length} 个核心知识点
              </span>
            </div>
          </div>
        </section>

        {/* Topics */}
        <section className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue={chapter.topics[0]?.name} className="w-full">
              <TabsList className="flex-wrap h-auto gap-1 bg-transparent border-b rounded-none p-0 mb-8">
                {chapter.topics.map((topic) => (
                  <TabsTrigger
                    key={topic.name}
                    value={topic.name}
                    className="data-[state=active]:bg-[#0B4F6C] data-[state=active]:text-white rounded-lg px-4 py-2 text-sm"
                  >
                    {topic.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {chapter.topics.map((topic) => (
                <TabsContent key={topic.name} value={topic.name} className="mt-0">
                  <Card className="border-slate-200">
                    <CardContent className="pt-8 px-6 sm:px-8">
                      <h2 className="text-xl font-bold text-slate-800 mb-4">{topic.name}</h2>
                      <p className="text-slate-700 leading-relaxed whitespace-pre-line text-base">
                        {topic.content}
                      </p>
                      {topic.formula && (
                        <div className="mt-6 p-5 bg-slate-50 rounded-xl border border-slate-200">
                          <div className="text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">
                            核心公式
                          </div>
                          <pre className="text-base font-mono text-slate-800 whitespace-pre-line leading-relaxed">
                            {topic.formula}
                          </pre>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Navigation */}
        <section className="border-t bg-slate-50/80 py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                {prev ? (
                  <Link href={`/chapters/${prev.slug}`}>
                    <Button variant="ghost" className="gap-2 text-sm">
                      <ArrowLeft className="h-4 w-4" />
                      上一章：{prev.name}
                    </Button>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
              <div className="flex gap-3">
                <Link href="/tools">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Calculator className="h-4 w-4" />
                    计算工具
                  </Button>
                </Link>
                <Link href="/quiz">
                  <Button variant="outline" size="sm" className="gap-2">
                    <GraduationCap className="h-4 w-4" />
                    自测练习
                  </Button>
                </Link>
              </div>
              <div>
                {next ? (
                  <Link href={`/chapters/${next.slug}`}>
                    <Button variant="ghost" className="gap-2 text-sm">
                      下一章：{next.name}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}