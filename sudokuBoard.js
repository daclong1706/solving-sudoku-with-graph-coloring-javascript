class SudokuBoard {
    constructor () {
        this.board = this.Board();
        this.sudokuGraph = new SudokuConnections();
        this.mappedGrid = this.__getMappedMatrix();
        this.deepth = 0;
    }

    __getMappedMatrix() {
        const matrix = Array.from({ length: 9}, () => Array(9).fill(0));

        let count = 1;
        for (let rows = 0; rows < 9; rows++) {
            for (let cols = 0; cols < 9; cols++) {
                matrix[rows][cols] = count;
                count++;
            }
        }

        return matrix;
    }

    Board() {
        const board = [
            [0, 0, 0, 4, 0, 0, 0, 0, 0],
            [4, 0, 9, 0, 0, 6, 8, 7, 0],
            [0, 0, 0, 9, 0, 0, 1, 0, 0],
            [5, 0, 4, 0, 2, 0, 0, 0, 9],
            [0, 7, 0, 8, 0, 4, 0, 6, 0],
            [6, 0, 0, 0, 3, 0, 5, 0, 2],
            [0, 0, 1, 0, 0, 7, 0, 0, 0],
            [0, 4, 3, 2, 0, 0, 6, 0, 5],
            [0, 0, 0, 0, 0, 5, 0, 0, 0]
        ];
        return board;
    }

    getBoard() {
        return this.board;
    }

    setBoard(sudokuArray){
        this.board = sudokuArray;
    }

    graphColoringInitializeColor() {
        const color = Array.from(Graph.totalV + 1).fill(0);
        const given = [];

        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] !== 0) {
                    const idx = this.mappedGrid[row][col];
                    color[idx] = this.board[row][col];
                    given.push(idx);
                }
            }
        }

        return { color, given };
    }


    solveGraphColoring(m = 9) {
        const { color, given } = this.graphColoringInitializeColor();

        if (!this.graphColorUtility(m, color, 1, given)) {
            console.log(":(");
            return false;
        }

        let count = 1;
        for (let row = 0; row < 9; row++) {
            for (let col = 0; col < 9; col++) {
                this.board[row][col] = color[count];
                count++;
            }
        }
        
        return true;
    }

    graphColorUtility(m, color, v, given) {
        if (v === Graph.totalV + 1) {
            return true;
        }
        
        for (let c = 1; c <= m; c++) {
            if (this.isSafe2Color(v, color, c, given)) {
                color[v] = c;
                
                if(this.deepth > 10000) return false;
                this.deepth++;

                if (this.graphColorUtility(m, color, v + 1, given)) {
                    return true;
                }
            }

            if (!given.includes(v)) {
                color[v] = 0;
            }
        }
        return false;
    }
    
    isSafe2Color(v, color, c, given) {
        if (given.includes(v) && color[v] === c) {
            return true;
        } 
        else if (given.includes(v)) {
            return false;
        }

        for (let i = 1; i <= Graph.totalV; i++) {
            if (color[i] === c && this.sudokuGraph.graph.isNeighbour(v, i)) {
                return false;
            }
        }

        return true;
    }
    
};