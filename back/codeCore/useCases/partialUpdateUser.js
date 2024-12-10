class PartialUpdateUser {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute(userId, userData) {
        return await this.userRepository.partialUpdate(userId, userData);
    }
}

module.exports = PartialUpdateUser;
