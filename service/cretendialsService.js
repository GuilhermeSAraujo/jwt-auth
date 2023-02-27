const UserRepository = require('../repository/userRepository.js');

class CredentialsService {
	verify = (user, password) => {
		if (!user || !password) return false;

		const userFromRepository = UserRepository.getUser(user);

		if (!userFromRepository) return false;

		if (userFromRepository.password !== password) return false;

		return true;
	};

	registerUser = (user, password) => {
		if (!user || !password) return false;

		// implement password encryption
		const success = UserRepository.registerUser(user, password);

		return success;
	};
}
module.exports = new CredentialsService();