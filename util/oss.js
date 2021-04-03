/*
 * @Author: chenanran
 * @Date: 2021-03-31 18:02:06
 */

import OSS from "ali-oss";
import fs from "fs";

const client = new OSS({
    bucket: "couseraccess",
    region: "oss-cn-beijing",
    accessKeyId: "LTAI5t8e66dcgbF9FXXnJVKj",
    accessKeySecret: "OBw1dohYzo2fRVh3sYP7UjQPebywcT",
});

export async function putStream(file) {
    try {
        // use 'chunked encoding'
        // 检验文件和文件名是否为空，若为空则代表没有上传文件
        if (!file) {
            return;
        }
        if (!file.name) {
            return;
        }
        // 获取文件名
        const fileName = file.name;
        let stream = fs.createReadStream(file.path);
        return await client.putStream(`competition/${fileName}`, stream);
    } catch (e) {
        console.log(e);
    }
}
