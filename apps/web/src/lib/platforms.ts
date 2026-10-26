import type { Platform } from '@/types'

/**
 * 平台引流配置。
 * 链接目前为占位，拿到真实主页链接后替换 url 字段即可。
 */
export const platforms: Platform[] = [
  {
    id: 'wechat-video',
    name: '微信视频号',
    label: '全内容',
    url: 'https://channels.weixin.qq.com/', // TODO: 替换为真实视频号主页
    icon: 'wechat-video',
    color: 'warm',
  },
  {
    id: 'douyin',
    name: '抖音',
    label: '全部内容',
    url: 'https://v.douyin.com/nM1kZ4wdD9g/', // TODO: 替换为真实抖音主页
    icon: 'douyin',
    color: 'cool',
  },
  {
    id: 'bilibili',
    name: 'B站',
    label: '科技 AI',
    url: 'https://space.bilibili.com/', // TODO: 替换为真实B站主页
    icon: 'bilibili',
    color: 'cool',
  },
  {
    id: 'xiaohongshu',
    name: '小红书',
    label: '生活养生',
    url: 'https://www.xiaohongshu.com/', // TODO: 替换为真实小红书主页
    icon: 'xiaohongshu',
    color: 'warm',
  },
]
