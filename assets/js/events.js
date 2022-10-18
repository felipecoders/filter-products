// events.js
class Events {
  constructor() {
    this.events = {}
  }

  on(eventName, fn) {
    this.events[eventName] = fn
  }

  emit() {
    const [eventName, ...values] = Array.from(arguments)
    this.events[eventName].apply(this, values)
  }
}
