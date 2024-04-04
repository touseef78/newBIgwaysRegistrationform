<template>
    <div>


        <div class="container-fluid bg-color">
            <h2 class="heading">Vue Js</h2>
            <div class="row">
                <div class="col-md-6 first">
                    <h1 class="rate">Get Rate For School Ride </h1>
                    <p>Request a ride, trust us, get a quote.</p>
                    <div class="form-container-main">
                        <form @submit.prevent="test">

                            <!-- <div>
                                <button @click="geoFindMe">Show my location</button><br />
                                <p>{{ status }}</p>
                                <a :href="mapLink" target="_blank">{{ mapLinkText }}</a>
                            </div>  -->

                            <div class="input-with-icon">
                                <!-- <input type="text" id="pickupLocation" v-model="origin"
                                    placeholder="Enter pickup location of student" class="form-control" required /> -->
                                <input ref="autocompleteInput" type="text"
                                    placeholder="Enter pickup location of student" v-model="origin" class="form-control"
                                    required />

                                <i class="fas fa-map-marker-alt" id="showMapMarker" @click="geoFindMe"></i>
                                <div class="invalid-feedback">
                                    This field must be filled.
                                </div>
                                <div id="map">
                                    <MapWithMarker :latitude="latitude1" :longitude="longitude1"
                                        :key="`${latitude1}-${longitude1}`" v-show="showmap" />

                                </div>
                            </div>

                            <br />

                            <div class="input-with-icon">
                                <!-- <input type="text" v-model="destination" placeholder="Enter drop location of school"
                                    class="form-control" required /> -->
                                <input ref="autocompleteInput2" type="text" v-model="destination"
                                    placeholder="Enter drop location of school" class="form-control" required />

                                <i class="fas fa-map-marker-alt" id="showMapMarker"></i>
                                <div class="invalid-feedback">
                                    This field must be filled.
                                </div>
                                <div id="map">
                                    <MapWithMarker :latitude="latitude2" :longitude="longitude2"
                                        :key="`${latitude2}-${longitude2}`" v-show="showmap2" />

                                </div>

                            </div>

                            <br />

                            <div class="numeric_box">
                                <!-- <input type="text" placeholder="Select number of children/students" class="form-control"
                                required />
                            <div class="invalid-feedback">
                                This field must be filled.
                            </div> -->
                                <!-- <br /> -->
                                <!-- <div class="input-with-icon">
                                <input type="number" id="numericInput" placeholder="Numeric Box" class="form-control"
                                    v-model.number="numericValue" required />
                                <div class="invalid-feedback">
                                    This field must be filled.
                                </div>
                            </div> -->
                                <!-- Displaying distance and price -->
                                <!-- <div class="distance-and-price">
                                    <p>Distance: {{ distance }} km</p>
                                    <p v-if="price">Price: ${{ price }}</p>
                                </div> -->

                                <!-- <input type="number" class="numeric-input"> -->
                                <div class="five input-with-icon" type="number" id="numericInput">
                                    <p>Numeric Box</p>
                                    <div class="numeric-box">
                                        <span class="negative-sign" onclick="decrement()">-</span>
                                        <!-- <span class="numeric-value" id="numericValue">0</span> -->
                                        <input class="numeric-value small-input" type="number"
                                            v-model.number="numericValue" required>
                                        <span class="positive-sign" onclick="increment()">+</span>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div class="custom-dropdown">
                                <select class="form-control" required>
                                    <option value="" disabled selected>
                                        Select type of vehicle
                                    </option>
                                    <option value="ac">AC</option>
                                    <option value="non-ac">Non-AC</option>
                                </select>
                                <!-- <div v-if="cartype">
                                    Selected car type: {{ cartype }}
                                </div> -->
                            </div>
                            <br />


                            <div class="custom-dropdown">
                                <select class="form-control" v-model="cartype" @change="handleChange" required>
                                    <option value="" disabled selected>
                                        Select subcategory of vehicle
                                    </option>
                                    <option value="bus">Bus</option>
                                    <option value="car">Car</option>
                                    <option value="car-cabin">Cabin-Car</option>
                                    <option value="hiace">Hiace</option>
                                    <option value="changan">Eleven-seater changan</option>
                                </select>
                            </div>
                            <br />
                            <button type="submit" class="button btn btn-primary">Get
                                Quote</button>
                            <p class="error-message">{{ errorMessage }}</p>
                        </form>
                    </div>
                </div>

                <div class="col-md-6 image">
                    <img :src="carImage" alt="" />
                </div>
            </div>
            <Model :origin="origin" :destination="destination" :cartype="cartype" :distance="distance" />
        </div>

    </div>

</template>

<script>
import { ref, onMounted } from 'vue';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "../Style/Task.css";
import Car from "../assets/Car.png";
import Model from "./Model.vue";
import MapWithMarker from './MapWithMarker.vue';


export default {

    name: 'PlaceAutocomplete',
    // computed: {
    //     price() {
    //         // You can calculate the price based on the distance and other factors
    //         // For demonstration, let's assume a base rate of $1 per km
    //         const baseRatePerKm = 50;
    //         let totalPrice = baseRatePerKm * parseFloat(this.distance);

    //         // Add additional logic here to adjust the price based on the type of vehicle or any other factors
    //         // console.log(totalPrice);
    //         return totalPrice.toFixed(2); // Rounded to 2 decimal places
    //     }
    // },
    setup() {
        const autocompleteInput = ref(null);
        const autocompleteInput2 = ref(null);
        const latitude1 = ref(null);
        const longitude1 = ref(null);
        const latitude2 = ref(null);
        const longitude2 = ref(null);
        const showmap = ref(false);
        const showmap2 = ref(false);
        // for auto detect current location code  
        const status = ref("");
        const mapLink = ref("");
        const mapLinkText = ref("");
        const distance = ref(null);



        onMounted(() => {
            const autocomplete = new google.maps.places.Autocomplete(autocompleteInput.value);
            // console.log(autocompleteInput.value)
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                showmap.value = true;
                if (place.geometry && place.geometry.location) {
                    latitude1.value = place.geometry.location.lat();
                    longitude1.value = place.geometry.location.lng();
                    console.log("Latitude:", latitude1);
                    console.log("Longitude:", longitude1);

                    // Update the origin property with the selected place name
                    origin = place.name; // Assuming place.name contains the name of the selected place
                }
                console.log(place);
            });

            const autocomplete2 = new google.maps.places.Autocomplete(autocompleteInput2.value);

            autocomplete2.addListener('place_changed', () => {
                const place2 = autocomplete2.getPlace();
                showmap2.value = true;
                if (place2.geometry && place2.geometry.location) {
                    latitude2.value = place2.geometry.location.lat();
                    longitude2.value = place2.geometry.location.lng();
                    console.log("Latitude:", latitude2);
                    console.log("Longitude:", longitude2);

                    // Check if latitude and longitude values are valid numbers
                    if (!isNaN(latitude2.value) && !isNaN(longitude2.value)) {
                        // Call the distance calculation function passing latitude1, longitude1, latitude2, and longitude2
                        distance.value = calculateDistance(latitude1.value, longitude1.value, latitude2.value, longitude2.value);
                        console.log("Distance:", distance.value + " km");
                    } else {
                        console.error("Invalid latitude or longitude values.");
                    }

                }
                console.log(place2);
            });
        });
        // for auto detect current location code  
        const geoFindMe = () => {
            if (!navigator.geolocation) {
                status.value = "Geolocation is not supported by your browser";
            } else {
                navigator.geolocation.getCurrentPosition(
                    success,
                    () => {
                        status.value = "Unable to retrieve your location";
                    }
                );
            }
        };

        const success = (position) => {
            latitude1.value = position.coords.latitude;
            longitude1.value = position.coords.longitude;
            showmap.value = true;


        };


        //   Distance calculated code here 
        function calculateDistance(lat1, lon1, lat2, lon2) {
            // Function to calculate distance between two points
            const R = 6371; // Radius of the Earth in km
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c;
            return distance.toFixed(2); // Rounded to 2 decimal places

        }

        return {
            autocompleteInput,
            autocompleteInput2,
            latitude1,
            longitude1,
            latitude2,
            longitude2,
            carImage: Car,
            origin: '',
            destination: '',
            cartype: '',
            numericValue: null,
            errorMessage: '',
            showMapPopup: false,
            showmap, // Expose showmap in the return object
            showmap2,
            // for auto detect current location code  
            status,
            mapLink,
            mapLinkText,
            geoFindMe,
            distance,



        };
    },
    components: {
        Model,
        MapWithMarker,

        // 'qrcode-vue': VueQrcode
    },
    methods: {
        test() {
            if (this.validateForm()) {
                $('#oneModal').modal('show');
                this.showmap = false;
                this.showmap2 = false;

            } else {
                this.errorMessage = 'Please fill in all fields.';
            }
        },

        validateForm() {
            if (this.origin && this.destination && this.numericValue) {
                return true;
            } else {
                return false;
            }
        },
        // calculateDistanceBetweenLocations() {
        //     // Call the calculateDistance function with the coordinates of pickup and drop-off locations
        //     const distance = this.calculateDistance(this.latitude1, this.longitude1, this.latitude2, this.longitude2);
        //     console.log('Distance:', distance.toFixed(2), 'km');
        // }

        // storeInput() {
        //     this.storeInput = this.origin;
        // }
        // handleGetQuote(data) {
        //     this.origin = data.origin;
        //     this.destination = data.destination;
        //     this.cartype = data.cartype;
        // }
        forceUpdate() {
            this.$forceUpdate();
        },

        handleChange(e) {
            this.cartype = e.target.value;
        }
    },
};
</script>
