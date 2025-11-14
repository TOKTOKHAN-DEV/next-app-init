/** @type {import("prettier").Config} */
const config = {
  plugins: ['@trivago/prettier-plugin-sort-imports'],

  experimentalTernaries: true,
  trailingComma: 'all',
  tabWidth: 2,
  printWidth: 80,
  semi: false,
  singleQuote: true,

  // Import Order Plugin Config
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrder: createOrder([
    [
      // Core Modules
      compact('react'),
      compact('fs'),
      compact('path'),
      compact('os'),
      compact('child_process'),
      compact('crypto'),
      compact('util'),
      compact('assert'),
    ],
    [
      // Framework
      startWith('next'),
      compact('commander'),
    ],

    // Scoped Modules
    [startWith(`@${negative('/')}`)],

    // External Modules
    [startWith(`${negative('./@')}`)],

    // Path Alias Modules
    [startWith('@/')],

    // Relative Modules
    [startWith('[.].*/')],

    // Others
    ['.*'],
  ]),
}

function createOrder(orders) {
  return orders.map((patterns) => {
    return `(${patterns.join('|')})`
  })
}

function compact(str) {
  return `^${str}$`
}

function startWith(str) {
  return `^${str}.*`
}

function negative(str) {
  return `[^${str}]`
}

module.exports = config
