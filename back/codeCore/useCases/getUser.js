class GetUser {
    constructor(userRepository) { // Dependency Injection
        this.userRepository = userRepository;
    }

    async execute(userId) {
        return await this.userRepository.findById(userId);
    }
}

module.exports = GetUser;
