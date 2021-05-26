import Observer from '../utils/observer.js';
import {today} from '../utils/date.js';
import {nanoid} from 'nanoid';

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
  }

  createComment(updateType, film) {
    const newComment = {
      id: nanoid(),
      author: 'Peter',
      comment: film.localDescription,
      date: today(),
      emotion: film.localEmotion,
    };

    this.addComments(updateType, newComment);
  }

  addComments(updateType, update) {
    this._comments = [
      ...this._comments,
      update,
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
