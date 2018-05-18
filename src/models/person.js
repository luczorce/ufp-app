export default class Person {
  // TODO need to be able to instantiate this with the rest of the data?
  constructor(firstName, lastName) {
    // TODO these should come from the uPort profile
    this.firstName = firstName;
    this.lastName = lastName;

    this.deviceKey = null;
    
    this.city = { private: true, value: '' };
    this.state = { private: true, value: '' };
    this.country = { private: true, value: '' };
    this.hobbies = { private: true, value: [] };
    this.causes = { private: true, value: [] };
  }

  initDevice(deviceKey) {
    this.deviceKey = deviceKey;
  }

  populateAttributes(attrs) {
    Object.keys(attrs).forEach((key) => {
      this[key] = attrs[key];
    });
  }

  get publicAttributes() {
    let keys = [];

    Object.keys(this).forEach((key) => {
      const isAutoPrivate = typeof this[key] === 'string';
      const isPrivate = (isAutoPrivate) ? false : this[key].private
      
      if (!isAutoPrivate && !isPrivate) {
        keys.push(key);
      }
    });

    return keys;
  }

  get privateAttributes() {
    let keys = [];

    Object.keys(this).forEach((key) => {
      const isAutoPrivate = typeof this[key] === 'string';
      const isPrivate = (isAutoPrivate) ? false : this[key].private
      
      // NOTE we don't want to consider the auto-private keys, like names
      if (!isAutoPrivate && isPrivate) {
        keys.push(key);
      }
    });

    return keys;
  }
}
