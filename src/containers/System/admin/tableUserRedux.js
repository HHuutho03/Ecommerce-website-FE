import React, { Component } from "react";
import { connect } from "react-redux";
import "./tableUserRedux.scss";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log("handleEditorChange", html, text);
}

class tableUserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
    };
  }
  componentDidMount() {
    this.props.fetchUserRedux();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        arrUsers: this.props.listUsers,
      });
    }
  }
  handleEditNewUser = (user) => {
    console.log("check user in props", user);
    this.props.handleGetDataFromParent(user);
  };
  //handle delete user
  handleDeleteUser(user) {
    this.props.deleteUserRedux(user.id);
  }
  render() {
    let arrUsers = this.state.arrUsers;

    return (
      <React.Fragment>
        <table id="customers">
          <tbody>
            <tr>
              <th>Email</th>
              <th>Firtname</th>
              <th>Lastname</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
            {arrUsers &&
              arrUsers.length > 0 &&
              arrUsers.map((item, key) => {
                return (
                  <tr key={key}>
                    <td>{item.email}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.address}</td>
                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => this.handleEditNewUser(item)}
                      >
                        <i className="fas fa-pencil-alt"></i>
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => this.handleDeleteUser(item)}
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>

        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fellGetAllUser()),
    deleteUserRedux: (userId) => dispatch(actions.fetchDeleteUser(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(tableUserRedux);
