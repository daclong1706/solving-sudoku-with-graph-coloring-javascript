class SudokuConnections {
    constructor() {
        this.graph = new Graph();
        this.rows = 9;
        this.cols = 9;
        this.total_blocks = this.rows * this.cols; 

        this.__generateGraph();
        this.connectEdges(); 

        this.allIds = this.graph.getAllNodesIds();
    }

    __generateGraph() {
        // Tạo node có ID từ 1 -> 81
        for (let idx = 1; idx < this.total_blocks + 1; idx++) {
            this.graph.addNode(idx);
        }
    }

    connectEdges() {
        /*
        Kết nối các đỉnh theo ràng buộc Sudoku:

        Hàng
        Từ đầu của mỗi số ID, kết nối tất cả các số liên tiếp cho đến khi bạn đạt đến một bội số của 9.

        Cột (thêm 9 (+9))
        Từ đầu số ID. +9 cho mỗi kết nối cho đến khi bạn đạt đến một số >= 73 và <= 81.

        Khối
        Kết nối tất cả các phần tử trong khối mà không nằm trong cùng một cột hoặc hàng.

        1   2   3   |   4   5   6   |   7   8   9
        10  11  12  |   13  14  15  |   16  17  18
        19  20  21  |   22  23  24  |   25  26  27
        ------------|---------------|-------------
        28  29  30  |   31  32  33  |   34  35  36
        37  38  39  |   40  41  42  |   43  44  45
        46  47  48  |   49  50  51  |   52  53  54
        ------------|---------------|-------------
        55  56  57  |   58  59  60  |   61  62  63
        64  65  66  |   67  68  69  |   70  71  72
        73  74  75  |   76  77  78  |   79  80  81


         */

        const matrix = this.__getGridMatrix();

        const headConnections = new Map();

        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                const head = matrix[row][col]; // ID của node
                const connections = this.__whatToConnect(matrix, row, col);

                headConnections.set(head, connections);
            }
        }
        // kết nối tất cả các cạnh với nhau
        this.__connectThose({ headConnections });
    }

    __connectThose({ headConnections }) {
        // head là ID bắt đầu
        for (const [head, connections] of headConnections) {
            for (const key in connections) { // lấy danh sách tất cả các cạnh kết nối
                for (const v of connections[key]) {
                    this.graph.addEdge(head, v);
                }
            }
        }
    }

    __whatToConnect(matrix, rows, cols) {
        const connections = {};

        const row = [];
        const col = [];
        const block = [];

        // ROWS
        for (let c = cols + 1; c < 9; c++) {
            row.push(matrix[rows][c]);
        }
        connections["rows"] = row;

        // COLS
        for (let r = rows + 1; r < 9; r++) {
            col.push(matrix[r][cols]);
        }
        connections["cols"] = col;

        // BLOCKS
        const blockStartRow = Math.floor(rows / 3) * 3;
        const blockStartCol = Math.floor(cols / 3) * 3;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const currentRow = blockStartRow + i;
                const currentCol = blockStartCol + j;
                if (currentRow !== rows && currentCol !== cols) {
                    block.push(matrix[currentRow][currentCol]);
                }
            }
        }

        connections["blocks"] = block;
        return connections;
    }

    __getGridMatrix() {
        // Tạo ma trận 9x9
        const matrix = new Array(9).fill(null).map(() => new Array(9).fill(0));

        let count = 1;
        for (let rows = 0; rows < 9; rows++) {
            for (let cols = 0; cols < 9; cols++) {
                matrix[rows][cols] = count;
                count += 1;
            }
        }
        return matrix;
    }
};