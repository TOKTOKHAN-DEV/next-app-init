const [first, second, ...args] = process.argv
const [prNumber, templateName, publishPackages] = args

type Pkgs = { name: string; version: string }[]
const pkgs: Pkgs = JSON.parse(publishPackages)

const DOMAIN = 'https://github.com/TOKTOKHAN-DEV'

const WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || ''

if (!WEBHOOK_URL) {
  throw new Error('WEBHOOK_URL is missing or not configured.')
}

const pkgInfo = pkgs?.map((item) => `${item.name}@${item.version}`)[0]

const title = [
  {
    type: 'header',
    text: {
      type: 'plain_text',
      text: `:meow_code: ${templateName} 템플릿이 배포되었습니다.`,
      emoji: true,
    },
  },
]

const body = [
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `*${pkgInfo}*`,
    },
    accessory: {
      type: 'button',
      text: {
        type: 'plain_text',
        text: ':meow_bread_appear: 변경사항 보기',
        emoji: true,
      },
      value: 'update detail info',
      url: `${DOMAIN}/${templateName}/releases/tag/v${pkgs[0].version}`,
      action_id: 'button-action',
    },
  },
]

const notes = [
  {
    type: 'divider',
  },
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `\`\`\`
다운로드 방법 
  1. tokit (권장)
    최신 버전으로 다운로드해주세요.
  2. <https://github.com/TOKTOKHAN-DEV/${templateName}| ${templateName} repository> 에서 직접 클론
    이 경우, .changeset/*, .github/*, .scripts/* 경로를 삭제 해주신 후 작업해주세요.
\`\`\``,
    },
  },
]

const content = {
  unfurl_links: false,
  blocks: [...title, ...body, ...notes],
}

namespace NextPageInitRepo {
  export async function sendToWebhook(url: string, data: any) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`Fetch error! Status: ${response.status}`)
      }
    } catch (error) {
      console.error('Error in sendToWebhook:', error)
      throw error
    }
  }

  export async function notifySlack(content: any) {
    try {
      await sendToWebhook(WEBHOOK_URL, content)
    } catch (error) {
      console.error('Error in notifySlack:', error)
    }
  }
}

NextPageInitRepo.notifySlack(content)

export {}
