import puppeteer from "puppeteer";
import delay from "../utils/delay";

class UserRepository {

    async getUser(nick: string){
        
        const browser = await puppeteer.launch();

        const page = await browser.newPage();

        const profile = `https://github.com/${nick}`;

        await page.goto(profile);
        
        const data = await page.evaluate( () => {

            function getElementValue(
                idOrClass: string,
                 type: 'innerHTML' | 'attribute' = 'innerHTML'
                ){
                const verifyType = {
                    'innerHTML': () => 
                    document.querySelector(idOrClass)?.textContent,
                    'attribute': () => 
                    document.querySelector(idOrClass)?.getAttribute('src'),
                }
                return verifyType[type]();

            }

            function replaceAndTrim(value: string){
                return value.replace('\n','').trim() as string;
            }

            
            const username = getElementValue('.vcard-fullname');
            const nickname = getElementValue('.p-nickname');
            const bio = getElementValue('.user-profile-bio')
            const photo = getElementValue('.avatar-user','attribute');

            return {
                username: replaceAndTrim(username as string),
                nickname: replaceAndTrim(nickname as string),
                bio: replaceAndTrim(bio as string),
                photo: photo as string,
            };

        });

        return data;
        

    }


}


export default new UserRepository();