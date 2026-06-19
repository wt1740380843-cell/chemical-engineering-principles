import { SiteHeader, SiteFooter } from '@/components/site-layout'
import { chapters } from '@/lib/chapters'
import Link from 'next/link'
import { ArrowRight, BookOpen, Beaker, BarChart3, FlaskConical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const stats = [
  { label: '核心章节', value: '9', icon: BookOpen },
  { label: '知识点', value: '30+', icon: Beaker },
  { label: '计算工具', value: '3+', icon: BarChart3 },
  { label: '适用人群', value: '本/考研', icon: FlaskConical },
]

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#0B4F6C] via-[#0F6B8A] to-[#1B9AAA]">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 relative">
            <div className="mx-auto max-w-3xl text-center">
              <Badge className="mb-4 bg-white/20 text-white border-0 hover:bg-white/25 backdrop-blur-sm">
                系统化学习 · 工程思维
              </Badge>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                化工原理
              </h1>
              <p className="mt-6 text-lg leading-8 text-white/80 sm:text-xl">
                从流体流动到干燥技术，系统掌握化工原理九大核心章节。
                融合理论学习与工程实践，助力化工之路。
              </p>
              <div className="mt-10 flex items-center justify-center gap-4">
                <Link href="/chapters">
                  <Button size="lg" className="bg-white text-[#0B4F6C] hover:bg-white/90 font-semibold px-8">
                    开始学习
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/tools">
                  <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                    计算工具
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="border-t border-white/10 bg-black/10 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center gap-3 text-white">
                    <stat.icon className="h-8 w-8 text-white/60" />
                    <div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-xs text-white/70">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Chapters overview */}
        <section className="py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-800">课程章节</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                系统化编排，从基础到应用，循序渐进掌握化工原理核心知识体系
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {chapters.map((chapter) => (
                <Link key={chapter.slug} href={`/chapters/${chapter.slug}`}>
                  <Card className="group h-full transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border-slate-200 hover:border-[#1B9AAA]/30 cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B4F6C]/10 text-2xl">
                          {chapter.icon}
                        </div>
                        <span className="text-xs font-medium text-[#1B9AAA] bg-[#1B9AAA]/10 px-2.5 py-1 rounded-full">
                          第{chapter.number}章
                        </span>
                      </div>
                      <CardTitle className="mt-4 text-lg text-slate-800 group-hover:text-[#0B4F6C] transition-colors">
                        {chapter.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {chapter.shortDesc}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-sm text-[#0B4F6C] font-medium">
                        <span>查看详情</span>
                        <ArrowRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-[#0B4F6C] to-[#1B9AAA] py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-white">开始你的化工原理学习之旅</h2>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">
              无论是课程学习、考研备考还是工程实践，这里都有你需要的知识体系与实用工具
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link href="/chapters">
                <Button size="lg" className="bg-white text-[#0B4F6C] hover:bg-white/90 font-semibold">
                  浏览课程
                </Button>
              </Link>
              <Link href="/quiz">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
                  自测练习
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}