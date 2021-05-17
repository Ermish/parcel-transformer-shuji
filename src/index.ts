import { Transformer } from "@parcel/plugin"
import ThrowableDiagnostic from "@parcel/diagnostic"
import { transformMarkdownString } from '@ermish/shuji'
import { basename } from 'path'

export default (new Transformer({
//   async loadConfig({ config, options, logger }) {
//     return config
//   },

  // async parse({ asset, config, logger, resolve, options }) {
  //   logger.info({ message: 'Shuji: Parsing markdown files...' })

  //   return ast
  // },

  async canReuseAST({ ast, options, logger }) {
    return false
  },

  async transform({ asset, config, logger, resolve, options }) {

      try {

          logger.verbose({ message: `Shuji: options= ${JSON.stringify(options)}`})
        //   logger.verbose({ message: `Shuji: options.env= ${JSON.stringify(options.env)}`})

          logger.verbose({ message: `Shuji: before calling get code.`})


          const code = await asset.getCode()

          logger.verbose({ message: `Shuji: get code works!`})

          const newComponentName = basename(asset.filePath, '.md')

          logger.verbose({ message: `Shuji: get component name works!`})

          logger.verbose({ message: 'Shuji: Converting markdown to jsx...'})

          const transformedString = await transformMarkdownString(code, newComponentName)

          logger.verbose({ message: `Shuji: creating "${newComponentName}" component...`})

          //asset.setCode(transformedString)
          asset.setMap(null)

          //disable source maps. No need since optimizations would happen at a later step.
          options.env['sourceMap'] = false

          logger.verbose({ message: `Shuji: options.sourcemap= ${JSON.stringify(options.env.sourceMap)}`})

        return [
            {
                type: 'js',
                content: transformedString,
                uniqueKey: newComponentName,
                filePath: 'jsxFiles',
                isSource: false,
                isIsolated: true,
                isInline: true,
                isEntry: true,
                sideEffects: false,
                sourceMap: false,
                sourceMaps: false,
                map: false
            }
        ]
        } catch (err) {
            logger.info({ message: 'Shuji: Error occurred!'})

            throw new ThrowableDiagnostic({
                diagnostic: {
                    message: err.message,
                    filePath: asset.filePath,
                    language: asset.type,
                    stack: err.stack,
                    name: err.name,
                    codeFrame: {
                        code: await asset.getCode(),
                        codeHighlights: [
                            {
                                start: {
                                line: 1,
                                column: 5,
                                },
                                end: {
                                line: 2,
                                column: 3,
                                },
                                message: "This is my error message!!!! oh noes!",
                            },
                        ],
                    },
                    hints: [
                        "Try using a markdown validator to ensure your mardown files are valid.",
                    ],
                },
            })
        }
    }
}))
