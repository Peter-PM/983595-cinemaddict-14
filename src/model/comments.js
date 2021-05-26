import Observer from '../utils/observer.js';

export default class Comments extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
    // const comments = [];
    // for (const comment of arr) {
    //   comments.push(this._comments.filter((el) => el.id === comment));
    // }
    // return comments.flat();
  }

  // updateComments(updateType, update) {
  //   const index = this._comments.findIndex((comment) => comment.id === update.id);

  //   if (index === -1) {
  //     throw new Error('Can\'t update unexisting film');
  //   }

  //   this._comments = [
  //     ...this._comments.slice(0, index),
  //     update,
  //     ...this._comments.slice(index + 1),
  //   ];

  //   this._notify(updateType, update);
  // }

  addComments(updateType, update) {
    this._comments = [
      update,
      ...this._comments,
    ];

    this._notify(updateType, update);
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
