<template>
    <div>


        <div class="container-fluid bg-color">
            <h2 class="heading">BigWays Management System</h2>
            <!-- .....Tab  code  here .  -->

            <!-- <div class="container">
                <div class="row">
                    <div class="portfolio-button">
                        <div class="portfolio-button-items">
                            <router-link class="portfolio-button-item qodef--active" to="/private">
                                <span class="portfolio-button-item-name">Private Car</span>
                            </router-link>
                            <router-link class="portfolio-button-item" to="/public">
                                <span class="portfolio-button-item-name">Public Bus</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div> -->
            <!-- <div class="container">
                <div class="row">
                    <div class="portfolio-button">
                        <div class="portfolio-button-items">
                            <router-link class="portfolio-button-item"
                                :class="{ 'qodef--active': isActive === 'private' }" to="/private"
                                @click.native="setActive('private')">
                                <span class="portfolio-button-item-name">Private Car</span>
                            </router-link>
                            <router-link class="portfolio-button-item"
                                :class="{ 'qodef--active': isActive === 'public' }" to="/public"
                                @click.native="setActive('public')">
                                <span class="portfolio-button-item-name">Public Bus</span>
                            </router-link>
                        </div>
                    </div>
                </div>
            </div> -->





            <!-- .................  -->
            <div class="row">
                <div class="col-md-6 first">
                    <h1 class="rate">Get Rate For School Ride </h1>
                    <p>Request a ride, trust us, get a quote.</p>
                    <div class="form-container-main">
                        <form @submit.prevent="test">

                            <div class="input-with-icon">

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


                            <!-- .............. -->
                            <div class="five">
                                <p>Select Number of Children</p>
                                <div class="numeric-box" style="width: 150px;">
                                    <span class="negative-sign" @click="decrement1()">-</span>
                                    <span class="numeric-value" id="numericValue">1</span>
                                    <span class="positive-sign" @click="increment1()">+</span>
                                </div>
                            </div>

                            <br />


                            <div>
                                <div class="custom-dropdown">
                                    <select class="form-control" v-model="vehicleType" @change="fetchVehicles" required>
                                        <option value="" disabled selected>
                                            Select type of vehicle
                                        </option>
                                        <option value="AC">AC</option>
                                        <option value="Non AC">Non-AC</option>
                                    </select>
                                    <div v-if="loading" class="spinner-border loader" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                                <br />
                                <div v-if="vehicles.length > 0" class="custom-dropdown">
                                    <select class="form-control" v-model="cartype" @change="updateVehicleName" required>
                                        <option value="" disabled selected>
                                            Select subcategory of vehicle
                                        </option>
                                        <option v-for="vehicle in vehicles" :value="vehicle.id" :key="vehicle.id">
                                            {{ vehicle.name }} &nbsp;/&nbsp; {{ vehicle.per_km }}
                                        </option>
                                    </select>
                                </div>
                                <br />
                            </div>

                            <button type="submit" class="button btn btn-primary">Get
                                Quote</button>
                            <br>
                            <br>

                            <p class="error-message">{{ errorMessage }}</p>
                        </form>
                    </div>
                </div>

                <div class="col-md-6 image">
                    <img :src="carImage" alt="" />
                </div>
            </div>
            <Model :origin="origin" :destination="destination" :cartype="cartype" :distance="distance"
                :vehicleName="selectedVehicleName" :vehiclecharge="selectedVehiclecharge" :picup_latitude="latitude1"
                :picup_longitude="longitude1" :drop_latitude="latitude2" :drop_longitude="longitude2"
                :numericValue="numericValue" :vehicleType="vehicleType" :isPublic="false" />
            <!-- <Public /> -->
        </div>
        <router-view />

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
import axios from 'axios'; // Import axios for making HTTP requests




export default {

    name: 'PlaceAutocomplete',
    name: 'VehicleSelection',
    name: 'Task',
    setup() {
        const autocompleteInput = ref(null);
        const autocompleteInput2 = ref(null);
        const latitude1 = ref(null);
        const longitude1 = ref(null);
        const latitude2 = ref(null);
        const longitude2 = ref(null);
        const showmap = ref(false);
        const showmap2 = ref(false);

        const origin = ref('');
        const destination = ref('');
        const cartype = ref('');
        const numericValue = ref(1);
        const errorMessage = ref('');
        // for auto detect current location code  
        const status = ref("");
        const mapLink = ref("");
        const mapLinkText = ref("");
        const distance = ref(null);

        const vehicleType = ref(''); // Moved declaration inside setup()

        const vehicles = ref([]);
        const selectedVehicleName = ref('');
        const selectedVehiclecharge = ref('');
        const loading = ref(null);

        const fetchVehicles = async () => {
            loading.value = true;
            try {
                const response = await axios.get(`https://backendbigways.singsavatech.com/api/vehicleIndex/${vehicleType.value}`);
                vehicles.value = response.data.data;
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            }
            finally {
                loading.value = false; // Set loading to false after the request is completed
            }
        };

        const updateVehicleName = () => {
            const selectedVehicle = vehicles.value.find(vehicle => vehicle.id === cartype.value);
            selectedVehicleName.value = selectedVehicle ? selectedVehicle.name : '';
            selectedVehiclecharge.value = selectedVehicle ? selectedVehicle.per_km : '';
        };

        onMounted(() => {
            const autocomplete = new google.maps.places.Autocomplete(autocompleteInput.value);
            // console.log(autocompleteInput.value)
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                showmap.value = true;
                // console.log('text' + place);
                if (place.geometry && place.geometry.location) {
                    latitude1.value = place.geometry.location.lat();
                    longitude1.value = place.geometry.location.lng();
                    console.log("Latitude:", latitude1);
                    console.log("Longitude:", longitude1);

                    // Update the origin property with the selected place name
                    // origin.value = place.name;
                    origin.value = place.formatted_address;
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
                    // destination.value = place2.name;
                    destination.value = place2.formatted_address;
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

        const geoFindMe = () => {
            if (!navigator.geolocation) {
                status.value = "Geolocation is not supported by your browser";
            } else {
                status.value = "Locating…";
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const latitude = position.coords.latitude;
                        const longitude = position.coords.longitude;
                        console.log(position);
                        // Using Geocoding to get address from coordinates
                        const geocoder = new google.maps.Geocoder();
                        // const latlng = new google.maps.LatLng(latitude, longitude);
                        const latlng = { lat: latitude, lng: longitude }; // Construct latlng object

                        geocoder.geocode({ 'location': latlng }, (results, status) => {
                            if (status === google.maps.GeocoderStatus.OK) {
                                if (results[0]) {
                                    // Update the origin with the fetched address
                                    origin.value = results[0].formatted_address;
                                    console.log("Current Location:", origin.value);
                                }
                            } else {
                                console.log("Geocoder failed due to: " + status);
                            }
                        });

                        // Set latitude and longitude values
                        latitude1.value = latitude;
                        longitude1.value = longitude;

                        // Show the map
                        showmap.value = true;
                    },
                    (error) => {
                        status.value = "Unable to retrieve your location: " + error.message;
                    },
                    { enableHighAccuracy: true } // Specify enableHighAccuracy option
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
            loading,
            autocompleteInput,
            autocompleteInput2,
            latitude1,
            longitude1,
            latitude2,
            longitude2,
            carImage: Car,
            origin,
            destination,
            cartype,
            numericValue,
            errorMessage,
            showMapPopup: false,
            showmap, // Expose showmap in the return object
            showmap2,
            // for auto detect current location code  
            status,
            mapLink,
            mapLinkText,
            geoFindMe,
            distance,
            vehicleType,
            cartype,
            vehicles,
            selectedVehicleName,
            selectedVehiclecharge,
            fetchVehicles,
            updateVehicleName,
            isActive: 'private',




        };
    },
    components: {
        Model,
        MapWithMarker,

    },
    methods: {

        // active  code  here 
        setActive(button) {
            this.isActive = button;
        },
        // active  code end here 
        decrement1() {
            this.numericValue = this.numericValue - 1;
            if (this.numericValue <= 1) {
                this.numericValue = 1;
            }
            document.getElementById("numericValue").textContent = this.numericValue;
        },
        increment1() {
            this.numericValue = this.numericValue + 1;
            document.getElementById("numericValue").textContent = this.numericValue;
        },

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

        // }
        forceUpdate() {
            this.$forceUpdate();
        },

        handleChange(e) {
            this.cartype = e.target.value;
        },



    },
};
</script>
