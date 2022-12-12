import puppeteer from "puppeteer";
import delay from "../utils/delay";

class UserRepository {

    async getUser(nick: string){
        
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const profile = `https://github.com/${nick}`;

        await page.goto(profile);
        
        const data = await page.evaluate( () => {

            function replaceAndTrim(value: string){
                return value.replace('\n','').trim() as string;
            }

            function getElementValue(idOrClass: string,type: 'innerHTML' | 'attribute' = 'innerHTML'){

                const verifyType = {
                    'innerHTML': () => {
                        const value = document.querySelector(idOrClass)?.textContent;
                        if(value){
                            return replaceAndTrim(value);
                        }
                    },
                    'attribute': () => 
                    document.querySelector(idOrClass)?.getAttribute('src'),
                }
                return verifyType[type]();

            }
            
            const username = getElementValue('.vcard-fullname');
            const nickname = getElementValue('.p-nickname');
            const bio = getElementValue('.user-profile-bio')
            const photo = getElementValue('.avatar-user','attribute');

            if ( ! username || ! nickname) {
                return null
            }

            return {
                username,
                nickname,
                bio,
                photo,
            };

        });

        return data;
        

    }


}


export default new UserRepository();