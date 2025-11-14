const path = require('path')

const checkType = () => 'bash -c tsc --skipLibCheck --noEmit'

const checkLint = (filenames) => {
  const files = filenames
    .map((f) => path.relative(process.cwd(), f))
    .filter((f) => !f.includes('.prettierrc') && !f.includes('.lintstagedrc'))
  if (files.length === 0) return 'echo "No files to lint"'
  return `npx eslint --fix ${files.join(' ')}`
}

const checkPrettier = (filenames) =>
  `prettier --write ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(' ')}`

module.exports = {
  '*.{ts,tsx,js,jsx}': [checkType, checkLint, checkPrettier],
}
