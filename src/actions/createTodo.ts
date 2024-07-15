// @delete:file
'use server'

import { revalidateTag } from 'next/cache'

// @delete:file

export default async function createTodo() {
  // try {
  //   // create todo list
  // } catch (error) {
  //   // ...
  // }

  revalidateTag('TODO_LIST')
}
