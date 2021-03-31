/*
 * @Author: chenanran
 * @Date: 2021-03-31 16:53:13
 */

class SearchError extends Error {
    constructor(message) {
        super(message);
        this.name = "SearchError";
    }
}

export default SearchError;
