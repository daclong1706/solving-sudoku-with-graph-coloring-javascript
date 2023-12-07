class Node {
    constructor(idx, data = 0) {
        // id là các integer (1, 2, 3,...)
        this.id = idx;
        this.data = data;
        this.connectedTo = new Map();
    }

    addNeighbour(neighbour, weight = 0) {
        if (!this.connectedTo.has(neighbour.id)) {
            this.connectedTo.set(neighbour.id, weight);
        }
    }

    // Setter
    setData(data) {
        this.data = data;
    }

    // Getter
    getConnections() {
        return Array.from(this.connectedTo.keys());
    }

    getID() {
        return this.id;
    }

    getData() {
        return this.data;
    }

    getWeight(neighbour) {
        return this.connectedTo.get(neighbour.id);
    }
};