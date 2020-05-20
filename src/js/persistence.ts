class PersistantStorage {

  public storeUser(user : object) {
	  sessionStorage.setItem('user', JSON.stringify(user));
  }
  public retrieveUser() {
	  return JSON.parse(sessionStorage.getItem('user'));
  }
}

export default PersistantStorage;