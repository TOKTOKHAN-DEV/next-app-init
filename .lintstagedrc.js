const path = require('path')

const checkType = () => 'tsc --noEmit'

const checkLint = (filenames) => {
  const files = filenames
    .map((f) => path.relative(process.cwd(), f))
    .filter((f) => !f.includes('.prettierrc') && !f.includes('.lintstagedrc'))

  if (files.length === 0) return '' // 파일 없으면 아무것도 안 함

  return `npx eslint --fix ${files.join(' ')}`
}

const checkPrettier = (filenames) =>
  `prettier --write ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`

module.exports = {
  '*.{ts,tsx,js,jsx}': [checkType, checkLint, checkPrettier],
}
