function storeUser(user) {
	sessionStorage.setItem('user', JSON.stringify(user));
}
function retrieveUser() {
	return JSON.parse(sessionStorage.getItem('user'));
}