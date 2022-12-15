import pupDataSource from "../scraping/pup-data-source";
import { GetElementValueProps } from "../types/get-element-value";

class UserRepository {

    async getUser(nick: string){

        const profile = `https://github.com/${nick}`;

        const user = await pupDataSource.config({
            gotoPage:profile,
        },() => {

            const username = miner({
                select:'.vcard-fullname',
            });

            const nickname =  miner({
                select:'.p-nickname',
            });

            const bio =  miner({
                select:'.user-profile-bio'
            });

            const photo =  miner({
                select:'.avatar-user',
                type:'attribute'
            });

            const followInfos = miner({
                select:'.text-bold.color-fg-default',
                many:true,
            });

            let following;
            let followers;

           if(followInfos?.length){
             [ following, followers ] = followInfos;
           }

            if ( ! username || ! nickname) {
                return null
            }

            function miner ({select,many = false,type = 'text'}: GetElementValueProps) {


                function replaceAndTrim(value:string){
                    return value.replace('\n','').trim();
                }

                const verifyType = {

                    'text': () => {

                        if( !many ){

                            const value = document.querySelector(select)?.textContent;
                            const replace = replaceAndTrim(value || '');
                            return replace;

                        }else{

                            const nodeValues = document.querySelectorAll(select);
                            const values = [...nodeValues];

                            const mapTextValues = values.map( value => replaceAndTrim(value.textContent as string));
                            return mapTextValues;

                        }
                    },

                    'attribute': () =>
                    document.querySelector(select)?.getAttribute('src'),
                }

                return verifyType[type]();


            }

            return {
                username,
                nickname,
                bio,
                photo,
                follow:{
                    following,
                    followers,
                }
            };

        });

        return user;
    }


}


export default new UserRepository();
