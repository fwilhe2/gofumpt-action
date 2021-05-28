import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'
import * as exec from '@actions/exec'
import * as fs from 'fs'
import * as path from 'path'
import {ExecOptions} from '@actions/exec'

async function run(): Promise<void> {
  try {
    const matchersPath = path.join(__dirname, '..', '.github')
    core.info(`##[add-matcher]${path.join(matchersPath, 'foo.json')}`)

    const toolPath = await tc.downloadTool(
      'https://github.com/mvdan/gofumpt/releases/download/v0.1.1/gofumpt_v0.1.1_linux_amd64'
    )
    fs.chmodSync(toolPath, '777')

    let myOutput = ''
    let myError = ''

    const options: ExecOptions = {}
    options.listeners = {
      stdout: (data: Buffer) => {
        myOutput += data.toString()
      },
      stderr: (data: Buffer) => {
        myError += data.toString()
      }
    }
    exec.exec(`${toolPath} -l -w .`, [], options)

    const exit = exec.exec('git diff --name-only --exit-code')

    // gofumpt found issues
    exit.catch(e => {
      const lines = myOutput.split('\n')

      lines.forEach(element => {
        core.info(`Found wrong formatted file: ${element}`)
      })
    })

    // no issues found
    exit.then(e => {
      core.info('no issues found')
    })
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
