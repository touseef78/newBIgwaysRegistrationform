<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../Style/Task.css"
// import Car from "../assets/Car.png"


export default {
    name: 'ModelOne',

}
</script>
<template>
    <div class="first-model">
        <div class="container-fluid bg-color">
            <h2 class="heading">Model Vue Js</h2>
            <div class="row">
                <div class="col-md-12 second">
                    <h3>Calculated Amount As Per Above Form </h3>
                    <div class="estimate">
                        <h5>Estimate</h5>
                        <p>Pickup:----------------</p>
                        <p>Drop Off:----------------</p>
                        <p>Car Type:----------------</p>
                        <button class="btn btn-primary" type="submit">Confirm Booking</button>
                    </div>
                </div>


                <!-- <div className="container-fluid bg-color">
                    <h2 className="heading">Vue Js</h2>
                    <div className="row">
                        <div className="col-md-6 first">
                            <h1>Get Rate For School Ride </h1>

                            <div className="form-container-main">
                                <form>
                                    <div className="">
                                        <input type="name" placeholder="Enter the name" className="form-control" required />
                                        <div class="invalid-feedback">
                                            This field must be filled.
                                        </div>
                                    </div>
                                    <br />

                                    <div className="">
                                        <input type="mobile" placeholder="Enter the mobile number" className="form-control"
                                            required />
                                        <div class="invalid-feedback">
                                            This field must be filled.
                                        </div>
                                    </div>
                                    <br />
                                    <div className="">
                                        <input type="city" placeholder="Enter the city" className="form-control" required />
                                        <div class="invalid-feedback">
                                            This field must be filled.
                                        </div>
                                    </div>
                                    <br />
                                    <div className="">
                                        <input type="email" placeholder="Enter the email" className="form-control"
                                            required />
                                        <div class="invalid-feedback">
                                            This field must be filled.
                                        </div>
                                    </div>
                                    <br />


                                    <br />

                                    <button className="button btn btn-primary">Send Request</button>
                                </form>
                            </div>
                        </div>


                    </div>
                </div> -->
                <!-- <div class="payable">
                    <h4>Amount Payable</h4>

                </div> -->


            </div>
        </div>
    </div>
</template>