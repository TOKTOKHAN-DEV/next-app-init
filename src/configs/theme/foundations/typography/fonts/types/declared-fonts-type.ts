import fonts from '..'

export type DeclaredFontsType = typeof fonts & {
  [key in string]: string
}
