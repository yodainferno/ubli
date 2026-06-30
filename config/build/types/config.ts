export type BuildMode = 'development' | 'production'
export interface BuildPaths {
  entry: string
  build: string
  html: string
  src: string
}

export interface BuildEnv {
  mode: BuildMode
  port: number
  analyzer?: boolean
}

export interface BuildOptions {
  mode: BuildMode
  isDev: boolean
  paths: BuildPaths
  port: number
  analyzer?: boolean
}
