import axios from "axios";

export class HTTP {

    static async saveConfig(fsNo: number,
                            clickType: number,
                            newChannel: number,
                            newType: number,
                            newData1: number,
                            newData2: number,
                            newData3: number) {
        await axios.post('http://localhost:5000/send', {
            data: [
                1,
                fsNo - 1,
                clickType,
                newChannel,
                newType,
                newData1,
                newData2,
                newData3
            ]
        });
    }

    static async changePage(n: number) {
        await axios.post('http://localhost:5000/send', {
            data: [0, n, 0, 0, 0, 0, 0, 0]
        });
    }
}