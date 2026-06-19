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
        <div className="border-b border-[#eae5db] bg-[#fbf9f6]">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 text-sm text-[#7c756e]">
              <Link href="/" className="hover:text-[#d97706] transition-colors">首页</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/chapters" className="hover:text-[#d97706] transition-colors">课程章节</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-[#2c2a29] font-medium">{chapter.name}</span>
            </div>
          </div>
        </div>

        {/* Chapter header */}
        <section className="border-b border-[#eae5db] bg-white">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#f5efe6] text-2xl">
                {chapter.icon}
              </span>
              <div>
                <div className="text-xs font-medium text-[#d97706] uppercase tracking-wider">
                  第 {chapter.number} 章
                </div>
                <h1 className="text-3xl font-bold text-[#2c2a29]">{chapter.name}</h1>
              </div>
            </div>
            <p className="text-[#7c756e] max-w-3xl text-base leading-relaxed">
              {chapter.description}
            </p>
            <div className="mt-4 flex items-center gap-3 text-sm text-[#7c756e]">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#d97706]" />
                {chapter.topics.length} 个核心知识点
              </span>
            </div>
          </div>
        </section>

        {/* Topics */}
        <section className="py-10 bg-[#fbf9f6]">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue={chapter.topics[0]?.name} className="w-full">
              <TabsList className="flex-wrap h-auto gap-1.5 bg-transparent border-b border-[#eae5db] rounded-none p-0 mb-8 pb-0">
                {chapter.topics.map((topic) => (
                  <TabsTrigger
                    key={topic.name}
                    value={topic.name}
                    className="data-[state=active]:bg-[#d97706] data-[state=active]:text-white rounded-lg px-4 py-2 text-sm text-[#7c756e] hover:text-[#2c2a29] data-[state=active]:shadow-sm transition-all"
                  >
                    {topic.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              {chapter.topics.map((topic) => (
                <TabsContent key={topic.name} value={topic.name} className="mt-0">
                  <Card className="border-[#eae5db] shadow-sm">
                    <CardContent className="pt-8 px-6 sm:px-8">
                      <h2 className="text-xl font-bold text-[#2c2a29] mb-4">{topic.name}</h2>
                      <p className="text-[#2c2a29] leading-relaxed whitespace-pre-line text-base">
                        {topic.content}
                      </p>
                      {topic.formula && (
                        <div className="mt-6 p-5 bg-[#f5efe6] rounded-xl border border-[#eae5db]">
                          <div className="text-xs font-medium text-[#7c756e] mb-2 uppercase tracking-wider">
                            核心公式
                          </div>
                          <pre className="text-base font-mono text-[#2c2a29] whitespace-pre-line leading-relaxed">
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
        <section className="border-t border-[#eae5db] bg-white py-6">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div>
                {prev ? (
                  <Link href={`/chapters/${prev.slug}`}>
                    <Button variant="ghost" className="gap-2 text-sm text-[#7c756e] hover:text-[#d97706] hover:bg-[#f5efe6]">
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
                  <Button variant="outline" size="sm" className="gap-2 border-[#eae5db] text-[#2c2a29] hover:bg-[#f5efe6]">
                    <Calculator className="h-4 w-4" />
                    计算工具
                  </Button>
                </Link>
                <Link href="/quiz">
                  <Button variant="outline" size="sm" className="gap-2 border-[#eae5db] text-[#2c2a29] hover:bg-[#f5efe6]">
                    <GraduationCap className="h-4 w-4" />
                    自测练习
                  </Button>
                </Link>
              </div>
              <div>
                {next ? (
                  <Link href={`/chapters/${next.slug}`}>
                    <Button variant="ghost" className="gap-2 text-sm text-[#7c756e] hover:text-[#d97706] hover:bg-[#f5efe6]">
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