import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '化工原理学习平台',
    template: '%s | 化工原理学习平台',
  },
  description:
    '系统学习化工原理核心知识，涵盖流体流动、传热、传质、蒸馏、吸收、萃取等九大章节。提供在线计算工具与自测练习。',
  keywords: [
    '化工原理',
    '化学工程',
    '流体流动',
    '传热',
    '传质',
    '精馏',
    '吸收',
    '萃取',
    '干燥',
    '化工学习',
  ],
  authors: [{ name: '化工原理学习平台' }],
  openGraph: {
    title: '化工原理学习平台',
    description:
      '系统学习化工原理核心知识，涵盖流体流动、传热、传质等九大章节。',
    locale: 'zh_CN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.COZE_PROJECT_ENV === 'DEV';

  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`antialiased min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800`}>
        {isDev && <Inspector />}
        {children}
      </body>
    </html>
  );
}