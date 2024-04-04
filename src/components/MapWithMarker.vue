<template>
    <div ref="mapContainer" style="height: 200px;"></div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Loader } from '@googlemaps/js-api-loader';

export default {
    props: {
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        const mapContainer = ref(null);

        onMounted(() => {
            const loader = new Loader({
                apiKey: 'AIzaSyDRL4y2_cSzAcP0bedr-67CkG1kifDKYfg', // Replace with your Google Maps API key
                version: 'weekly',
            });

            loader.load().then(() => {
                const map = new google.maps.Map(mapContainer.value, {
                    center: { lat: props.latitude, lng: props.longitude },
                    zoom: 14,
                });

                new google.maps.Marker({
                    position: { lat: props.latitude, lng: props.longitude },
                    map,
                });
            });
        });

        return {
            mapContainer,
        };
    },
};
</script>
