export type AccentColor = 'warm' | 'cool'

export type PlatformIconName = 'wechat-video' | 'douyin' | 'bilibili' | 'xiaohongshu'

export interface Platform {
  id: string
  name: string
  label: string
  url: string
  icon: PlatformIconName
  color: AccentColor
}
