import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { saveContract, saveRemedy } from "../../../../services/userService";
import { toast } from "react-toastify";
class ContractReply extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBrand: [],
      name: "",
      email: "",
      message: "",
      title: "",
      content: "",
      reply: "",
      ContactDetail: [],
    };
  }

  async componentDidMount() {
    let ContactDetail = this.props.location.state;
    this.setState({ ContactDetail });
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.ContactDetail !== prevState.ContactDetail) {
      let { ContactDetail } = this.state;
      this.setState({
        name: ContactDetail.name,
        phone: ContactDetail.phone,
        email: ContactDetail.email,
        title: ContactDetail.title,
        content: ContactDetail.content,
      });
    }
  }

  handleOnChange = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {}
    );
  };
  saveRemedy = async (data) => {
    let res = await saveRemedy({
      ContactDetail: this.state.ContactDetail.id,
      name: this.state.name,
      email: this.state.email,
      message: this.state.message,
      phone: this.state.phone,
      title: this.state.title,
      content: this.state.content,
      reply: this.state.reply,
    });
    if (res && res.errCode === 0) {
      toast.success("send email successfully");
    } else {
      console.log("res", res);
      toast.error("send email failed");
    }
  };

  render() {
    const { userInfoClint } = this.props;
    console.log("ContactDetail", this.state.ContactDetail);
    return (
      <div class="col-md-10">
        <div class="content">
          <section class="content-header my-2">
            <span class="d-inline">Trả lời liên hệ</span>
            <div class="text-end">
              <a href="contact_index.html" class="btn btn-sm btn-success">
                <i class="fa fa-arrow-left"></i> Về danh sách
              </a>
              <button
                type="submit"
                class="btn btn-success btn-sm text-end"
                onClick={() => {
                  this.saveRemedy();
                }}
              >
                <i class="fa fa-save" aria-hidden="true"></i> Trả lời liên hệ
              </button>
            </div>
          </section>
          <section class="content-body my-2">
            <div class="row">
              <div class="col-4">
                <div class="mb-3">
                  <label for="name" class="text-main">
                    Họ tên
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={this.state.name}
                    class="form-control"
                    placeholder="Nhập họ tên"
                    readonly
                    disabled
                  ></input>
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label for="phone" class="text-main">
                    Điện thoại
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={this.state.phone}
                    id="phone"
                    class="form-control"
                    placeholder="Nhập điện thoại"
                    disabled
                    readonly
                  ></input>
                </div>
              </div>
              <div class="col-4">
                <div class="mb-3">
                  <label for="email" class="text-main">
                    Email
                  </label>
                  <input
                    value={this.state.email}
                    type="text"
                    name="email"
                    id="email"
                    class="form-control"
                    placeholder="Nhập email"
                    disabled
                    readonly
                  ></input>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div class="mb-3">
                  <label for="title" class="text-main">
                    Tiêu đề
                  </label>
                  <input
                    value={this.state.title}
                    type="text"
                    name="title"
                    id="title"
                    class="form-control"
                    placeholder="Nhập tiêu đề"
                    disabled
                    readonly
                  ></input>
                </div>
                <div class="mb-3">
                  <label for="content_old" class="text-main">
                    Nội dung
                  </label>
                  <textarea
                    value={this.state.content}
                    name="content_old"
                    id="content_old"
                    class="form-control"
                    placeholder="Nhập nội dung liên hệ"
                    disabled
                    readonly
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="text-main">
                    Nội dung trả lời
                  </label>
                  <textarea
                    name="content"
                    id="content"
                    class="form-control"
                    placeholder="Nhập nội dung liên hệ"
                    rows="5"
                    onChange={(event) => this.handleOnChange(event, "reply")}
                  ></textarea>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfoClint: state.user.userInfoClint,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ContractReply)
);
