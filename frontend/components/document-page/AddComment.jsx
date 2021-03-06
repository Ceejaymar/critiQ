import React from 'react';

const AddComment = React.createClass({
  getInitialState() {
    return { showCommentBox: false, comment: '' };
  },
  componentWillReceiveProps(props) {
    const { isTextHighlighted } = props;

    // Resets the showCommentBox field if no text was higlighted.
    // Useful for when user has the comment box open but then clicks on an area
    // on the editor without highlighting. Without the code below, the user
    // would see the comment box again after highlighting text. What we want to
    // happen when text is highlighted is for the add comment button to show up
    // first. After the add comment button is clicked, then the comment box should
    // be shown.
    if (!isTextHighlighted) {
      this.setState({ showCommentBox: false, comment: '' });
    }
  },
  toggleCommentBox() {
    let { showCommentBox } = this.state;
    showCommentBox = showCommentBox || true;

    this.setState({ showCommentBox });
  },
  cancelAddComment() {
    this.setState({ showCommentBox: false, comment: '' });
  },
  handleChange(e) {
    const comment = e.target.value;

    this.setState({ comment });
  },
  handleSubmit(e) {
    e.preventDefault();

    const { comment } = this.state;
    const { createComment, highlightedTextData, documentId, loggedInUser } = this.props;

    if (comment) {
      const data = { comment, DocumentId: documentId };
      const commentData = Object.assign({}, highlightedTextData, data);

      createComment(commentData, loggedInUser);
    }
  },
  render() {
    const { isTextHighlighted, highlightedTextData, createComment } = this.props;
    const { showCommentBox } = this.state;

    return (
      <div className="add-comment-div">
        {
          isTextHighlighted && !showCommentBox ?
            <button id="add-comment-button" onClick={this.toggleCommentBox}>
              <i className="fa fa-pencil" aria-hidden="true"></i>
            </button> : null
        }

        {
          showCommentBox && isTextHighlighted ?
            <div>
              <form onSubmit={this.handleSubmit}>
                <textarea className="comment-box" onChange={this.handleChange} />

                <div className="comment-box-buttons">
                  <button className="comment-submit-button" type="Submit">Comment</button>
                  <button className="comment-cancel-button" onClick={this.cancelAddComment}>Cancel</button>
                </div>
              </form>
            </div> : null
        }
      </div>
    );
  }
});

export default AddComment;
