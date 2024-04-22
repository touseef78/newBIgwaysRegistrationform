<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../Style/Task.css"
import VueQrcode from 'vue-qrcode';
import axios from 'axios'; // Import axios for making HTTP requests
// import Car from "../assets/Car.png"


export default {
    // name: 'ModelOne',
    props: {
        origin: String,
        destination: String,
        vehicleType: String,
        cartype: String,
        vehicleName: String,
        vehiclecharge: String,
        drop_latitude: String,
        drop_longitude: String,
        picup_latitude: String,
        picup_longitude: String,
        total_students: String,
        numericValue: Number,
        distance: {
            type: Number,
            required: true
        }
    },
    computed: {
        price() {
            // You can calculate the price based on the distance and other factors
            // For demonstration, let's assume a base rate of $1 per km
            // const baseRatePerKm = 50;
            const baseRatePerKm = parseFloat(this.vehiclecharge);
            let totalPrice = baseRatePerKm * parseFloat(this.distance) * parseFloat(this.numericValue);
            return totalPrice.toFixed(2); // Rounded to 2 decimal places
        }
    },
    components: {
        'qrcode-vue': VueQrcode,

    },

    data() {
        return {
            downloadLink: 'https://yourappdownloadlink.com'

        }
    },

    methods: {
        secondModel() {
            // alert('second time');
            $('#oneModal').modal('hide');
            $('#secondModal').modal('show');
        },
        // anotherModel() {
        //     // alert('3rd time');
        //     $('#secondModal').modal('hide');
        //     $('#threeModal').modal('show');
        // },
        async anotherModel() {
            try {
                // Prepare the request data
                const requestData = {
                    name: this.name,
                    phone_number: this.mobile_number,
                    city: this.city,
                    email: this.email,
                    amount: this.price,
                    vehicle_id: this.cartype,
                    pickup_location: this.origin,
                    drop_location: this.destination,
                    total_students: this.numericValue,

                    pickup_latitude: this.picup_latitude,
                    pickup_longitude: this.picup_longitude,

                    drop_latitude: this.drop_latitude,
                    drop_longitude: this.drop_longitude,
                    type: "parents"
                };

                // Make the API request to save data
                const response = await axios.post('https://backendbigways.singsavatech.com/api/registration', requestData);

                // Handle the response
                console.log('Data saved:', response.data);

                // Show the third modal
                $('#secondModal').modal('hide');
                $('#threeModal').modal('show');
            } catch (error) {
                console.error('Error saving data:', error);
                // Handle error
            }
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
                        <h1 class="modal-title fs-5" id="exampleModalLabel"> Confirm Booking</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="first-modal-body">
                        <!-- ...... -->
                        <div class="col-md-12 second">
                            <h3> Estimate Calculation</h3>
                            <div class="estimate">
                                <h5>Estimate</h5>

                                <div class="estimate-details">
                                    <div class="detail"><strong>Pickup:</strong> {{ origin }}</div>
                                    <div class="detail"><strong>Drop Off:</strong> {{ destination }}</div>
                                    <div class="detail"><strong>Car Type: </strong>{{ vehicleType }}</div>
                                    <div class="detail"><strong>Distance:</strong> {{ distance }} km</div>
                                </div>

                                <!-- <button class="btn btn-primary" type="submit">Confirm Booking</button> -->
                                <div class="first-modal-button">
                                    <button class="btn btn-primary" @click="secondModel()" type="submit">Confirm
                                        Booking</button>
                                    &nbsp;
                                    <!-- <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Close</button> -->
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
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Required School Ride Information</h1>
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
                                                v-model="name" required />
                                            <div class="invalid-feedback">
                                                This field must be filled.
                                            </div>
                                        </div>
                                        <br />

                                        <div className="">
                                            <input type="mobile" pattern="[0-9]{11}"
                                                placeholder="Enter the mobile number" className="form-control"
                                                title="Please enter a valid 11-digit mobile number"
                                                v-model="mobile_number" required />
                                            <div class="invalid-feedback">
                                                Please enter a valid 11-digit mobile number.
                                            </div>
                                        </div>
                                        <br />
                                        <div className="">
                                            <input type="city" placeholder="Enter the city" className="form-control"
                                                v-model="city" required />
                                            <div class="invalid-feedback">
                                                This field must be filled.
                                            </div>
                                        </div>
                                        <br />
                                        <div className="">
                                            <input type="email" placeholder="Enter the email" className="form-control"
                                                v-model="email" required />
                                            <div class="invalid-feedback">
                                                This field must be filled.
                                            </div>
                                        </div>
                                        <br />

                                        <div class="second-modal-button">
                                            <button type="submit" class="button btn btn-primary">Send
                                                Request</button>
                                            &nbsp;
                                            <!-- <button type="button" class="btn btn-secondary"
                                                data-bs-dismiss="modal">Close</button> -->
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
                        <h1 class="modal-title fs-5" id="exampleModalLabel">Total Rent</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="third-modal-body">
                        <div class="payable">
                            <div class="message">
                                <h2>Contacting Message</h2>
                                <p>Thank for contacting us,the admin will review your application and will get back to
                                    email and also download application in order to keep updating status.Thank You</p>
                            </div>
                            <h4>Amount Payable</h4>

                            <div class="distance-and-price">

                                <p v-if="price"><strong>Total Amount : PKR </strong>&nbsp;
                                    <span
                                        style="font-weight: bold; font-size: xx-large; text-decoration: underline; font-weight: 800;">{{
                                            price }}</span>

                                </p>
                            </div>

                            <!-- QR code component -->
                            <qrcode-vue :value="downloadLink"></qrcode-vue>
                            <button type="button" class="btn btn-primary">Download App</button>
                            &nbsp;
                            <!-- <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> -->

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
