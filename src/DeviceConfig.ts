export type ClickConfig = {
    fs1: Array<number>,
    fs2: Array<number>,
    fs3: Array<number>,
    fs4: Array<number>,
    fs5: Array<number>,
    fs6: Array<number>,
}

export type PageConfig = {
    page: number,
    click: ClickConfig,
    longClick: ClickConfig,
    doubleClick: ClickConfig
}

export type FsConfig = {
    click: Array<number>,
    longClick: Array<number>,
    doubleClick: Array<number>
}

export type DeviceConfig = Array<PageConfig>;

