<template>
    <div>


        <div class="container-fluid bg-color">
            <h2 class="heading">BigWays Management System</h2>
            <!-- ......  -->
            <div class="container">
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
            </div>


            <!-- .................  -->
            <div class="row">
                <!-- <router-view> -->
                <div class="col-md-6 first">
                    <h1 class="rate">Get Rate For School Ride</h1>
                    <p>Request a ride, trust us, get a quote.</p>
                    <div class="form-container-main">
                        <form @submit.prevent="send">

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

                            <!-- <div class="custom-dropdown">
                                <select class="form-control" v-model="school_id" id="school_id" required
                                    @change="updateVehicleName">
                                    <option value="" disabled>Select School Name</option>
                                    <option v-for="schools in schools" :key="schools.id" :value="schools.id">
                                        {{ schools.name }}&nbsp; / &nbsp; {{ schools.amount }}

                                    </option>
                                </select>
                            </div> -->
                            <div class="custom-dropdown">
                                <select class="form-control" v-model="school_id" id="school_id" required
                                    @change="updateVehicleName">
                                    <option value="" disabled>Select School Name</option>
                                    <option v-for="school in schools" :key="school.id" :value="school.id">
                                        {{ school.name }}&nbsp; / &nbsp; {{ school.amount }}
                                    </option>
                                </select>
                            </div>

                            <br />
                            <div class="input-with-icon">
                                <div class="one">
                                    <p>Pickup Time</p>
                                </div>
                                <input type="time" placeholder="Enter pickup time" v-model="pickup_time"
                                    class="form-control" required />
                                <div class="icon">
                                    <!-- Add an icon here if needed -->
                                </div>
                                <div class="invalid-feedback">
                                    This field must be filled.
                                </div>
                            </div>
                            <br>
                            <div class="input-with-icon">
                                <div class="one">
                                    <p>Dropoff Time</p>
                                </div>
                                <input type="time" placeholder="Enter dropoff time" v-model="dropoff_time"
                                    class="form-control" required />
                                <div class="icon">
                                    <!-- Add an icon here if needed -->
                                </div>
                                <div class="invalid-feedback">
                                    This field must be filled.
                                </div>
                            </div>
                            <br />
                            <div>

                                <div class="custom-dropdown">
                                    <select class="form-control" v-model="zone_id" id="zone_id">
                                        <option value="" disabled>Select Zone Type</option>
                                        <option v-for="zone in zones" :key="zone.id" :value="zone.id">
                                            {{ zone.name }}
                                        </option>
                                    </select>
                                </div>




                                <br />
                                <br />

                            </div>

                            <button type="submit" class="button btn btn-primary">Get
                                Quote</button>
                            <p class="error-message">{{ errorMessage }}</p>
                        </form>
                        <!-- <button type="submit" class="button btn btn-primary" onclick="redirectToPage()">See
                            All Zone</button> -->
                        <button type="button" class="button btn btn-primary" @click="redirectToPage">See All
                            Zones</button>

                    </div>
                </div>

                <div class="col-md-6 image">
                    <img :src="carImage" alt="" />
                </div>
                <!-- </router-view> -->
            </div>
            <Model :origin="origin" :selectedSchoolName="selectedSchoolName" :cartype="cartype" :distance="distance"
                :vehicleName="selectedVehicleName" :pricePublic="selectedVehiclecharge" :picup_latitude="latitude1"
                :picup_longitude="longitude1" :drop_latitude="latitude2" :drop_longitude="longitude2"
                :numericValue="numericValue" :vehicleType="vehicleType" :pickup_time="pickup_time" :zonetype="zonetype"
                :dropoff_time="dropoff_time" :zones="zones" :zone_id="zone_id" :schools="schools" :school_id="school_id"
                :isPublic="true" />
            <Task />
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
import Task from "./Task.vue";
import MapWithMarker from './MapWithMarker.vue';
import axios from 'axios'; // Import axios for making HTTP requests

export default {
    name: 'Public',
    name: 'PlaceAutocomplete',
    name: 'VehicleSelection',

    setup() {
        const autocompleteInput = ref(null);
        const latitude1 = ref(null);
        const longitude1 = ref(null);
        const showmap = ref(false);

        const origin = ref('');
        const destination = ref('');
        const cartype = ref('');
        const numericValue = ref(1);
        const errorMessage = ref('');
        const status = ref("");
        const mapLink = ref("");
        const mapLinkText = ref("");
        const distance = ref(null);

        const vehicleType = ref('');
        const vehicles = ref([]);
        const selectedVehicleName = ref('');
        const selectedVehiclecharge = ref(null);
        const selectedSchoolName = ref(null);
        const loading = ref(null);

        const zones = ref([]);
        const zone_id = ref('');
        const schools = ref([]);
        const school_id = ref('');
        const dropoff_time = ref('');
        const pickup_time = ref('');

        const fetchVehicles = async () => {
            loading.value = true;
            try {
                const response = await axios.get(`https://backendbigways.singsavatech.com/api/vehicleIndex/${vehicleType.value}`);
                vehicles.value = response.data.data;
            } catch (error) {
                console.error('Error fetching vehicles:', error);
            } finally {
                loading.value = false;
            }
        };

        const updateVehicleName = () => {
            const selectedVehicle = schools.value.find(school => school.id === school_id.value);
            selectedVehicleName.value = selectedVehicle ? selectedVehicle.name : '';
            selectedVehiclecharge.value = selectedVehicle ? selectedVehicle.amount : '';
            selectedSchoolName.value = selectedVehicle ? selectedVehicle.name : '';
        };

        onMounted(() => {
            const autocomplete = new google.maps.places.Autocomplete(autocompleteInput.value);
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                if (place.geometry && place.geometry.location) {
                    latitude1.value = place.geometry.location.lat();
                    longitude1.value = place.geometry.location.lng();
                    origin.value = place.formatted_address;
                }
            });

            axios.get("https://backendbigways.singsavatech.com/api/zones")
                .then(response => {
                    zones.value = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                });

            axios.get("https://backendbigways.singsavatech.com/api/schools")
                .then(response => {
                    schools.value = response.data.data;
                })
                .catch(error => {
                    console.log(error);
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
                        const geocoder = new google.maps.Geocoder();
                        const latlng = { lat: latitude, lng: longitude };

                        geocoder.geocode({ 'location': latlng }, (results, status) => {
                            if (status === google.maps.GeocoderStatus.OK) {
                                if (results[0]) {
                                    origin.value = results[0].formatted_address;
                                }
                            } else {
                                console.log("Geocoder failed due to: " + status);
                            }
                        });

                        latitude1.value = latitude;
                        longitude1.value = longitude;
                    },
                    (error) => {
                        status.value = "Unable to retrieve your location: " + error.message;
                    },
                    { enableHighAccuracy: true }
                );
            }
        };
        const redirectToPage = () => {
            // window.open = "https://bigways.singsavatech.com/zone/overall", "_blank";
            window.open("https://bigways.singsavatech.com/zone/overall", "_blank");

        };
        return {
            loading,
            autocompleteInput,
            latitude1,
            longitude1,
            carImage: Car,
            origin,
            destination,
            cartype,
            numericValue,
            errorMessage,
            showMapPopup: false,
            showmap,
            status,
            mapLink,
            mapLinkText,
            geoFindMe,
            distance,
            vehicleType,
            vehicles,
            selectedVehicleName,
            selectedVehiclecharge,
            selectedSchoolName,
            fetchVehicles,
            updateVehicleName,
            redirectToPage,
            dropoff_time,
            pickup_time,
            zonetype: '',
            zones,
            zone_id,
            schools,
            school_id,
            isActive: 'public',
        };
    },

    components: {
        Model,
        MapWithMarker,
    },

    methods: {
        setActive(button) {
            this.isActive = button;
        },

        send() {
            if (this.validateForm()) {
                $('#secondModal').modal('show');
                this.showmap = false;
            } else {
                this.errorMessage = 'Please fill in all fields.';
            }
        },

        validateForm() {
            return this.origin && this.school_id;
        },

        forceUpdate() {
            this.$forceUpdate();
        },

        handleChange(e) {
            this.cartype = e.target.value;
        },
        // redirectToPage() {
        //     window.location.href = "http://localhost:8080/zone/overall"; // Replace with your desired URL
        // }
    },
};
</script>
