import React, { Component, createContext } from "react";

export const PostContext = createContext({});

export class PostContextProvider extends Component {
  state = {
    loading: false,
    posts: [],
    userDetails: {},
    error: null
  };
  loadAllPosts = () => {
    this.setState({ loading: true, error: null });
    return fetch("https://jsonplaceholder.typicode.com/posts")
      .then(response => {
        if (response.status !== 200) {
          throw Error(response.body);
        }
        return response.json();
      })
      .then(json => {
        this.setState({ loading: false, posts: json });
      })
      .catch(error => {
        this.setState({ loading: false, posts: [], error: error });
      });
  };
  selectUser = userId => {
    this.setState({ loading: true, error: null });
    return fetch("https://jsonplaceholder.typicode.com/users/" + userId)
      .then(response => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then(json => this.setState({ loading: false, userDetails: json }))
      .catch(error => {
        this.setState({ loading: false, userDetails: null, error: error });
      });
  };
  render() {
    return (
      <PostContext.Provider value={{ ...this.state, loadAllPosts: this.loadAllPosts, selectUser: this.selectUser }}>
        {this.props.children}
      </PostContext.Provider>
    );
  }
}
