import React, { useState, useEffect } from "react";
import styles from "../../sidebar/sidebar.module.css";
import {
  hotelListingDataRequest,
  handleParams,
} from "../../../../redux/authentication/actions";
import { connect } from "react-redux";
import { build } from "search-params";

class SidebarCheckinItems extends React.Component {
  componentDidUpdate(prevProps) {
    const { hotelListingDataRequest, hotelData } = this.props;
    var para = {};
    hotelData &&
      hotelData.filters.checkin_features.forEach((item) => {
        if (item.status && para.checkin_features) {
          para["checkin_features"].push(item.label);
        } else if (item.status) {
          para["checkin_features"] = [item.label];
        }
      });
    if (prevProps.value !== this.props.value) {
      console.log(this.props);
      this.props.url.history.push(build(para));
      hotelListingDataRequest(build(para));
    }
  }
  render() {
    const {
      label,
      onClick,
      hotelData,
      hotelListingDataRequest,
      value,
    } = this.props;
    return (
      <>
        <div>
          <label onClick={onClick}>
            <input
              id={styles.check}
              type="checkbox"
              checked={value}
              aria-label="Checkbox for following text input"
            />
            <span>{label}</span>
          </label>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  hotelData: state.auth.hotelListData,
  params: state.auth.params,
});

const mapDispatchToProps = (dispatch) => ({
  hotelListingDataRequest: (payload) =>
    dispatch(hotelListingDataRequest(payload)),
  handleParams: (payload) => dispatch(handleParams(payload)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarCheckinItems);
