const express = require('express');
const SerialPort = require('serialport')
const cors = require('cors')
const path = require('path');

let openedSerialPort = null;

async function openSerialPort() {
    const serialPort = new SerialPort(selectedPath, { baudRate: 115200, autoOpen: false });
    serialPort.open();
    await wait(4000);
    return serialPort
}

async function list() {
    const list = await SerialPort.list();
    return list
        .filter(x => x.productId)
        .map(x => ({
            path: x.path,
            text: `${x.path} - ${x.productId || ''} ${x.pnpId || ''} ${x.manufacturer || ''} ${x.vendorId || ''}`
        }));
}

async function wait(n) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), n);
    });
}

function getBuffer(data) {
    const buffer = new Buffer(8);
    for (let i = 0; i < 8; i++) {
        buffer[i] = data[i];
    }
    return buffer;
}

function processDataArray(result, serialData) {
    const modes = ['click', 'longClick', 'doubleClick'];
    for (let page = 0; page < 3; page++) {
        for (let button = 0; button < 6; button++) {
            for (let mode = 0; mode < 3; mode++) {
                let index = ((90 * page) + (button * 5)) + (mode * 90);
                result[page][modes[mode]]['fs' + button] = [
                    serialData[index + 0],
                    serialData[index + 1],
                    serialData[index + 2],
                    serialData[index + 3],
                    serialData[index + 4],
                ]
            }
        }
    }
}

function getDefaultConfig() {
    function defaultConfig() {
        return { fs1: [], fs2: [], fs3: [], fs4: [], fs5: [], fs6: [] };
    }

    return [
        {page: 0, click: defaultConfig(), longClick: defaultConfig(), doubleClick: defaultConfig()},
        {page: 1, click: defaultConfig(), longClick: defaultConfig(), doubleClick: defaultConfig()},
        {page: 2, click: defaultConfig(), longClick: defaultConfig(), doubleClick: defaultConfig()}
    ];
}

async function load() {
    const buffer = getBuffer([2, 0, 0, 0, 0, 0, 0 ,0]);
    const serialPort = await openSerialPort();

    return new Promise(resolve => {
        serialPort.write(buffer);
        serialPort.on('data', data => {
            const serialData = data.toJSON().data;

            console.log('config:', JSON.stringify(serialData));

            const result = getDefaultConfig();
            processDataArray(result, serialData);

            serialPort.close();
            resolve(result);
        })
    });
}

const app = express();
app.use(express.json());
app.use(cors());

let selectedPath = null;

app.use('/public', express.static(path.join(__dirname, '../dist')));
app.use('/assets', express.static(path.join(__dirname, '../dist/assets')));

app.get('/port', async (req, res) =>
    res.send(await list())
);

app.post('/port', async (req, res) => {
    const { port } = req.body;
    const devices = await list();
    const device = devices.find(d => d.path === port);

    if (openedSerialPort && openedSerialPort.isOpen) {
        openedSerialPort.close();
    }

    if (device) {
        let devicePath = device.path;
        try {
            selectedPath = devicePath;
            const config = await load();
            openedSerialPort = await openSerialPort();
            res.send(config);
        } catch (e) {
            console.error(e);
            res.sendStatus(500);
        }
    } else {
        res.sendStatus(404);
    }
});

// [command, fsNo, clickType, data1, data2, data3, data4, data5]
// command:
//   - change page = 0
//   - set config = 1
app.post('/send', async (req, res) => {
    const { data } = req.body;
    console.log(selectedPath, 'trying to send', JSON.stringify(data));

    const buffer = getBuffer(data);
    openedSerialPort.write(buffer);

    console.log(openedSerialPort.path, 'ok', JSON.stringify(data));
    res.sendStatus(200);
});

app.listen(5000, () => {
    console.log('');
    console.log('========================================');
    console.log('=== OPEN MIDI CONTROLLER EDIT        ===');
    console.log('=== http://localhost:5000/public     ===');
    console.log('========================================');
    console.log('');
    console.log('LOGS:');
});
