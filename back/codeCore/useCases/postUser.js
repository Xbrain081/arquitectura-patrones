class CreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(newUser) {
        return await this.userRepository.create(newUser);
    }
}

module.exports = CreateUser;
