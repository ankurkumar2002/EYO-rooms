import React, { Component } from "react";
import Navbar from "../navigation/navbar";
import PaymentMethodCard from "./paymentMethodCard/PaymentMethodCard";
import PaymentMethodDetail from "./PaymentMethodDetail/PaymentMethodDetail";
import PaymentMethodBooking from "./paymentMethodBooking/PaymentMethodBooking";
import { connect } from "react-redux";
import { loginRequestWithOtp } from "../../redux/authentication/actions";

class paymentMethod extends Component {
  render() {
    const { isAuth, user, entityData, billingData } = this.props;
    return (
      <>
        <Navbar />
        <div className="container-fluid">
          <div className="row m-0">
            <div className="col-7 mt-4">
              {!isAuth && <PaymentMethodDetail />}
              {isAuth && (
                <PaymentMethodBooking
                  price={billingData.selected.actual_price}
                  discount={billingData.selected.discount_price}
                  savings={billingData.selected.offer.savings}
                  username={user.name}
                  email={user.email}
                  mobile={user.mobile}
                />
              )}
            </div>
            <div className="col-5  mt-5">
              <PaymentMethodCard
                title={entityData.data.name}
                rating={entityData.data.rating}
                ratings={entityData.data.no_of_ratings}
                rooms={billingData.selected.no_of_rooms}
                guests={billingData.selected.no_of_guests}
                type={billingData.selected.type}
                price={billingData.selected.actual_price}
                discount={billingData.selected.discount_price}
                savings={billingData.selected.offer.savings}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  otpGenerate: state.auth.otpGenarate,
  user: state.auth.user,
  token: state.auth.token,
  isAuth: state.auth.isAuth,
  entityData: state.auth.entityData,
  review: state.auth.review,
  billingData: state.auth.billingData,
});

const mapDispatchToProps = (dispatch) => ({
  loginRequestWithOtp: (payload) => dispatch(loginRequestWithOtp(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(paymentMethod);
