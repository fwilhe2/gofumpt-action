import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as exec from '@actions/exec'
import * as fs from 'fs'
import { ExecOptions } from '@actions/exec'

async function run(): Promise<void> {
  try {
    const path = await tc.downloadTool(
      'https://github.com/mvdan/gofumpt/releases/download/v0.1.0/gofumpt_v0.1.0_linux_amd64'
    )
    fs.chmodSync(path, '777')

    let myOutput = '';
    let myError = '';

    const options: ExecOptions = {};
    options.listeners = {
      stdout: (data: Buffer) => {
        myOutput += data.toString();
      },
      stderr: (data: Buffer) => {
        myError += data.toString();
      }
    };
    const exit = await exec.exec(`${path} -l -w .`, [], options)
    if (exit > 0) {
      core.info(`stdout: ${myOutput}`)
      core.info(`stderr: ${myError}`)

    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
