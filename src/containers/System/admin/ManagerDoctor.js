import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "./ManagerDoctor.scss";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { languages, CRUD } from "../../../utils";
import { FormattedMessage } from "react-intl";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManagerDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: "",
      contentHTML: "",
      selectedOption: "",
      description: "",
      listDoctors: [],
      action: "",
      resPrice: [],
      resProvince: [],
      resPayment: [],
      resClinic: [],
      resSpecialty: [],
      selectedPrice: "",
      selectedProvince: "",
      selectedPayment: "",

      selectedClinic: "",
      selectedSpecial: "",
      ClinicName: "",
      ClinicAddress: "",
      Note: "",

      clinicId: "",
      specialId: "",
    };
  }
  componentDidMount() {
    this.props.fetchDoctorsRedux();
    this.props.fetchAllInfoDoctorRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelection(
        this.props.allDoctors,
        "USERS"
      );
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let { resPrice, resProvince, resPayment, resSpecialty } =
        this.props.AllInfoDoctorRedux;
      let dataResPrice = this.buildDataInputSelection(resPrice, "PRICE");
      let dataResProvince = this.buildDataInputSelection(
        resProvince,
        "PROVINCE"
      );
      let dataResSpecial = this.buildDataInputSelection(
        resSpecialty,
        "SPECIALTY"
      );
      let dataResPayment = this.buildDataInputSelection(resPayment, "PAYMENT");
      let dataSelect = this.buildDataInputSelection(
        this.props.allDoctors,
        "USERS"
      );
      this.props.fetchAllInfoDoctorRedux();
      this.setState({
        listDoctors: dataSelect,
        resPrice: dataResPrice,
        resProvince: dataResProvince,
        resSpecialty: dataResSpecial,
        resPayment: dataResPayment,
      });
    }
    //? set state
    if (prevProps.AllInfoDoctorRedux !== this.props.AllInfoDoctorRedux) {
      let { resPrice, resProvince, resPayment, resSpecialty, resClinic } =
        this.props.AllInfoDoctorRedux;
      let dataResPrice = this.buildDataInputSelection(resPrice, "PRICE");
      let dataResSpecial = this.buildDataInputSelection(
        resSpecialty,
        "SPECIALTY"
      );
      let dataResClinic = this.buildDataInputSelection(resClinic, "CLINIC");
      let dataResProvince = this.buildDataInputSelection(
        resProvince,
        "PROVINCE"
      );
      let dataResPayment = this.buildDataInputSelection(resPayment, "PAYMENT");
      this.setState({
        resPrice: dataResPrice,
        resProvince: dataResProvince,
        resPayment: dataResPayment,
        resSpecialty: dataResSpecial,
        resClinic: dataResClinic,
      });
    }
    if (prevProps.detailDoctorRedux !== this.props.detailDoctorRedux) {
      let { Doctor_Info } = this.props.detailDoctorRedux;
      let { resPrice, resPayment, resProvince, resSpecialty, resClinic } =
        this.state;
      let doctorPrice = Doctor_Info.priceId;
      let doctorPayment = Doctor_Info.paymentId;
      let doctorProvince = Doctor_Info.provinceId;
      let specialtyId = Doctor_Info.specialtyId;
      let clinicId = Doctor_Info.clinicId;
      //? filter information doctor
      let findPrice = resPrice.find((item) => {
        return item && item.value === doctorPrice;
      });
      let findPayment = resPayment.find((item) => {
        return item && item.value === doctorPayment;
      });
      let findProvince = resProvince.find((item) => {
        return item && item.value === doctorProvince;
      });
      let findSpecial = resSpecialty.find((item) => {
        return item && item.value === specialtyId;
      });
      let findClinic = resClinic.find((item) => {
        return item && item.value === clinicId;
      });
      if (
        Doctor_Info.nameClinic ||
        Doctor_Info.addressClinic ||
        Doctor_Info.note !== null
      ) {
        this.setState({
          selectedSpecial: findSpecial,
          selectedPayment: findPayment,
          selectedPrice: findPrice,
          selectedProvince: findProvince,
          ClinicName: Doctor_Info.nameClinic,
          ClinicAddress: Doctor_Info.addressClinic,
          Note: Doctor_Info.note,
          selectedClinic: findClinic,
        });
      } else {
        this.setState({
          selectedSpecial: "",
          selectedPayment: "",
          selectedPrice: "",
          selectedProvince: "",
          ClinicName: "",
          Note: "",
          ClinicAddress: "",
          selectedClinic: "",
        });
      }
    }
    if (prevProps.detailDoctorRedux !== this.props.detailDoctorRedux) {
      let detailDoctorRedux = this.props.detailDoctorRedux;
      if (
        detailDoctorRedux.Markdown.description ||
        detailDoctorRedux.Markdown.contentHTML ||
        detailDoctorRedux.Markdown.contentMarkdown !== null
      ) {
        this.setState({
          detailDoctorRedux: detailDoctorRedux,
          contentMarkdown: detailDoctorRedux.Markdown.contentMarkdown,
          contentHTML: detailDoctorRedux.Markdown.contentHTML,
          description: detailDoctorRedux.Markdown.description,
          action: CRUD.EDIT,
        });
      } else {
        this.setState({
          contentMarkdown: "",
          contentHTML: "",
          description: "",
          action: CRUD.CREATE,
        });
      }
    }
  }
  //build data become selected
  buildDataInputSelection = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};
          let labeEn = `${item.lastName} ${item.firstName}`;
          let labeVi = `${item.firstName} ${item.lastName}`;
          object.label = language === languages.VI ? labeVi : labeEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};
          let labeEn = `${item.valueEn} $`;
          let labeVi = item.valueVi;
          object.label = language === languages.VI ? labeVi : labeEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};
          let labeEn = item.valueEn;
          let labeVi = item.valueVi;
          object.label = language === languages.VI ? labeVi : labeEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
      if (type === "SPECIALTY") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;

          result.push(object);
        });
      }
      if (type === "CLINIC") {
        inputData.map((item, index) => {
          let object = {};
          object.label = item.name;
          object.value = item.id;

          result.push(object);
        });
      }
    }
    return result;
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };
  handleChange = (selectedOption) => {
    this.setState({ selectedOption: selectedOption });
    this.props.getDetailDoctor(selectedOption.value);
  };
  handleChangeInfoDoctor = (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({ ...stateCopy });
  };
  handleOnchangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };
  handleSaveContentMarkdown = () => {
    this.props.fetchSaveDoctorsRedux({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: this.state.action,
      selectedPrice: this.state.selectedPrice.value,
      selectedProvince: this.state.selectedProvince.value,
      selectedPayment: this.state.selectedPayment.value,
      ClinicName: this.state.ClinicName,
      ClinicAddress: this.state.ClinicAddress,
      Note: this.state.Note,
      clinicId:
        this.state.selectedClinic && this.state.selectedClinic.value
          ? this.state.selectedClinic.value
          : "",
      specialId: this.state.selectedSpecial.value,
    });
    //* tomorrow write handel save content doctor ,success
    //! Attention write handel function redux save content doctor,success
    //? Attention write handel function,
  };

  render() {
    let { action } = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="manager-doctor-info.header"></FormattedMessage>
        </div>
        <div className="more-info">
          <div className="content-left form-group">
            <label>
              <FormattedMessage id="manager-doctor-info.select"></FormattedMessage>
            </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChange}
              options={this.state.listDoctors}
              placeholder={
                <FormattedMessage id="manager-doctor-info.select"></FormattedMessage>
              }
            />
          </div>

          <div className="content-right">
            <label>
              <FormattedMessage id="manager-doctor-info.information"></FormattedMessage>
            </label>
            <textarea
              className="form-control"
              rows={4}
              onChange={(event) =>
                this.handleOnchangeText(event, "description")
              }
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="more-info-detail row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manager-doctor-info.price"></FormattedMessage>
            </label>
            <Select
              // value={this.state.selectedOption}
              onChange={this.handleChangeInfoDoctor}
              value={this.state.selectedPrice}
              options={this.state.resPrice}
              placeholder={
                <FormattedMessage id="manager-doctor-info.price"></FormattedMessage>
              }
              name="selectedPrice"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manager-doctor-info.payment"></FormattedMessage>
            </label>
            <Select
              // value={this.state.selectedOption}
              onChange={this.handleChangeInfoDoctor}
              options={this.state.resPayment}
              value={this.state.selectedPayment}
              placeholder={
                <FormattedMessage id="manager-doctor-info.payment"></FormattedMessage>
              }
              name="selectedPayment"
            />
          </div>
          <div className="col-4 form-group">
            <FormattedMessage id="manager-doctor-info.province"></FormattedMessage>

            <Select
              // value={this.state.selectedOption}
              onChange={this.handleChangeInfoDoctor}
              placeholder={
                <FormattedMessage id="manager-doctor-info.province"></FormattedMessage>
              }
              options={this.state.resProvince}
              value={this.state.selectedProvince}
              name="selectedProvince"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manager-doctor-info.ClinicName"></FormattedMessage>
            </label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnchangeText(event, "ClinicName")}
              value={this.state.ClinicName}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manager-doctor-info.ClinicAddress"></FormattedMessage>
            </label>
            <input
              className="form-control"
              onChange={(event) =>
                this.handleOnchangeText(event, "ClinicAddress")
              }
              value={this.state.ClinicAddress}
            />
          </div>
          <div className="col-4 form-group">
            <FormattedMessage id="manager-doctor-info.Note"></FormattedMessage>
            <input
              className="form-control"
              onChange={(event) => this.handleOnchangeText(event, "Note")}
              value={this.state.Note}
            />
          </div>
        </div>
        <div className="more-info-detail row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manager-doctor-info.selectedSpecial"></FormattedMessage>
            </label>
            <Select
              onChange={this.handleChangeInfoDoctor}
              options={this.state.resSpecialty}
              value={this.state.selectedSpecial}
              placeholder={
                <FormattedMessage id="manager-doctor-info.selectedSpecial"></FormattedMessage>
              }
              name="selectedSpecial"
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="manager-doctor-info.selectedClinic"></FormattedMessage>
            </label>
            <Select
              onChange={this.handleChangeInfoDoctor}
              options={this.state.resClinic}
              value={this.state.selectedClinic}
              placeholder={
                <FormattedMessage id="manager-doctor-info.selectedClinic"></FormattedMessage>
              }
              name="selectedClinic"
            />
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>

        <button
          className={
            action === CRUD.CREATE
              ? "save-content-doctor"
              : "edit-content-doctor"
          }
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {action === CRUD.CREATE ? (
            <span>
              <FormattedMessage id="manager-doctor-info.save"></FormattedMessage>
            </span>
          ) : (
            <span>
              <FormattedMessage id="manager-doctor-info.edit"></FormattedMessage>
            </span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.doctorsArr,
    detailDoctorRedux: state.admin.detailDoctor,
    AllInfoDoctorRedux: state.admin.AllInfoDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDoctorsRedux: () => dispatch(actions.fetchAllDoctorStart()),
    fetchAllInfoDoctorRedux: () => dispatch(actions.fetchAllInfoDoctor()),
    fetchSaveDoctorsRedux: (data) =>
      dispatch(actions.fetchSaveDoctorStart(data)),
    getDetailDoctor: (id) => dispatch(actions.fetchDetailDoctorStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerDoctor);
