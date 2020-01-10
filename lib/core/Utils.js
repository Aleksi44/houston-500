export default class Utils {
  static timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
