import type { FunctionStructure } from '@midwayjs/serverless-spec-builder'
import type { Dictionary } from 'lodash'
import type { LambdaParam } from '@midwayjs/hooks-shared'
import { FunctionRule } from '@midwayjs/hooks-shared'
import chalk from 'chalk'
import { relative } from 'upath'

type SourceFilePath = string

const map = new Map<SourceFilePath, MidwayHooksFunctionStructure[]>()

export function addRoute(sourceFilePath: SourceFilePath, lambda: MidwayHooksFunctionStructure) {
  if (!map.has(sourceFilePath)) {
    map.set(sourceFilePath, [])
  }

  const routes = map.get(sourceFilePath)

  const idx = routes.findIndex((route) => route.handler === lambda.handler)
  if (idx !== -1) {
    routes.splice(idx, 1)
  }

  routes.push(lambda)
}

export function clearRoutes() {
  map.clear()
}

export function getFunctionsMeta(): Dictionary<MidwayHooksFunctionStructure> {
  const functions: Dictionary<MidwayHooksFunctionStructure> = {}

  map.forEach((configs) => {
    for (const config of configs) {
      functions[config.deployName] = config
    }
  })

  return functions
}

export interface MidwayHooksFunctionStructure extends FunctionStructure {
  deployName: string
  handler: string
  // dist path
  sourceFilePath?: string
  // sourceFile
  sourceFile?: string
  exportFunction?: string
  isFunctional?: boolean
  argsPath?: string
  gatewayConfig: Partial<LambdaParam>
  event: FunctionRule['events']
}

export function duplicateWarning(root: string, existPath: string, currentPath: string, api: string) {
  console.log(
    '[ %s ] Duplicate routes detected. %s and %s both resolve to %s. Reference: %s',
    chalk.yellow('warn'),
    chalk.cyan(relative(root, existPath)),
    chalk.cyan(relative(root, currentPath)),
    chalk.cyan(api),
    'link: https://www.yuque.com/midwayjs/faas/et7x4k'
  )
}
