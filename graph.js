class Graph {
    // tổng số đỉnh trong Graph
    static totalV = 0;

    constructor() {
        this.allNodes = new Map();
    }

    getTotalV() {
        return Graph.totalV;
    }
    addNode(idx) {
        if(this.allNodes.has(idx)) {
            return null;
        }

        Graph.totalV += 1;
        const node = new Node(idx);
        this.allNodes.set(idx, node);
        return node;
    }

    addNodeData(idx, data) {
        if(this.allNodes.has(idx)) {
            const node = this.allNodes.get(idx);
            node.setData(data);
        }
        else {
            console.log("Không tìm thấy ID để thêm dữ liệu");
        }
    }

    addEdge(src, dst, wt = 0) {
        /*  Thêm cạnh giữa 2 node
            Đồ thị vô hướng 
            src = cạnh bắt đầu
            dst = cạnh kết thúc
         */
        this.allNodes.get(src).addNeighbour(this.allNodes.get(dst), wt);
        this.allNodes.get(dst).addNeighbour(this.allNodes.get(src), wt);
    }

    isNeighbour(u, v) {
        // Kiểm tra xem neighbour có tồn tại không
        if(u >= 1 && u <= 81 && v >= 1 && v <= 81 && u !== v) {
            const uConnections = this.allNodes.get(u).getConnections();
            if (uConnections.includes(v)) {
                return true;
            }
        }
        return false;
    }

    printEdges() {
        for (const [idx, node] of this.allNodes) {
            for (const con of node.getConnections()) {
                console.log(node.getID(), " --> ", this.allNodes.get(con).getID());
            }
        }
    }

    // getter
    getNode(idx) {
        if(this.allNodes.has(idx)) {
            return this.allNodes.get(idx);
        }
    }

    getAllNodesIds() {
        return Array.from(this.allNodes.keys());
    }

    __setVisitedTrue(visited, node_id) {
        visited[node_id] = true;
        return visited;
    }
};


