import puppeteer from "puppeteer";

import { PuppeteerConfigProps } from "../types/puppeteer.config";


class PuppeterDataSource {

    async config ({
        gotoPage,
        openBrowser = false,
    }: PuppeteerConfigProps,callback: () => any){

        const browser = await puppeteer.launch({
            headless:!openBrowser,
        });

        const page = await browser.newPage();

        await page.goto(gotoPage);

        const data = await page.evaluate(callback);

        return data;

    }


}

export default new PuppeterDataSource();
