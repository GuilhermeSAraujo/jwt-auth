const data = require('../data/cretentials.json');

class UserRepository {
	getUser = (user) => {
		return data.find((item) => item.user === user);
	};

	registerUser = (user, password) => {
		try {
			console.log(data);
			const id = data.length + 1;
			data.push({ id, user, password });
			console.log(data);
			return true;
		} catch (e) {
			return false;
		}
	};
}

module.exports = new UserRepository();