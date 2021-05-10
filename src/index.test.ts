import Parcel from "@parcel/core"
import { existsSync } from 'fs'
import { promises } from 'fs'


const defaultOptions = {
    inputPath: 'markdown',
    outputPath: 'jsxMarkdown',
    reactContextName: 'ShujiContext',
    reactContextVarName: 'shuji',
    deleteExistingOutputFolder: false
}

describe('test parcel plugin', () => {
    test('works with default options', async () => {
        const parcelInstance = new Parcel({
            mode: "production"
        })
        await parcelInstance.run()

        expect(existsSync(`${defaultOptions.outputPath}/test.jsx`)).toBeTruthy()

        await cleanup(defaultOptions.outputPath)
    })

    test('works with config file', async () => {
        //TODO
    })
})

const cleanup = async (folderPath:string) => {
    //Cleanup test files/folders
    await promises.rmdir(`${folderPath}`,{ recursive:true } )
}
``
