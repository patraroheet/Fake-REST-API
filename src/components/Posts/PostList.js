// import React, { Component } from "react";
// import { Container, Row, Col, Modal, ModalHeader, ModalBody } from "reactstrap";
// import Post from "./Post";
// import UserDetails from "./UserDetails";
// import withLoader from "../Common/withLoader";
// import { connect } from "react-redux";
// import { loadAllPosts, selectUser } from "../../store/actions/PostActions";

// class PostList extends Component {
//   state = {
//     userDetails: {},
//     modal: false
//   };
//   componentDidMount() {
//     this.props.loadAllPosts();
//   }
//   componentDidUpdate = prevProps => {
//     if (this.props.userDetails !== prevProps.userDetails) {
//       this.setState({
//         modal: Object.keys(this.props.userDetails || {}).length > 0
//       });
//     }
//   };
//   getUserDetails = userId => {
//     this.props.selectUser(userId);
//   };
//   toggle = () => {
//     this.setState(prevState => ({
//       modal: !prevState.modal
//     }));
//   };
//   render() {
//     return (
//       <Container fluid>
//         <Row>
//           {this.props.posts.map(post => (
//             <Col key={post.id} md="3" sm="6" xs="12">
//               <Post post={post} getUserDetails={this.getUserDetails} />
//             </Col>
//           ))}
//         </Row>
//         <Modal isOpen={this.state.modal} toggle={this.toggle}>
//           <ModalHeader toggle={this.toggle}>User Details</ModalHeader>
//           <ModalBody>
//             <UserDetails user={this.props.userDetails} />
//           </ModalBody>
//         </Modal>
//       </Container>
//     );
//   }
// }

// export default withLoader(
//   connect(
//     state => ({ posts: state.post.posts, loading: state.post.loading, userDetails: state.post.userDetails }),
//     {
//       loadAllPosts,
//       selectUser
//     }
//   )(PostList)
// );

import React, { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Modal, ModalHeader, ModalBody } from "reactstrap";
import Post from "./Post";
import UserDetails from "./UserDetails";
import withLoader from "../Common/withLoader";
import { PostContext } from "../Posts/PostContextProvider";

const PostList = props => {
  const postContext = useContext(PostContext);
  const [modal, setModal] = useState(false);
  useEffect(() => {
    console.log("We are here");
  });
  useEffect(() => {
    console.log("We are in block 1");
    postContext.loadAllPosts();
  }, []);

  useEffect(() => {
    console.log("We are in block 2");
    setModal(Object.keys(postContext.userDetails || {}).length > 0);
  }, [postContext.userDetails]);

  const getUserDetails = userId => {
    postContext.selectUser(userId);
  };

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <Container fluid>
      <Row>
        {postContext.posts &&
          postContext.posts.map(post => (
            <Col key={post.id} md="3" sm="6" xs="12">
              <Post post={post} getUserDetails={getUserDetails} />
            </Col>
          ))}
      </Row>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>User Details</ModalHeader>
        <ModalBody>
          <UserDetails user={postContext.userDetails} />
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default withLoader(PostList);
