/*
 * @Author: chenanran
 * @Date: 2021-05-02 17:13:54
 */

export function sortData(dataSource, sorter) {
    if (sorter && Object.keys(sorter).length !== 0) {
        dataSource = dataSource.sort((prev, next) => {
            let sortNumber = 0;
            Object.keys(sorter).forEach((key) => {
                if (sorter[key] === "descend") {
                    if (prev[key] - next[key] > 0) {
                        sortNumber += -1;
                    } else {
                        sortNumber += 1;
                    }

                    return;
                }

                if (prev[key] - next[key] > 0) {
                    sortNumber += 1;
                } else {
                    sortNumber += -1;
                }
            });
            return sortNumber;
        });
    }
    return dataSource;
}
