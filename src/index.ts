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

  async transform({ asset, config, logger, resolve, options }) {
 
      try {
          const code = await asset.getCode()
          const newComponentName = basename(asset.filePath, '.md')

          logger.verbose({ message: 'Shuji: Converting markdown to jsx...'})

          const transformedString = await transformMarkdownString(code, newComponentName)

          logger.verbose({ message: `Shuji: creating ${newComponentName} component...`})

          //asset.setCode(transformedString)

        return [
            {
                type: 'js',
                content: transformedString,
                uniqueKey: newComponentName,
                filePath: 'jsxFiles',
                sourcemap: false,
                ...asset
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
