
import ApiError from "../errors/api-err";
import userRepository from "../repositories/user-repository";

class UserService {

    async getUserByNickname(nickname: string){

        const user = await userRepository.getUser(nickname);

        if( !user ) {
            throw new ApiError({
                statusCode:404,
                error: 'Usuário não encontrado'
            });
        }

        return user;

    }

}

export default new UserService();