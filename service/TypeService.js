/*
 * @Author: chenanran
 * @Date: 2021-03-27 17:50:56
 */

import TypeDao from "../dao/TypeDao.js";
import AddError from "../error/AddError.js";
import UpdateError from "../error/UpdateError.js";
import { intersection } from "../util/arrayUtil.js";

class TypeService {
    constructor() {
        this.typeDao = new TypeDao();
    }

    /**
     * @description 给添加的竞赛设定种类
     * @param {typeName[],comId} // 种类名
     * @return {Promise}
     * @throws {AddError}
     */
    async add(type) {
        const comId = type.comId;
        // 去除type数组中的重复元素
        const newType = Array.from(new Set(type.typeName));
        const promises = newType.map(async (type) => {
            // 检查竞赛类型是否存在
            const comType = await this.typeDao.findOneByTypeName({
                typeName: type,
            });
            if (!comType.length) {
                throw new AddError("添加失败，竞赛类型不存在");
            }

            const params = {
                comId: comId,
                typeId: comType[0].typeId,
            };
            // 检查是否重复设定竞赛类型
            const result = await this.typeDao.findOneByComAndType(params);
            if (result.length) {
                throw new AddError("添加失败，竞赛类型重复");
            }
            try {
                return await this.typeDao.add(params);
            } catch (e) {
                throw new AddError(e);
            }
        });

        // 只能抛出最先开始发生的错误
        return await Promise.all(promises);
    }

    /**
     * @description 更新竞赛种类，需要先删除再添加
     * @param {typeName, comId}
     * @return {Promise}
     * @throws {UpdateError}
     */
    async update(type) {
        const comId = type.comId;
        // 检查竞赛是否存在
        const competition = await this.typeDao.findOneByCom({ comId: comId });
        if (!competition.length) {
            throw new UpdateError("更新失败，竞赛还未设置种类");
        }
        // 删除该竞赛的所有旧种类
        await this.typeDao.delete({ comId: comId });
        // 去除type数组中的重复元素
        const newType = Array.from(new Set(type.typeName));
        const promises = newType.map(async (type) => {
            const comType = await this.typeDao.findOneByTypeName({
                typeName: type,
            });
            if (!comType.length) {
                throw new UpdateError("更新失败，竞赛类型不存在");
            }

            const params = {
                comId: comId,
                typeId: comType[0].typeId,
            };

            try {
                return await this.typeDao.add(params);
            } catch (e) {
                throw new UpdateError(e);
            }
        });

        return await Promise.all(promises);
    }

    /**
     * @description 查找某一竞赛包含的种类
     * @param {comId}
     * @return {Promise}
     */
    async findTypeByCom(type) {
        return await this.typeDao.findTypeByCom(type);
    }

    /**
     * @description 根据单个或多个种类查找竞赛
     * @param {typeName[], order}
     * @return {Promise}
     */
    async findComByType(type) {
        // 获取排序方式
        const order = type.order;
        // 数组去重
        const newTypes = Array.from(new Set(type.typeName));
        const promises = newTypes.map(async (type) => {
            switch (order) {
                case "date":
                    return await this.typeDao.findComByTypeAndDate({
                        typeName: type,
                    });
                case "hot":
                    return await this.typeDao.findComByTypeAndHot({
                        typeName: type,
                    });
                default:
                    return await this.typeDao.findComByTypeAndDate({
                        typeName: type,
                    });
            }
        });
        // 结果数组
        const resultArr = await Promise.all(promises);
        // 取数组的交集
        return intersection(resultArr);
    }
}

export default TypeService;
