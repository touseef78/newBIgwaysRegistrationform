<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../Style/Task.css"
import VueQrcode from 'vue-qrcode';
// import Car from "../assets/Car.png"


export default {
    // name: 'ModelOne',
    props: {
        origin: String,
        destination: String,
        cartype: String,
        distance: {
            type: Number,
            required: true
        }
    },
    computed: {
        price() {
            // You can calculate the price based on the distance and other factors
            // For demonstration, let's assume a base rate of $1 per km
            const baseRatePerKm = 50;
            let totalPrice = baseRatePerKm * parseFloat(this.distance);

            // Add additional logic here to adjust the price based on the type of vehicle or any other factors
            // console.log(totalPrice);
            return totalPrice.toFixed(2); // Rounded to 2 decimal places
        }
    },
    components: {
        'qrcode-vue': VueQrcode,

    },

    data() {
        return {
            // carImage: Car,
            // modalOne: false,
            // modalTwo: false,
            // isModalOpen: false
            downloadLink: 'https://yourappdownloadlink.com'

        }
    },

    methods: {
        secondModel() {
            // alert('second time');
            $('#oneModal').modal('hide');
            $('#secondModal').modal('show');
        },
        anotherModel() {
            // alert('3rd time');
            $('#secondModal').modal('hide');
            $('#threeModal').modal('show');
        },
        downloadApp() {
            // Implement download logic here
            // For example, redirect to the download link
            window.location.href = this.downloadLink;
        }

    }
}
</script>

<template>
    <div>

        <!-- Modal One-->
        <div class="modal fade" id="oneModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel"> First Modal</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="first-modal-body">
                        <!-- ...... -->
                        <div class="col-md-12 second">
                            <h3> Estimate Calculation</h3>
                            <div class="estimate">
                                <h5>Estimate</h5>

                                <p>Pickup: {{ origin }}</p>
                                <p>Drop Off: {{ destination }}</p>
                                <p>Car Type: {{ cartype }}</p>
                                <div class="distance-and-price">
                                    <p>Distance: {{ distance }} km</p>
                                    <!-- <p v-if="price">Price: PKR {{ price }}</p> -->
                                </div>

                                <!-- <button class="btn btn-primary" type="submit">Confirm Booking</button> -->
                                <div class="first-modal-button">
                                    <button class="btn btn-primary" @click="secondModel()" type="submit">Confirm
                                        Booking</button>
                                    &nbsp;
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="first-modal-footer">
                        <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="secondModel()">Save changes</button> -->
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal  Two-->
        <div class="modal fade" id="secondModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel"> Second Modal</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="second-modal-body">
                        <!-- ... -->
                        <!-- Second Modal Open here ....? -->
                        <!-- ......  -->
                        <div className="container-fluid bg-color-modal">
                            <!-- <div className="row"> -->
                            <div className="col-md-12 secondmodal">
                                <h1>For School Ride Must Fill</h1>

                                <div className="form-container-main">
                                    <form @submit.prevent="anotherModel">
                                        <div className="">
                                            <input type="name" placeholder="Enter the name" className="form-control"
                                                required />
                                            <div class="invalid-feedback">
                                                This field must be filled.
                                            </div>
                                        </div>
                                        <br />

                                        <div className="">
                                            <input type="mobile" placeholder="Enter the mobile number"
                                                className="form-control" required />
                                            <div class="invalid-feedback">
                                                This field must be filled.
                                            </div>
                                        </div>
                                        <br />
                                        <div className="">
                                            <input type="city" placeholder="Enter the city" className="form-control"
                                                required />
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

                                        <div class="second-modal-button">
                                            <button type="submit" class="button btn btn-primary">Send
                                                Request</button>
                                            &nbsp;
                                            <button type="button" class="btn btn-secondary"
                                                data-bs-dismiss="modal">Close</button>
                                        </div>
                                    </form>
                                </div>
                            </div>


                            <!-- </div> -->
                        </div>
                    </div>
                    <div class="second-modal-footer">
                        <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->
                        <!-- <button type="button" class="btn btn-primary" @click="anotherModel()">Submit</button> -->
                    </div>
                </div>
            </div>
        </div>
        <!-- Three Modal  -->

        <!-- Modal Foure  -->
        <div class="modal fade" id="threeModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Third Modal</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="third-modal-body">
                        <div class="payable">
                            <div class="message">
                                <h2>Contacting Message</h2>
                                <p>Thank for contacting us,the admin will review your applicationand will get back to
                                    email and also download application in order to keep updating status.Thank You</p>
                            </div>
                            <h4>Amount Payable</h4>
                            <!-- <p>Total Amount : PKR 23</p> -->
                            <div class="distance-and-price">
                                <p v-if="price">Total Amount : PKR &nbsp;{{ price }}</p>
                            </div>

                            <!-- QR code component -->
                            <qrcode-vue :value="downloadLink"></qrcode-vue>
                            <button type="button" class="btn btn-primary">Download App</button>
                            &nbsp;
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>

                        </div>
                    </div>
                    <div class="third-modal-footer">
                        <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
