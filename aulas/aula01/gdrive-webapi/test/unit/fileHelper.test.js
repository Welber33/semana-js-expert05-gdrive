import { describe, test, expect, jest } from '@jest/globals'
import fs from 'fs'
import FileHelper from '../../src/fileHelper.js'
import Routes from './../../src/routes.js'

describe('#FileHelper', () => {

    describe('#getFileStatus', () => {
        test('it should return files statuses in correct format', async () => {
            const statMock = {
                dev: 16777223,
                mode: 33188,
                nlink: 1,
                uid: 501,
                gid: 20,
                rdev: 0,
                blksize: 4096,
                ino: 1736526,
                size: 206572,
                blocks: 408,
                atimeMs: 1631023314168.3093,
                mtimeMs: 1631023313725.47,
                ctimeMs: 1631023313725.9968,
                birthtimeMs: 1631023313720.1345,
                atime: '2021-09-07T14:01:54.168Z',
                mtime: '2021-09-07T14:01:53.725Z',
                ctime: '2021-09-07T14:01:53.726Z',
                birthtime: '2021-09-07T14:01:53.720Z'
            }

            const mockUser = 'joaowelber'
            process.env.USER = mockUser
            const filename = 'file.png'

            jest.spyOn(fs.promises, fs.promises.readdir.name)
                .mockResolvedValue([filename])

            jest.spyOn(fs.promises, fs.promises.stat.name)
                .mockResolvedValue(statMock)

            const result = await FileHelper.getFilesStatus("/tmp")

            const expectedResult = [
                {
                    size: "207 kB",
                    lastModified: statMock.birthtime,
                    owner: mockUser,
                    file: filename

                }
            ]

            expect(fs.promises.stat).toHaveBeenCalledWith(`/tmp/${filename}`)
            expect(result).toMatchObject(expectedResult)
        })
    })
})