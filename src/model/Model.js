class Model {

    /**
     *
     * @param array items
     */
    constructor(items = []) {
        this.items = items;
    }

    /**
     *
     * @param array newModel
     */
    replaceModel(newModel) {
        this.items = newModel;
    }

    /**
     *
     * @param string item
     * @returns {boolean}
     */
    addItem(item) {
        if (JSON.stringify(this.items).indexOf(JSON.stringify(item)) == -1) {
            this.items.push(item);
            return true;
        }
        return false;
    }

    /**
     *
     * @param string item
     * @returns {boolean}
     */
    removeItem(item) {
        var index = JSON.stringify(this.items).indexOf(JSON.stringify(item));
        if (index > -1) {
            this.items.splice(index, 1);
            return true;
        }
        return false;
    }

}

export default Model;