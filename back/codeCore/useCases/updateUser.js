class UpdateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId, userData) {
        return await this.userRepository.update(userId, userData);
    }
}

module.exports = UpdateUser;
