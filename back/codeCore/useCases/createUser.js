class CreateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(userData) {
        return await this.userRepository.create(userData);
    }
}

module.exports = CreateUser;
