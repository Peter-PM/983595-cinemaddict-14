import Observer from '../utils/observer.js';

export default class Comments extends Observer {
  constructor(api) {
    super();
    this._comments = [];
    this._api = api;
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  addComments(updateType, update) {
    this._comments = update;

    this._notify(updateType);
  }

  deleteComments(updateType, update) {
    const index = this._comments.findIndex((comment) => comment.id === update);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1),
    ];
    this._notify(updateType);
  }
}
