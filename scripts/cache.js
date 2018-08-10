var Cache = {
    data: [],
    Set (data) {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].url == data.url) {
                this.data[i] = data;
                return;
            }
        }
        this.data.push(data);
    },

    Has (url) {
        url = url.toString();
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].url == url)
                return true;
        }
        return false;
    },

    Get (url) {
        url = url.toString();
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].url == url)
                return this.data[i];
        }
        return undefined;
    },

    Empty () {
        this.data = [];
    }

}
