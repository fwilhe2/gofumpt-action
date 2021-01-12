import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as exec from '@actions/exec'
import * as fs from 'fs'

async function run(): Promise<void> {
  try {
    const path = await tc.downloadTool(
      'https://github.com/mvdan/gofumpt/releases/download/v0.1.0/gofumpt_v0.1.0_linux_amd64'
    )
    fs.chmodSync(path, '777')
    await exec.exec(`${path} -l -w .`)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
